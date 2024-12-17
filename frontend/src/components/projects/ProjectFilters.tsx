import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Paper,
  Button,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface ProjectFiltersProps {
  onFilterChange?: (filters: ProjectFilters) => void;
}

interface ProjectFilters {
  search: string;
  status: string;
  budget: {
    min: number | '';
    max: number | '';
  };
}

const initialFilters: ProjectFilters = {
  search: '',
  status: '',
  budget: {
    min: '',
    max: '',
  },
};

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (field: keyof ProjectFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleBudgetChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? '' : Number(value);
    const newFilters = {
      ...filters,
      budget: {
        ...filters.budget,
        [type]: numValue,
      },
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.search !== '' ||
      filters.status !== '' ||
      filters.budget.min !== '' ||
      filters.budget.max !== ''
    );
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un projet..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          size="small"
        />
        <Tooltip title="Plus de filtres">
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon />
          </IconButton>
        </Tooltip>
        {hasActiveFilters() && (
          <Tooltip title="Effacer les filtres">
            <IconButton onClick={handleClearFilters} color="error">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Statut</InputLabel>
              <Select
                value={filters.status}
                label="Statut"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="En pause">En pause</MenuItem>
                <MenuItem value="Terminé">Terminé</MenuItem>
                <MenuItem value="Annulé">Annulé</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Budget min (€)"
              type="number"
              size="small"
              value={filters.budget.min}
              onChange={(e) => handleBudgetChange('min', e.target.value)}
              sx={{ width: 150 }}
            />

            <TextField
              label="Budget max (€)"
              type="number"
              size="small"
              value={filters.budget.max}
              onChange={(e) => handleBudgetChange('max', e.target.value)}
              sx={{ width: 150 }}
            />
          </Box>
        </Paper>
      </Collapse>

      {hasActiveFilters() && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.search && (
            <Chip
              label={`Recherche: ${filters.search}`}
              onDelete={() => handleFilterChange('search', '')}
            />
          )}
          {filters.status && (
            <Chip
              label={`Statut: ${filters.status}`}
              onDelete={() => handleFilterChange('status', '')}
            />
          )}
          {filters.budget.min && (
            <Chip
              label={`Budget min: ${filters.budget.min}€`}
              onDelete={() => handleBudgetChange('min', '')}
            />
          )}
          {filters.budget.max && (
            <Chip
              label={`Budget max: ${filters.budget.max}€`}
              onDelete={() => handleBudgetChange('max', '')}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProjectFilters;
