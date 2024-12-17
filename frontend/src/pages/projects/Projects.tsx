import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  ViewModule,
  ViewList,
  TrendingUp as TrendingUpIcon,
  Assignment as TaskIcon,
  Group as TeamIcon,
  AttachMoney as BudgetIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProjectFilters from '../../components/projects/ProjectFilters';
import ProjectList from '../../components/projects/ProjectList';
import ProjectStats from '../../components/dashboard/ProjectStats';
import { projectService } from '../../services/projectService';
import { Project, ProjectStatus } from '../../types/project';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Projects: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Stats calculées
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'En cours').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalTeamMembers: new Set(projects.flatMap(p => p.team.map(t => t.id))).size,
  };

  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    status: 'En cours',
    budget: 0,
    deadline: new Date(),
    team: [],
    completedTasks: 0,
    totalTasks: 0,
  });

  useEffect(() => {
    // Simuler le chargement des projets depuis une API
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Installation Panneaux Solaires - Site A',
        description: 'Installation de 100 panneaux solaires sur le site industriel A',
        status: 'En cours',
        progress: 75,
        budget: 150000,
        deadline: new Date('2024-03-15'),
        team: [
          { id: 1, name: 'Jean Martin', avatar: '' },
          { id: 2, name: 'Marie Dubois', avatar: '' },
        ],
        completedTasks: 15,
        totalTasks: 20,
      },
      {
        id: 2,
        name: 'Maintenance Éolienne - Parc Nord',
        description: 'Maintenance préventive des éoliennes du parc Nord',
        status: 'En pause',
        progress: 30,
        budget: 75000,
        deadline: new Date('2024-02-28'),
        team: [
          { id: 3, name: 'Pierre Durand', avatar: '' },
          { id: 4, name: 'Sophie Leroy', avatar: '' },
        ],
        completedTasks: 6,
        totalTasks: 12,
      },
      {
        id: 3,
        name: 'Audit Énergétique - Client XYZ',
        description: 'Audit complet des installations énergétiques',
        status: 'Terminé',
        progress: 100,
        budget: 45000,
        deadline: new Date('2024-01-30'),
        team: [
          { id: 5, name: 'Luc Bernard', avatar: '' },
        ],
        completedTasks: 8,
        totalTasks: 8,
      },
    ];

    setProjects(mockProjects);
  }, []);

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'list') => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setNewProject(project);
    } else {
      setSelectedProject(null);
      setNewProject({
        name: '',
        description: '',
        status: 'En cours',
        budget: 0,
        deadline: new Date(),
        team: [],
        completedTasks: 0,
        totalTasks: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handleSave = () => {
    if (!newProject.name || !newProject.description) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error',
      });
      return;
    }

    const updatedProject: Project = {
      id: selectedProject?.id || projects.length + 1,
      name: newProject.name!,
      description: newProject.description!,
      status: newProject.status || 'En cours',
      progress: 0,
      budget: newProject.budget || 0,
      deadline: newProject.deadline || new Date(),
      team: newProject.team || [],
      completedTasks: newProject.completedTasks || 0,
      totalTasks: newProject.totalTasks || 0,
    };

    if (selectedProject) {
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
    } else {
      setProjects([...projects, updatedProject]);
    }

    setSnackbar({
      open: true,
      message: selectedProject ? 'Projet mis à jour avec succès' : 'Nouveau projet créé avec succès',
      severity: 'success',
    });
    handleCloseDialog();
  };

  const handleDelete = (project: Project) => {
    setProjects(projects.filter(p => p.id !== project.id));
    setSnackbar({
      open: true,
      message: 'Projet supprimé avec succès',
      severity: 'success',
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* En-tête avec statistiques */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Projets
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nouveau Projet
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TaskIcon color="primary" />
                  <Typography color="textSecondary">
                    Projets Totaux
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalProjects}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUpIcon color="success" />
                  <Typography color="textSecondary">
                    Projets Actifs
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.activeProjects}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BudgetIcon color="warning" />
                  <Typography color="textSecondary">
                    Budget Total
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalBudget.toLocaleString('fr-FR')} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TeamIcon color="info" />
                  <Typography color="textSecondary">
                    Membres
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalTeamMembers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Filtres et vue */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <ProjectFilters />
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Liste des projets */}
      <ProjectList
        projects={projects}
        view={view}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      {/* Dialog pour ajouter/modifier un projet */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProject ? 'Modifier le projet' : 'Nouveau projet'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Nom du projet"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                value={newProject.status}
                label="Statut"
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
              >
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="En pause">En pause</MenuItem>
                <MenuItem value="Terminé">Terminé</MenuItem>
                <MenuItem value="Annulé">Annulé</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Budget (€)"
              value={newProject.budget}
              onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
              InputProps={{
                startAdornment: <BudgetIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <DatePicker
              label="Date limite"
              value={newProject.deadline}
              onChange={(newValue) => {
                if (newValue) {
                  setNewProject({ ...newProject, deadline: newValue });
                }
              }}
              sx={{ width: '100%' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedProject ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Projects;
