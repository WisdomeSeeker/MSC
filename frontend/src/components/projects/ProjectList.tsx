import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Box,
  IconButton,
  CardActions,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { Project, ProjectStatus } from '../../types/project';
import { useNavigate } from 'react-router-dom';

interface ProjectListProps {
  projects: Project[];
  view: 'grid' | 'list';
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, view, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return 'success';
      case ProjectStatus.COMPLETED:
        return 'info';
      case ProjectStatus.ON_HOLD:
        return 'warning';
      case ProjectStatus.CANCELLED:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return 'Actif';
      case ProjectStatus.COMPLETED:
        return 'Terminé';
      case ProjectStatus.ON_HOLD:
        return 'En pause';
      case ProjectStatus.CANCELLED:
        return 'Annulé';
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSpentPercentage = (spent: number, budget: number) => {
    return Math.min(Math.round((spent / budget) * 100), 100);
  };

  const getSpentColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'error';
    if (percentage > 85) return 'warning';
    return 'primary';
  };

  if (projects.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 3,
      }}>
        <Typography variant="h6" color="text.secondary">
          Aucun projet trouvé
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={view === 'grid' ? 6 : 12} md={view === 'grid' ? 4 : 12} key={project.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
                  {project.name}
                </Typography>
                <Chip
                  label={getStatusLabel(project.status)}
                  color={getStatusColor(project.status)}
                  size="small"
                />
              </Box>

              <Typography color="textSecondary" gutterBottom>
                {project.client}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Progression du projet
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {project.progress}%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Charges / Budget
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <Tooltip title={`${formatCurrency(project.spent)} / ${formatCurrency(project.budget)}`}>
                      <LinearProgress
                        variant="determinate"
                        value={getSpentPercentage(project.spent, project.budget)}
                        color={getSpentColor(project.spent, project.budget)}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {getSpentPercentage(project.spent, project.budget)}%
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoneyIcon color="action" />
                      <Typography variant="body2">
                        Budget: {formatCurrency(project.budget)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon color="action" />
                      <Typography variant="body2">
                        {new Date(project.startDate).toLocaleDateString('fr-FR')} - {new Date(project.endDate).toLocaleDateString('fr-FR')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GroupIcon color="action" />
                      <Typography variant="body2">
                        {project.projectManager}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Détails
              </Button>
              <IconButton
                size="small"
                onClick={() => navigate(`/projects/${project.id}/edit`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(project.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;
