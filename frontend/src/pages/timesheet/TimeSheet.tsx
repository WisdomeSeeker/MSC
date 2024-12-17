import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  useTheme,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  TablePagination,
  useMediaQuery,
  Card,
  CardContent,
  LinearProgress,
  Container,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  DateRange as DateRangeIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon,
  NavigateBefore,
  NavigateNext,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfWeek, endOfWeek, format, addWeeks, subWeeks, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimeEntry {
  id: number;
  date: Date;
  project: string;
  task: string;
  hours: number;
  description: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  project: string;
  status: string;
}

const projects = [
  'Installation Panneaux Solaires',
  'Maintenance Éolienne',
  'Audit Énergétique',
  'Formation Client',
];

const tasks = [
  'Gestion de Projet',
  'Développement',
  'Tests',
  'Documentation',
  'Réunion',
  'Support Client',
];

const TimeSheet = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: startOfWeek(new Date(), { locale: fr }),
    endDate: endOfWeek(new Date(), { locale: fr }),
    project: '',
    status: '',
  });
  const [newEntry, setNewEntry] = useState<Partial<TimeEntry>>({
    date: new Date(),
    project: '',
    task: '',
    hours: 0,
    description: '',
    status: 'draft'
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample data - replace with actual API call
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      date: new Date(),
      project: 'Installation Panneaux Solaires',
      task: 'Gestion de Projet',
      hours: 4,
      description: 'Coordination avec l\'équipe technique',
      status: 'approved',
    },
    {
      id: 2,
      date: new Date(),
      project: 'Maintenance Éolienne',
      task: 'Support Client',
      hours: 3,
      description: 'Assistance téléphonique',
      status: 'submitted',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return { light: theme.palette.success.light, dark: theme.palette.success.dark };
      case 'submitted':
        return { light: theme.palette.info.light, dark: theme.palette.info.dark };
      case 'rejected':
        return { light: theme.palette.error.light, dark: theme.palette.error.dark };
      default:
        return { light: theme.palette.grey[300], dark: theme.palette.grey[700] };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'submitted':
        return 'Soumis';
      case 'rejected':
        return 'Rejeté';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const handleOpenDialog = (entry?: TimeEntry) => {
    if (entry) {
      setSelectedEntry(entry);
      setNewEntry(entry);
    } else {
      setSelectedEntry(null);
      setNewEntry({
        date: new Date(),
        project: '',
        task: '',
        hours: 0,
        description: '',
        status: 'draft'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEntry(null);
    setNewEntry({
      date: new Date(),
      project: '',
      task: '',
      hours: 0,
      description: '',
      status: 'draft'
    });
  };

  const handleSave = () => {
    if (!newEntry.project || !newEntry.task || !newEntry.hours || !newEntry.date) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error'
      });
      return;
    }

    const entry: TimeEntry = {
      id: selectedEntry?.id || timeEntries.length + 1,
      date: newEntry.date!,
      project: newEntry.project!,
      task: newEntry.task!,
      hours: newEntry.hours!,
      description: newEntry.description || '',
      status: newEntry.status as 'draft' | 'submitted' | 'approved' | 'rejected',
    };

    if (selectedEntry) {
      setTimeEntries(timeEntries.map(e => e.id === selectedEntry.id ? entry : e));
    } else {
      setTimeEntries([...timeEntries, entry]);
    }

    setSnackbar({
      open: true,
      message: selectedEntry ? 'Entrée mise à jour avec succès' : 'Nouvelle entrée ajoutée avec succès',
      severity: 'success'
    });
    handleCloseDialog();
  };

  const handleDelete = (entry: TimeEntry) => {
    setTimeEntries(timeEntries.filter(e => e.id !== entry.id));
    setSnackbar({
      open: true,
      message: 'Entrée supprimée avec succès',
      severity: 'success'
    });
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subWeeks(selectedWeek, 1)
      : addWeeks(selectedWeek, 1);
    setSelectedWeek(newDate);
    setFilters({
      ...filters,
      startDate: startOfWeek(newDate, { locale: fr }),
      endDate: endOfWeek(newDate, { locale: fr }),
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEntries = timeEntries.filter(entry => {
    const matchesProject = !filters.project || entry.project === filters.project;
    const matchesStatus = !filters.status || entry.status === filters.status;
    const matchesDate = (!filters.startDate || entry.date >= filters.startDate) &&
                       (!filters.endDate || entry.date <= filters.endDate);
    return matchesProject && matchesStatus && matchesDate;
  });

  const paginatedEntries = filteredEntries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);

  // Calcul des statistiques hebdomadaires
  const weekStats = {
    totalHours: filteredEntries.reduce((sum, entry) => sum + entry.hours, 0),
    totalProjects: new Set(filteredEntries.map(entry => entry.project)).size,
    submittedHours: filteredEntries.filter(entry => entry.status === 'submitted').reduce((sum, entry) => sum + entry.hours, 0),
    approvedHours: filteredEntries.filter(entry => entry.status === 'approved').reduce((sum, entry) => sum + entry.hours, 0),
  };

  // Calcul des heures par jour de la semaine
  const weekDays = eachDayOfInterval({
    start: filters.startDate || startOfWeek(new Date(), { locale: fr }),
    end: filters.endDate || endOfWeek(new Date(), { locale: fr })
  });

  const hoursPerDay = weekDays.map(day => ({
    date: day,
    hours: filteredEntries
      .filter(entry => isWithinInterval(entry.date, { start: day, end: day }))
      .reduce((sum, entry) => sum + entry.hours, 0)
  }));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        p: { xs: 2, sm: 3 }
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1400px !important',
          px: { xs: 0, sm: 2 }
        }}
      >
        {/* En-tête */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            Feuilles de Temps
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'stretch', sm: 'flex-end' } }}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              fullWidth={isMobileScreen}
            >
              Exporter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              fullWidth={isMobileScreen}
            >
              Nouvelle entrée
            </Button>
          </Box>
        </Box>

        {/* Résumé hebdomadaire */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Heures Totales
                </Typography>
                <Typography variant="h4">
                  {weekStats.totalHours}h
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(weekStats.totalHours / 40) * 100} 
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Projets Actifs
                </Typography>
                <Typography variant="h4">
                  {weekStats.totalProjects}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Heures Soumises
                </Typography>
                <Typography variant="h4">
                  {weekStats.submittedHours}h
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(weekStats.submittedHours / weekStats.totalHours) * 100} 
                  color="info"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Heures Approuvées
                </Typography>
                <Typography variant="h4">
                  {weekStats.approvedHours}h
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(weekStats.approvedHours / weekStats.totalHours) * 100} 
                  color="success"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtres */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: 3,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  onClick={() => handleWeekChange('prev')}
                  sx={{ 
                    bgcolor: theme.palette.grey[100],
                    '&:hover': { bgcolor: theme.palette.grey[200] }
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <DatePicker
                  label="Semaine"
                  value={selectedWeek}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSelectedWeek(newValue);
                      setFilters({
                        ...filters,
                        startDate: startOfWeek(newValue, { locale: fr }),
                        endDate: endOfWeek(newValue, { locale: fr }),
                      });
                    }
                  }}
                  sx={{ flex: 1 }}
                />
                <IconButton 
                  onClick={() => handleWeekChange('next')}
                  sx={{ 
                    bgcolor: theme.palette.grey[100],
                    '&:hover': { bgcolor: theme.palette.grey[200] }
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Projet</InputLabel>
                <Select
                  value={filters.project}
                  onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                  label="Projet"
                >
                  <MenuItem value="">Tous</MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project} value={project}>
                      {project}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  label="Statut"
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="draft">Brouillon</MenuItem>
                  <MenuItem value="submitted">Soumis</MenuItem>
                  <MenuItem value="approved">Approuvé</MenuItem>
                  <MenuItem value="rejected">Rejeté</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Visualisation hebdomadaire */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: 3,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Répartition hebdomadaire
          </Typography>
          <Grid container spacing={1}>
            {hoursPerDay.map(({ date, hours }) => (
              <Grid item xs key={format(date, 'yyyy-MM-dd')}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1,
                    bgcolor: hours > 0 ? theme.palette.primary.light : 'transparent',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption">
                    {format(date, 'EEE', { locale: fr })}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {hours}h
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Table des entrées */}
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Projet</TableCell>
                <TableCell>Tâche</TableCell>
                <TableCell align="right">Heures</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(entry.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell align="right">{entry.hours}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(entry.status)}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(entry.status).light,
                        color: getStatusColor(entry.status).dark,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(entry)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(entry)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEntries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Dialog pour ajouter/éditer une entrée */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedEntry ? 'Modifier l\'entrée' : 'Nouvelle entrée'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DatePicker
                  label="Date"
                  value={newEntry.date}
                  onChange={(newValue) => {
                    if (newValue) {
                      setNewEntry({ ...newEntry, date: newValue });
                    }
                  }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Projet</InputLabel>
                  <Select
                    value={newEntry.project}
                    onChange={(e) => setNewEntry({ ...newEntry, project: e.target.value })}
                    label="Projet"
                  >
                    {projects.map((project) => (
                      <MenuItem key={project} value={project}>
                        {project}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Tâche</InputLabel>
                  <Select
                    value={newEntry.task}
                    onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                    label="Tâche"
                  >
                    {tasks.map((task) => (
                      <MenuItem key={task} value={task}>
                        {task}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Heures"
                  type="number"
                  value={newEntry.hours}
                  onChange={(e) => setNewEntry({ ...newEntry, hours: parseFloat(e.target.value) })}
                  inputProps={{ min: 0, max: 24, step: 0.5 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={newEntry.status}
                    onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value as TimeEntry['status'] })}
                    label="Statut"
                  >
                    <MenuItem value="draft">Brouillon</MenuItem>
                    <MenuItem value="submitted">Soumis</MenuItem>
                    <MenuItem value="approved">Approuvé</MenuItem>
                    <MenuItem value="rejected">Rejeté</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />}>
              Enregistrer
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
      </Container>
    </Box>
  );
};

export default TimeSheet;
