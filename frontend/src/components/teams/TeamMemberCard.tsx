import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { TeamMember } from '../../types/team';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onEdit,
  onDelete,
}) => {
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={member.avatar}
            alt={member.name}
            sx={{
              width: 60,
              height: 60,
              mr: 2,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {member.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" gutterBottom>
              {member.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <EmailIcon fontSize="small" />
              {member.email}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {member.role} • {member.department}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Compétences
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {member.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{ bgcolor: theme.palette.primary.light + '20' }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          A rejoint le {format(new Date(member.joinDate), 'dd MMMM yyyy', { locale: fr })}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tooltip title="Modifier">
          <IconButton
            size="small"
            onClick={() => onEdit(member)}
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
            onClick={() => onDelete(member)}
            sx={{
              color: theme.palette.error.main,
              '&:hover': { backgroundColor: theme.palette.error.light + '20' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default TeamMemberCard;
