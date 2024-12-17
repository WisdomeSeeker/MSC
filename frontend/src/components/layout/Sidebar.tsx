import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as ProjectIcon,
  Group as TeamIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const DRAWER_WIDTH = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isMobile: boolean;
}

const menuItems = [
  { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Projets', icon: <ProjectIcon />, path: '/projects' },
  { text: 'Équipes', icon: <TeamIcon />, path: '/teams' },
  { text: 'Feuilles de temps', icon: <TimeIcon />, path: '/timesheet' },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onDrawerToggle();
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          minHeight: 64,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
          }}
        />
        {isMobile && (
          <IconButton onClick={onDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mb: 1,
              borderRadius: 1,
              backgroundColor:
                location.pathname === item.path
                  ? theme.palette.primary.main
                  : 'transparent',
              color:
                location.pathname === item.path
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              '&:hover': {
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
