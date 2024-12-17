import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import Routes from './routes';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { Box, IconButton, useTheme } from '@mui/material';
import createTheme from './theme/theme';
import { Menu as MenuIcon } from '@mui/icons-material';

// Constants
const DRAWER_WIDTH = 280;
const HEADER_HEIGHT = 64;
const MAX_CONTENT_WIDTH = 1400; // Increased max width for better layout

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = createTheme(darkMode ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Sidebar 
            mobileOpen={mobileOpen} 
            onDrawerToggle={handleDrawerToggle}
            isMobile={isMobile}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              marginLeft: { xs: 0, md: `${DRAWER_WIDTH}px` },
            }}
          >
            <Header 
              onDrawerToggle={handleDrawerToggle}
              onThemeToggle={handleThemeToggle}
              darkMode={darkMode}
              isMobile={isMobile}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                mt: `${HEADER_HEIGHT}px`,
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2, sm: 3 },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: MAX_CONTENT_WIDTH,
                  mx: 'auto',
                  position: 'relative',
                }}
              >
                <Routes />
              </Box>
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
