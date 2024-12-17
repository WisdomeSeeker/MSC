import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onThemeToggle: () => void;
  onDrawerToggle: () => void;
  darkMode: boolean;
  isMobile: boolean;
}

const DRAWER_WIDTH = 280;

const Header: React.FC<HeaderProps> = ({ onThemeToggle, onDrawerToggle, darkMode, isMobile }) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {!isMobileScreen && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 600 }}>
            TRUSTED ENERGY
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onThemeToggle} color="inherit" size="large">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 32,
                height: 32,
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
