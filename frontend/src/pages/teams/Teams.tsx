import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Group as TeamIcon,
  Person as PersonIcon,
  Assignment as ProjectIcon,
} from '@mui/icons-material';
import { Team, TeamMember } from '../../types/team';
import { teamService } from '../../services/teamService';
import TeamCard from '../../components/teams/TeamCard';
import TeamMemberCard from '../../components/teams/TeamMemberCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teams-tabpanel-${index}`}
      aria-labelledby={`teams-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Teams: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'team' | 'member'>('team');
  const [selectedItem, setSelectedItem] = useState<Team | TeamMember | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Stats calculées
  const stats = {
    totalTeams: teams.length,
    totalMembers: members.length,
    totalProjects: new Set(teams.flatMap(team => team.projectIds)).size,
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [teamsData, membersData] = await Promise.all([
        teamService.getTeams(),
        teamService.getTeamMembers(),
      ]);
      setTeams(teamsData);
      setMembers(membersData);
    } catch (error) {
      showSnackbar('Erreur lors du chargement des données', 'error');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: 'team' | 'member', item?: Team | TeamMember) => {
    setDialogType(type);
    setSelectedItem(item || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleDelete = async (item: Team | TeamMember) => {
    try {
      if ('members' in item) {
        // C'est une équipe
        await teamService.deleteTeam(item.id);
        setTeams(teams.filter(t => t.id !== item.id));
        showSnackbar('Équipe supprimée avec succès', 'success');
      } else {
        // C'est un membre
        const teamId = teams.find(t => t.members.some(m => m.id === item.id))?.id;
        if (teamId) {
          await teamService.removeTeamMember(teamId, item.id);
          setMembers(members.filter(m => m.id !== item.id));
          showSnackbar('Membre supprimé avec succès', 'success');
        }
      }
    } catch (error) {
      showSnackbar('Erreur lors de la suppression', 'error');
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* En-tête avec statistiques */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Équipes
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('member')}
            >
              Nouveau Membre
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('team')}
            >
              Nouvelle Équipe
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TeamIcon color="primary" />
                  <Typography color="textSecondary">
                    Équipes
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalTeams}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon color="success" />
                  <Typography color="textSecondary">
                    Membres
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalMembers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ProjectIcon color="warning" />
                  <Typography color="textSecondary">
                    Projets Actifs
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalProjects}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Barre de recherche et onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Équipes" />
            <Tab label="Membres" />
          </Tabs>
          <TextField
            size="small"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>

      {/* Contenu des onglets */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {filteredTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <TeamCard
                team={team}
                onEdit={(team) => handleOpenDialog('team', team)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <TeamMemberCard
                member={member}
                onEdit={(member) => handleOpenDialog('member', member)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Dialog pour ajouter/modifier une équipe ou un membre */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedItem
            ? `Modifier ${dialogType === 'team' ? 'l\'équipe' : 'le membre'}`
            : `Nouveau ${dialogType === 'team' ? 'équipe' : 'membre'}`}
        </DialogTitle>
        <DialogContent>
          {/* Formulaire à implémenter */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained">
            {selectedItem ? 'Mettre à jour' : 'Créer'}
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

export default Teams;
