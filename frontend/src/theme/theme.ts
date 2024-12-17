import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    trusted: {
      main: string;
      light: string;
    };
  }
  interface PaletteOptions {
    trusted: {
      main: string;
      light: string;
    };
  }
}

const theme = (mode: 'light' | 'dark') => createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode,
    primary: {
      main: '#8CC63E',
      light: 'rgba(140, 198, 62, 0.08)',
      contrastText: '#000000',
    },
    trusted: {
      main: '#8CC63E',
      light: 'rgba(140, 198, 62, 0.08)',
    },
    text: {
      primary: '#000000',
      secondary: '#6B7280',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6B7280',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#8CC63E',
            '&:hover': {
              backgroundColor: '#8CC63E',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#6B7280',
          minWidth: 40,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: '#8CC63E',
            '&:hover': {
              backgroundColor: '#7AB22F',
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;
