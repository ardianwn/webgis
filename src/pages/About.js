import {
    BarChart,
    Code,
    DataObject,
    GitHub,
    Info,
    KeyboardArrowRight,
    Layers,
    OpenInNew,
    Public
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

const About = () => {
  const theme = useTheme();
  
  // Custom color variables for elegant styling matching the navbar
  const accentGradient = theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #2c3e50 0%, #1c2331 100%)'
    : 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)';
  const softBg = theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.8)
    : alpha(theme.palette.background.paper, 0.9);
  const cardHoverShadow = theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)';
  
  // Enhanced animations for more life
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Hover animations for cards
  const cardVariants = {
    hover: { 
      y: -8,
      boxShadow: cardHoverShadow,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    }
  };
  
  // Icon animation
  const iconVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { type: 'spring', stiffness: 300, damping: 10 } 
    }
  };

  // Teknologi yang digunakan
  const technologies = [
    { name: 'React', description: 'Library JavaScript untuk membangun antarmuka pengguna', icon: '⚛️' },
    { name: 'Material UI', description: 'Framework UI modern dengan komponen yang responsif', icon: '🎨' },
    { name: 'Leaflet', description: 'Library peta interaktif open-source', icon: '🗺️' },
    { name: 'Framer Motion', description: 'Library animasi untuk React', icon: '✨' },
    { name: 'Python', description: 'Bahasa pemrograman untuk scraping dan pemrosesan data', icon: '🐍' }
  ];

  // Sumber data
  const dataSources = [
    { name: 'Badan Pusat Statistik (BPS)', url: 'https://www.bps.go.id/', color: '#2196f3' },
    { name: 'Portal Satu Data Indonesia', url: 'https://data.go.id/', color: '#4caf50' },
    { name: 'Geoportal Indonesia', url: 'https://tanahair.indonesia.go.id/portal-web', color: '#ff5722' }
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', damping: 15 }}
      >
        {/* Header with gradient */}
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            py: 5,
            borderRadius: 3,
            backgroundImage: `${accentGradient}`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              opacity: 0.3,
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40%',
                  height: '4px',
                  background: 'white',
                  bottom: '-8px',
                  left: '30%',
                  borderRadius: '4px'
                }
              }}
            >
              WebGIS Indonesia
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                maxWidth: '800px',
                mx: 'auto',
                mt: 2,
                opacity: 0.9,
                fontWeight: 300
              }}
            >
              Visualisasi data geografis yang mempermudah analisis statistik Indonesia
        </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {/* Sebelah Kiri */}
          <Grid item xs={12} md={8}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '6px',
                      height: '100%',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Info sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Deskripsi Aplikasi
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: alpha(theme.palette.text.primary, 0.8), lineHeight: 1.8 }}>
                    WebGIS Indonesia adalah aplikasi visualisasi data geografis yang menyajikan informasi statistik 
                    dari Badan Pusat Statistik (BPS) Indonesia dalam bentuk peta interaktif. Aplikasi ini bertujuan 
                    untuk memudahkan pengguna dalam memahami dan menganalisis data statistik Indonesia berdasarkan 
                    wilayah geografis.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: alpha(theme.palette.text.primary, 0.8), lineHeight: 1.8 }}>
                    Fitur utama aplikasi ini mencakup visualisasi data pada peta interaktif, eksplorasi data dalam 
                    bentuk tabel dan grafik, serta kemampuan untuk mengunduh data dalam berbagai format. Pengguna dapat 
                    dengan mudah membandingkan data antar provinsi, menganalisis tren dari waktu ke waktu, dan mendapatkan 
                    wawasan dari data statistik yang disajikan.
                  </Typography>
                </Paper>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '6px',
                      height: '100%',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <DataObject sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Sumber Data
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: alpha(theme.palette.text.primary, 0.8), lineHeight: 1.8, mb: 3 }}>
                    Data yang digunakan dalam aplikasi ini bersumber dari Badan Pusat Statistik (BPS) Indonesia dan 
                    lembaga resmi lainnya. Data diperoleh melalui API resmi atau proses scraping data dari situs web resmi 
                    dengan tetap menghormati ketentuan penggunaan data.
                  </Typography>
                  <Grid container spacing={2}>
                    {dataSources.map((source, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          whileHover="hover"
                          variants={cardVariants}
                        >
                          <Card 
                            variant="outlined" 
                            sx={{ 
                              height: '100%', 
                              borderRadius: 2, 
                              border: `1px solid ${alpha(source.color, 0.3)}`,
                              transition: 'all 0.3s',
                              '&:hover': {
                                borderColor: source.color,
                                background: alpha(source.color, 0.05)
                              }
                            }}
                          >
                          <CardContent>
                              <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: source.color }}>
                              {source.name}
                            </Typography>
                              <Button
                                variant="text"
                                component={Link}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                endIcon={<OpenInNew fontSize="small" />}
                                sx={{ 
                                  mt: 1, 
                                  color: source.color,
                                  textTransform: 'none',
                                  fontSize: '0.875rem',
                                  '&:hover': {
                                    background: alpha(source.color, 0.1)
                                  }
                                }}
                              >
                              Kunjungi Situs
                              </Button>
                          </CardContent>
                        </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '6px',
                      height: '100%',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Code sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Teknologi
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ color: alpha(theme.palette.text.primary, 0.8), lineHeight: 1.8, mb: 3 }}>
                    Aplikasi ini dibangun menggunakan berbagai teknologi modern untuk memberikan pengalaman pengguna 
                    yang optimal:
                  </Typography>
                  <Grid container spacing={2}>
                    {technologies.map((tech, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <motion.div
                          whileHover="hover"
                          variants={cardVariants}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              display: 'flex',
                              alignItems: 'center',
                              transition: 'all 0.3s',
                              '&:hover': {
                                background: alpha(theme.palette.primary.main, 0.05),
                                borderColor: alpha(theme.palette.primary.main, 0.3)
                              }
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                mr: 2,
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                              }}
                            >
                              {tech.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {tech.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tech.description}
                              </Typography>
                            </Box>
                          </Paper>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            </motion.div>
          </Grid>
          
          {/* Sebelah Kanan */}
          <Grid item xs={12} md={4}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100%',
                      height: '6px',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Public sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      GIS
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      color: alpha(theme.palette.text.primary, 0.8), 
                      lineHeight: 1.8,
                      fontWeight: 'medium'
                    }}
                  >
                    <span style={{ 
                      background: accentGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Geographic Information System (GIS)
                    </span> adalah sistem yang dirancang untuk menangkap, 
                    menyimpan, memanipulasi, menganalisis, mengelola, dan menyajikan semua jenis data geografis.
                  </Typography>
                  <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      color: alpha(theme.palette.text.primary, 0.8), 
                      lineHeight: 1.8,
                      mb: 0
                    }}
                  >
                    WebGIS adalah implementasi GIS di web yang memungkinkan pengguna untuk mengakses informasi geografis 
                    melalui browser tanpa perlu menginstal perangkat lunak khusus.
                  </Typography>
                </Paper>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100%',
                      height: '6px',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <GitHub sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Kontribusi
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      color: alpha(theme.palette.text.primary, 0.8), 
                      lineHeight: 1.8,
                      mb: 3
                    }}
                  >
                    Aplikasi ini bersifat open source dan menerima kontribusi dari komunitas. Jika Anda tertarik untuk 
                    berkontribusi, silakan kunjungi repositori GitHub kami.
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outlined"
                        startIcon={<GitHub />}
                        endIcon={<KeyboardArrowRight />}
                      component={Link} 
                      href="#"
                      target="_blank"
                        size="large"
                        sx={{ 
                          borderRadius: '50px',
                          px: 3,
                          py: 1,
                          borderWidth: 2,
                          textTransform: 'none',
                          fontWeight: 'medium',
                          background: `linear-gradient(to right, transparent, transparent)`,
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.05),
                            borderWidth: 2
                          }
                        }}
                      >
                        GitHub Repository
                      </Button>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    background: softBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100%',
                      height: '6px',
                      background: accentGradient
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box 
                      component={motion.div}
                      whileHover="hover"
                    >
                      <Box
                        component={motion.div}
                        variants={iconVariants}
                        sx={{ 
                          mr: 2,
                          p: 1.5,
                          borderRadius: '16px',
                          background: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Layers sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Fitur Utama
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      { 
                        icon: <Public />, 
                        title: 'Peta Interaktif', 
                        desc: 'Visualisasi data pada peta Indonesia dengan tampilan yang responsif dan mudah digunakan',
                        color: theme.palette.primary.main
                      },
                      { 
                        icon: <BarChart />, 
                        title: 'Visualisasi Data', 
                        desc: 'Grafik dan diagram interaktif untuk analisis data yang lebih mendalam',
                        color: theme.palette.secondary.main
                      },
                      { 
                        icon: <DataObject />, 
                        title: 'Ekspor Data', 
                        desc: 'Unduh data dalam format CSV dan Excel untuk penggunaan di aplikasi lain',
                        color: theme.palette.info.main
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ListItem
                          sx={{ 
                            px: 0, 
                            py: 2,
                            borderBottom: index < 2 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 44 }}>
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                borderRadius: '12px',
                                background: alpha(feature.color, 0.1),
                                color: feature.color
                              }}
                            >
                              {feature.icon}
                            </Box>
                      </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {feature.title}
                              </Typography>
                            } 
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {feature.desc}
                              </Typography>
                            } 
                          />
                    </ListItem>
                      </motion.div>
                    ))}
                  </List>
                  
                  {/* Call to action button */}
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          borderRadius: '50px',
                          py: 1.5,
                          background: accentGradient,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                        }}
                      >
                        Jelajahi Aplikasi
                      </Button>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Footer section with animated wave */}
        <Box 
          sx={{ 
            position: 'relative',
            mt: 6,
            pt: 8,
            pb: 4,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '120px',
              backgroundImage: theme.palette.mode === 'dark'
                ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%232c3e50' fill-opacity='0.2'%3E%3C/path%3E%3C/svg%3E")`
                : `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%233a7bd5' fill-opacity='0.2'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{ 
                opacity: 0.8, 
                maxWidth: 600, 
                mx: 'auto',
                fontStyle: 'italic'
              }}
            >
              WebGIS Indonesia dibuat dengan tujuan untuk mempermudah akses dan pemahaman terhadap data statistik Indonesia,
              sehingga data tersebut dapat digunakan secara lebih efektif untuk pengambilan keputusan dan kepentingan publik.
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 