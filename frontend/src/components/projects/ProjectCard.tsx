import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  Group as TeamIcon,
  AttachMoney as BudgetIcon,
} from '@mui/icons-material';
import { Project } from '../../types/project';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'en cours':
      return 'primary';
    case 'terminé':
      return 'success';
    case 'en pause':
      return 'warning';
    case 'annulé':
      return 'error';
    default:
      return 'default';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const theme = useTheme();
  const progress = (project.completedTasks / project.totalTasks) * 100;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {project.name}
          </Typography>
          <Chip 
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progression
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {format(new Date(project.deadline), 'dd MMM yyyy', { locale: fr })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BudgetIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.budget.toLocaleString('fr-FR')} €
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 30, height: 30 } }}>
            {project.team.map((member, index) => (
              <Tooltip key={index} title={member.name}>
                <Avatar src={member.avatar} alt={member.name}>
                  {member.name.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TeamIcon fontSize="small" />
              {project.team.length} membres
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <IconButton 
          size="small" 
          onClick={() => onEdit(project)}
          sx={{ 
            color: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.light },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={() => onDelete(project)}
          sx={{ 
            color: theme.palette.error.main,
            '&:hover': { backgroundColor: theme.palette.error.light },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
