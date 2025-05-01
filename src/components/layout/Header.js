import {
    BarChart,
    DarkMode,
    Home,
    Info,
    LightMode,
    Map,
    Menu as MenuIcon
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', path: '/', icon: <Home /> },
    { name: 'Peta Interaktif', path: '/map', icon: <Map /> },
    { name: 'Eksplorasi Data', path: '/explorer', icon: <BarChart /> },
    { name: 'Tentang', path: '/about', icon: <Info /> },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to right, #2c3e50, #1c2331)' 
            : 'linear-gradient(to right, #3a7bd5, #00d2ff)',
          borderBottom: theme.palette.mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 0.5, justifyContent: 'space-between', px: { xs: 0, sm: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
                  sx={{ 
                    mr: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'rotate(180deg)'
                    }
                  }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'white', 
                      color: theme.palette.primary.main,
                      mr: 1.5,
                      width: 36,
                      height: 36,
            }}
          >
                    <Map fontSize="small" />
                  </Avatar>
            WebGIS Indonesia
          </Typography>
              </motion.div>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
                  <AnimatePresence>
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial="hidden"
                        animate="visible"
                        variants={navItemVariants}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ y: -3 }}
                      >
                <Button 
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ 
                    mx: 1,
                            position: 'relative',
                            px: 2,
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: location.pathname === item.path ? '100%' : '0%',
                              height: '3px',
                              borderRadius: '1.5px',
                              bottom: '4px',
                              left: 0,
                              backgroundColor: 'white',
                              transition: 'width 0.3s ease'
                            },
                            '&:hover::after': {
                              width: '100%'
                            }
                          }}
                          startIcon={item.icon}
                        >
                          <span style={{ fontWeight: location.pathname === item.path ? 'bold' : 'normal' }}>
                  {item.name}
                          </span>
                </Button>
                      </motion.div>
              ))}
                  </AnimatePresence>
            </Box>
          )}

              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <IconButton 
                  color="inherit" 
                  onClick={toggleDarkMode} 
                  sx={{ 
                    ml: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
              </motion.div>
            </Box>
        </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(to bottom, #2c3e50, #1c2331)' 
              : 'linear-gradient(to bottom, #ffffff, #f9fafb)',
            boxShadow: '0 0 24px rgba(0, 0, 0, 0.15)',
            borderRight: 'none'
          }
        }}
      >
        <Box
          sx={{ width: 280 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center', 
            borderBottom: '1px solid',
            borderColor: theme.palette.divider
          }}>
            <Avatar 
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                color: 'white',
                mr: 2
              }}
            >
              <Map />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              WebGIS Indonesia
            </Typography>
          </Box>
          
          <List sx={{ p: 2 }}>
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.path
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(58, 123, 213, 0.1)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(58, 123, 213, 0.15)',
                    },
                    transition: 'all 0.3s'
                  }}
              >
                  <ListItemIcon sx={{ 
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main 
                      : 'inherit'
                  }}>
                  {item.icon}
                </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal' 
                    }}
                  />
              </ListItem>
              </motion.div>
            ))}
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={darkMode ? <LightMode /> : <DarkMode />}
                onClick={toggleDarkMode}
                sx={{ 
                  borderRadius: '20px',
                  px: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white'
                  }
                }}
              >
                {darkMode ? 'Mode Terang' : 'Mode Gelap'}
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Header; 