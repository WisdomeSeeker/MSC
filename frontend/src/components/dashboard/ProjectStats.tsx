import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  AccountBalance as BudgetIcon,
  Assignment as ProjectIcon,
} from '@mui/icons-material';
import { Project, ProjectStatus } from '../../types/project';

interface ProjectStatsProps {
  projects: Project[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects }) => {
  const theme = useTheme();

  const stats = {
    activeProjects: projects.filter(p => p.status === ProjectStatus.ACTIVE).length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    averageProgress: Math.round(
      projects.reduce((sum, p) => sum + p.progress, 0) / (projects.length || 1)
    ),
    delayedProjects: projects.filter(p => p.delay > 0).length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    progress,
    subtitle 
  }: { 
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    progress?: number;
    subtitle?: string;
  }) => (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}22`,
            borderRadius: '8px',
            p: 1,
            mr: 2,
          }}
        >
          <Icon sx={{ color }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {title}
          </Typography>
        </Box>
      </Box>
      {progress !== undefined && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: `${color}22`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              }
            }} 
          />
          {subtitle && (
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Projets Actifs"
          value={stats.activeProjects}
          icon={ProjectIcon}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Budget Total"
          value={formatCurrency(stats.totalBudget)}
          icon={BudgetIcon}
          color={theme.palette.success.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Taux de Complétion"
          value={`${stats.averageProgress}%`}
          icon={TrendingUpIcon}
          color={theme.palette.info.main}
          progress={stats.averageProgress}
          subtitle="Moyenne de tous les projets"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Projets en Retard"
          value={stats.delayedProjects}
          icon={WarningIcon}
          color={theme.palette.warning.main}
          progress={stats.delayedProjects > 0 ? 100 : 0}
          subtitle={`${stats.delayedProjects} projet(s) nécessite(nt) attention`}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectStats;
