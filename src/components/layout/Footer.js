import { Facebook, GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Container, Divider, Grid, IconButton, Link, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <Instagram />, url: 'https://instagram.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
    { icon: <GitHub />, url: 'https://github.com' },
  ];

  const footerLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Peta', path: '/map' },
    { name: 'Data', path: '/explorer' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kebijakan Privasi', path: '#' },
    { name: 'Syarat & Ketentuan', path: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to right, #1c2331, #2c3e50)' 
          : 'linear-gradient(to right, #f9fafb, #f5f7fa)',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #3a7bd5, #00d2ff)'
                      : 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mr: 1
                  }}
                >
                  WebGIS Indonesia
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 3 }}
              >
                Platform visualisasi data geografis dan statistik Indonesia dengan tampilan interaktif dan responsif. Memudahkan akses dan analisis data spasial.
              </Typography>
              <Box sx={{ mb: 2 }}>
                {socialLinks.map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'inline-block' }}
                    whileHover={{ y: -5, scale: 1.1 }}
                  >
                    <IconButton
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
                        mr: 1,
                        transition: 'all 0.3s',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(58,123,213,0.1)',
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Tautan
              </Typography>
              <Grid container spacing={2}>
                {footerLinks.map((link, i) => (
                  <Grid item xs={6} key={i}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        component={RouterLink}
                        to={link.path}
                        color="text.secondary"
                        underline="none"
                        sx={{
                          display: 'inline-block',
                          transition: 'color 0.2s',
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Kontak
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Jl. Dieng Atas, Kab. Malang<br />
                Indonesia 10110
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Email: info@webgis-indonesia.com<br />
                Phone: +62 812 3456 7890
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              © {year} WebGIS Indonesia. Semua hak dilindungi.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: { xs: 2, sm: 0 } }}>
              Dibuat Oleh Ardian Studio di Indonesia
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 