import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Button,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
  Assignment as ProjectIcon,
  AttachMoney as BudgetIcon,
  Timeline as TimelineIcon,
  AccountBalanceWallet as WalletIcon,
  PaidOutlined as PaidIcon,
  ReceiptLong as InvoiceIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, icon, color, trend }: { title: string; value: string; icon: React.ReactNode; color: string; trend?: string }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color }}>
              {value}
            </Typography>
            {trend && (
              <Typography variant="body2" sx={{ color: trend.startsWith('+') ? 'success.main' : 'error.main' }}>
                {trend} vs mois dernier
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            padding: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(icon as React.ReactElement, { sx: { color } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Composant pour les projets en cours
const ProjectCard = ({ project }: { project: any }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Chip
              label={project.status}
              size="small"
              sx={{
                backgroundColor: project.status === 'En cours' ? 'success.light' : 'warning.light',
                color: project.status === 'En cours' ? 'success.dark' : 'warning.dark',
                mb: 1
              }}
            />
            <Typography variant="h6" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {project.client}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="textSecondary">
              Progression
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={project.progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }} 
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 30, height: 30 } }}>
            {project.team.map((member: any, index: number) => (
              <Avatar key={index} src={member.avatar} alt={member.name} />
            ))}
          </AvatarGroup>
          <Typography variant="body2" color="textSecondary">
            Échéance : {project.deadline}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const FinanceCard = ({ title, mainValue, secondaryValue, icon, color, trend }: { 
  title: string; 
  mainValue: string; 
  secondaryValue?: string;
  icon: React.ReactNode; 
  color: string;
  trend?: { value: string; isPositive: boolean };
}) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color, mb: 1 }}>
              {mainValue}
            </Typography>
            {secondaryValue && (
              <Typography variant="body2" color="textSecondary">
                {secondaryValue}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {trend.isPositive ? 
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: '1rem', mr: 0.5 }} /> :
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: '1rem', mr: 0.5 }} />
                }
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: trend.isPositive ? 'success.main' : 'error.main',
                  }}
                >
                  {trend.value}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ 
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            padding: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(icon as React.ReactElement, { sx: { color } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  // Données simulées pour les statistiques
  const stats = [
    { 
      title: 'Projets Actifs',
      value: '12',
      icon: <ProjectIcon />,
      color: theme.palette.primary.main,
      trend: '+2'
    },
    { 
      title: 'Budget Total',
      value: '1.2M€',
      icon: <BudgetIcon />,
      color: theme.palette.success.main,
      trend: '+15%'
    },
    { 
      title: 'Taux de Complétion',
      value: '68%',
      icon: <TimelineIcon />,
      color: theme.palette.warning.main
    },
    { 
      title: 'Projets en Retard',
      value: '2',
      icon: <WarningIcon />,
      color: theme.palette.error.main,
      trend: '-1'
    }
  ];

  // Données simulées pour les projets
  const projects = [
    {
      name: 'Installation Panneaux Solaires',
      client: 'EcoSolutions SA',
      status: 'En cours',
      progress: 75,
      deadline: '15 Jan 2024',
      team: [
        { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
      ]
    },
    {
      name: 'Maintenance Éolienne',
      client: 'WindPower Corp',
      status: 'En pause',
      progress: 45,
      deadline: '28 Jan 2024',
      team: [
        { name: 'Alice Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
      ]
    },
    {
      name: 'Audit Énergétique',
      client: 'GreenTech Industries',
      status: 'En cours',
      progress: 90,
      deadline: '10 Jan 2024',
      team: [
        { name: 'Sarah Davis', avatar: 'https://i.pravatar.cc/150?img=6' },
        { name: 'Tom Harris', avatar: 'https://i.pravatar.cc/150?img=7' },
        { name: 'Emma White', avatar: 'https://i.pravatar.cc/150?img=8' },
      ]
    }
  ];

  // Données pour le graphique
  const chartData = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 15 },
    { name: 'Mar', value: 18 },
    { name: 'Avr', value: 14 },
    { name: 'Mai', value: 20 },
    { name: 'Juin', value: 22 },
  ];

  // Données financières simulées
  const financeStats = [
    {
      title: 'Chiffre d\'affaires',
      mainValue: '2.4M€',
      secondaryValue: 'Objectif annuel: 3M€',
      icon: <WalletIcon />,
      color: theme.palette.success.main,
      trend: { value: '+15% vs N-1', isPositive: true }
    },
    {
      title: 'Facturé',
      mainValue: '850K€',
      secondaryValue: '12 factures en attente',
      icon: <InvoiceIcon />,
      color: theme.palette.info.main,
      trend: { value: '+8% ce mois', isPositive: true }
    },
    {
      title: 'Encaissé',
      mainValue: '720K€',
      secondaryValue: 'Taux de recouvrement: 85%',
      icon: <PaidIcon />,
      color: theme.palette.primary.main,
      trend: { value: '-5% vs moyenne', isPositive: false }
    },
    {
      title: 'En attente',
      mainValue: '130K€',
      secondaryValue: '5 factures > 30 jours',
      icon: <BudgetIcon />,
      color: theme.palette.warning.main
    }
  ];

  // Données pour le graphique circulaire de facturation
  const invoicingData = [
    { name: 'Encaissé', value: 720, color: theme.palette.success.main },
    { name: 'En attente', value: 130, color: theme.palette.warning.main },
    { name: 'Non facturé', value: 250, color: theme.palette.grey[400] }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* En-tête */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de bord
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Vue d'ensemble de vos projets et activités
        </Typography>
      </Box>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Graphique */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Évolution des Projets
        </Typography>
        <Box sx={{ height: 300, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Section Finance */}
      <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
        Performance Financière
      </Typography>

      {/* KPIs Financiers */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {financeStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FinanceCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Graphiques Financiers */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Évolution du CA
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar name="CA Réalisé" dataKey="value" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Répartition Facturation
            </Typography>
            <Box sx={{ height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invoicingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {invoicingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Projets en cours */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Projets en cours
          </Typography>
          <Button variant="outlined" size="small">
            Voir tout
          </Button>
        </Box>
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
