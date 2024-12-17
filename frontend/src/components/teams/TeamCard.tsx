import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  AvatarGroup,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Assignment as ProjectIcon,
} from '@mui/icons-material';
import { Team } from '../../types/team';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onEdit, onDelete }) => {
  const theme = useTheme();

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            {team.name}
          </Typography>
          <Box>
            <Tooltip title="Modifier">
              <IconButton
                size="small"
                onClick={() => onEdit(team)}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.light + '20' },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer">
              <IconButton
                size="small"
                onClick={() => onDelete(team)}
                sx={{
                  color: theme.palette.error.main,
                  '&:hover': { backgroundColor: theme.palette.error.light + '20' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {team.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            <PersonIcon fontSize="small" />
            Chef d'équipe
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              src={team.leader.avatar}
              alt={team.leader.name}
              sx={{ width: 32, height: 32 }}
            >
              {team.leader.name.charAt(0)}
            </Avatar>
            <Typography variant="body2">
              {team.leader.name}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            <ProjectIcon fontSize="small" />
            Projets actifs
          </Typography>
          <Chip
            label={`${team.projectIds.length} projet${team.projectIds.length > 1 ? 's' : ''}`}
            size="small"
            sx={{ bgcolor: theme.palette.primary.light + '20' }}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            Membres de l'équipe
          </Typography>
          <AvatarGroup max={5} sx={{ justifyContent: 'flex-start' }}>
            {team.members.map((member) => (
              <Tooltip key={member.id} title={member.name}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 32, height: 32 }}
                >
                  {member.name.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Créée le {format(new Date(team.createdAt), 'dd MMMM yyyy', { locale: fr })}
        </Typography>
      </Box>
    </Card>
  );
};

export default TeamCard;
