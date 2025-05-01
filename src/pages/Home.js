import { ArrowForward, BarChart, BarChartOutlined, Map, Public, TrendingUp } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  
  // Create refs for the sections to animate on scroll
  const featuresRef = useRef(null);
  const dataRef = useRef(null);
  const statsRef = useRef(null);
  
  // Check if the sections are in view
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const dataInView = useInView(dataRef, { once: false, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 });
  
  // Animations controls
  const featuresControl = useAnimation();
  const dataControl = useAnimation();
  const statsControl = useAnimation();
  
  // Start animations when sections come into view
  useEffect(() => {
    if (featuresInView) {
      featuresControl.start('visible');
    }
    if (dataInView) {
      dataControl.start('visible');
    }
    if (statsInView) {
      statsControl.start('visible');
    }
  }, [featuresInView, dataInView, statsInView, featuresControl, dataControl, statsControl]);
  
  // Animasi untuk konten
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  const features = [
    {
      title: 'Peta Interaktif',
      description: 'Jelajahi peta Indonesia dengan tampilan yang interaktif dan responsif pada berbagai perangkat.',
      icon: <Map fontSize="large" sx={{ color: '#3a7bd5' }} />,
      link: '/map',
      color: 'linear-gradient(135deg, rgba(58, 123, 213, 0.8) 0%, rgba(0, 210, 255, 0.8) 100%)'
    },
    {
      title: 'Analisis Data',
      description: 'Visualisasi berbagai data statistik dari BPS untuk analisis dan pengambilan keputusan.',
      icon: <BarChart fontSize="large" sx={{ color: '#f07b3f' }} />,
      link: '/explorer',
      color: 'linear-gradient(135deg, rgba(240, 123, 63, 0.8) 0%, rgba(247, 183, 51, 0.8) 100%)'
    },
    {
      title: 'Data Spasial',
      description: 'Akses data spasial Indonesia lengkap dengan informasi geografis yang akurat.',
      icon: <Public fontSize="large" sx={{ color: '#2ecc71' }} />,
      link: '/map',
      color: 'linear-gradient(135deg, rgba(46, 204, 113, 0.8) 0%, rgba(97, 225, 160, 0.8) 100%)'
    },
    {
      title: 'Tren & Perbandingan',
      description: 'Bandingkan data antar wilayah dan lihat tren perkembangan dari waktu ke waktu.',
      icon: <TrendingUp fontSize="large" sx={{ color: '#9b59b6' }} />,
      link: '/explorer',
      color: 'linear-gradient(135deg, rgba(155, 89, 182, 0.8) 0%, rgba(186, 133, 212, 0.8) 100%)'
    }
  ];

  const stats = [
    { value: '34', label: 'Provinsi', icon: <Public /> },
    { value: '514', label: 'Kabupaten/Kota', icon: <Map /> },
    { value: '50+', label: 'Dataset', icon: <BarChartOutlined /> }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with Enhanced 3D Effect and Animation */}
      <Box 
        sx={{ 
          position: 'relative',
          py: { xs: 10, md: 15 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1c2331 0%, #2c3e50 100%)' 
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at center, rgba(58, 123, 213, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
              : 'radial-gradient(circle at center, rgba(58, 123, 213, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
            zIndex: 1
          }
        }}
      >
        {/* Enhanced animated background elements */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.primary.light}22 0%, ${theme.palette.primary.main}11 70%)`,
              width: { xs: '150px', md: `${200 + i * 50}px` },
              height: { xs: '150px', md: `${200 + i * 50}px` },
              opacity: 0.4,
              filter: 'blur(8px)',
              zIndex: 1
            }}
            animate={{
              x: [0, Math.random() * 120 - 60, 0],
              y: [0, Math.random() * 120 - 60, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
      <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 10, delay: 0.2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
            mb: 6
          }}
        >
                  <Box 
                    component={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{ mb: 2 }}
                  >
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        fontSize: '1rem'
                      }}
                    >
                      PLATFORM VISUALISASI DATA
                    </Typography>
                  </Box>
                  
          <Typography
                    variant="h1"
            component="h1"
            gutterBottom
                    sx={{ 
                      fontWeight: 900, 
                      mb: 2,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #3a7bd5, #00d2ff)'
                        : 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: theme.palette.mode === 'dark' 
                        ? '0 0 30px rgba(58, 123, 213, 0.3)' 
                        : 'none',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: { xs: '25%', md: 0 },
                        width: { xs: '50%', md: '80px' },
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: theme.palette.secondary.main
                      }
                    }}
          >
            WebGIS Indonesia
          </Typography>
                  
          <Typography
            variant="h5"
            color="textSecondary"
                    sx={{ 
                      mb: 4, 
                      maxWidth: '600px',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Jelajahi dan visualisasikan data geografis dan statistik seluruh Indonesia dengan tampilan yang modern, interaktif, dan responsif
                    </motion.span>
          </Typography>
                  
                  <Box 
                    sx={{ 
                      mt: 2,
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'center', md: 'flex-start' },
                      gap: 2
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
            <Button
              component={Link}
              to="/map"
              variant="contained"
              size="large"
              color="primary"
                        endIcon={<ArrowForward />}
                        sx={{ 
                          px: 4, 
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '50px',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 10px 25px rgba(0, 0, 0, 0.5)'
                            : '0 10px 25px rgba(58, 123, 213, 0.4)',
                          background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          },
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 15px 30px rgba(0, 0, 0, 0.6)'
                              : '0 15px 30px rgba(58, 123, 213, 0.5)',
                            '&::before': {
                              opacity: 1
                            }
                          }
                        }}
            >
              Jelajahi Peta
            </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
            <Button
              component={Link}
              to="/explorer"
              variant="outlined"
              size="large"
              color="primary"
                        sx={{ 
                          px: 4, 
                          py: 1.5, 
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '50px',
                          borderWidth: '2px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: 'rgba(58, 123, 213, 0.1)',
                            transform: 'translateY(-3px)',
                          }
                        }}
            >
              Eksplorasi Data
            </Button>
                    </motion.div>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      mt: 6, 
                      pt: 2,
                      alignItems: 'center',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      color: 'text.secondary',
                      borderTop: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="body2" sx={{ mr: 3 }}>
                     
                    </Typography>
                    {[' ', ' ', ' '].map((partner, i) => (
                      <Box 
                        key={i} 
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.2) }}
                        sx={{ 
                          mx: 1.5, 
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          fontWeight: 'medium',
                          letterSpacing: 1
                        }}
                      >
                        {partner}
                      </Box>
                    ))}
          </Box>
        </Box>
      </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.6 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotateZ: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 320,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Public 
                        sx={{
                          fontSize: 260,
                          color: theme.palette.primary.main,
                          opacity: 0.2,
                          filter: theme.palette.mode === 'dark' 
                            ? 'drop-shadow(0 0 30px rgba(58, 123, 213, 0.5))' 
                            : 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))',
                        }}
                      />
                      <Map 
                        sx={{
                          position: 'absolute',
                          fontSize: 100,
                          color: theme.palette.primary.main,
                          filter: theme.palette.mode === 'dark' 
                            ? 'drop-shadow(0 0 15px rgba(58, 123, 213, 0.8))' 
                            : 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))',
                        }}
                      />
                    </Box>
                  </motion.div>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section with Enhanced Scroll Animation and Design */}
      <Box ref={featuresRef} sx={{ 
        py: 10, 
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
            animate={featuresControl}
            className="section-header"
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 8
              }}
            >
              <Box 
                sx={{ 
                  backgroundColor: `${theme.palette.primary.main}20`,
                  color: theme.palette.primary.main,
                  px: 2,
                  py: 0.5,
                  borderRadius: 5,
                  mb: 2,
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    mr: 1 
                  }} 
                />
                <Typography variant="body2" fontWeight="medium">FITUR UNGGULAN</Typography>
              </Box>
              
        <Typography
                variant="h2"
          component="h2"
          align="center"
          gutterBottom
                sx={{ 
                  mb: 2, 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Fitur Utama WebGIS Indonesia
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                align="center" 
                color="textSecondary"
                sx={{ mb: 2, maxWidth: '700px', mx: 'auto' }}
              >
                Eksplorasi fitur-fitur utama yang memudahkan dalam mengakses dan menganalisis data spasial Indonesia
        </Typography>
              
              <Box 
                sx={{ 
                  width: 60, 
                  height: 4, 
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                  mt: 2
                }} 
              />
            </Box>
          </motion.div>
          
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      border: theme.palette.mode === 'dark' 
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : 'none',
                      transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      }
                  }}
                  component={Link}
                  to={feature.link}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                        alignItems: 'center',
                        p: 4,
                        background: feature.color,
                        position: 'relative',
                        overflow: 'hidden',
                        height: 160
                      }}
                    >
                      {/* Enhanced animated background patterns */}
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          component={motion.div}
                          sx={{
                            position: 'absolute',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            width: `${40 + i * 20}px`,
                            height: `${40 + i * 20}px`,
                          }}
                          animate={{
                            x: [0, Math.random() * 30 - 15, 0],
                            y: [0, Math.random() * 30 - 15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                      
                      <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          <Box sx={{ 
                            fontSize: '4rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.2))'
                          }}>
                            {feature.icon}
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 'bold',
                          mb: 2
                        }}
                      >
                      {feature.title}
                    </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {feature.description}
                    </Typography>
                      
                      <Box sx={{ 
                        mt: 'auto', 
                        display: 'flex', 
                        alignItems: 'center',
                        color: theme.palette.primary.main,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}>
                        <Typography variant="body2" sx={{ mr: 1, fontWeight: 'medium' }}>
                          Jelajahi
                        </Typography>
                        <ArrowForward fontSize="small" />
                      </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        </Container>
      </Box>

      {/* Stats Section with Enhanced Design */}
      <Box 
        ref={statsRef}
        sx={{ 
          py: 10, 
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #2c3e50 0%, #1e3c72 100%)' 
            : 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
          color: 'white',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsControl}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="overline"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  fontSize: '0.875rem',
                  display: 'block',
                  mb: 1
                }}
              >
                STATISTIK NASIONAL
              </Typography>
              
          <Typography
                variant="h3"
            component="h2"
            align="center"
            gutterBottom
                sx={{ 
                  mb: 1, 
                  fontWeight: 800, 
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Data Indonesia dalam Angka
          </Typography>
              
              <Box 
                sx={{ 
                  width: 60, 
                  height: 4, 
                  backgroundColor: 'white',
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 5,
                  mt: 2
                }} 
              />
            </Box>
            
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      transition: { type: 'spring', stiffness: 400, damping: 10 } 
                    }}
                  >
          <Paper
            sx={{
              p: 4,
                        textAlign: 'center',
                        height: '100%',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                          background: 'rgba(255, 255, 255, 0.15)',
                        }
                      }}
                      elevation={0}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2 
                      }}>
                        <Box 
                          sx={{ 
                            width: 70, 
                            height: 70, 
                            borderRadius: '50%', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontSize: '2rem'
                          }}
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            {stat.icon}
                          </motion.div>
                        </Box>
                      </Box>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          type: 'spring',
                          damping: 10,
                          delay: 0.2 + index * 0.1
                        }}
                      >
                        <Typography 
                          variant="h2" 
                          component="div" 
                          sx={{ 
                            fontWeight: 800,
                            mb: 1,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </motion.div>
                      
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                          fontSize: '1.1rem'
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Data Section with Enhanced Design */}
      <Box 
        ref={dataRef}
        sx={{ 
          py: 10, 
          background: theme.palette.background.default,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: `linear-gradient(to bottom, ${theme.palette.mode === 'dark' ? '#1e3c72' : '#00d2ff'}, ${theme.palette.background.default})`,
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={dataControl}
            className="section-header"
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box 
                sx={{ 
                  backgroundColor: `${theme.palette.secondary.main}20`,
                  color: theme.palette.secondary.main,
                  px: 2,
                  py: 0.5,
                  borderRadius: 5,
                  mb: 2,
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.secondary.main,
                    mr: 1 
                  }} 
                />
                <Typography variant="body2" fontWeight="medium">STATISTIK TERKINI</Typography>
              </Box>
              
              <Typography
                variant="h2"
                component="h2"
                align="center"
                gutterBottom
                sx={{ 
                  mb: 2, 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Data Terbaru dan Mutakhir
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                align="center" 
                color="textSecondary"
                sx={{ mb: 2, maxWidth: '700px', mx: 'auto' }}
              >
                Akses data terbaru dan terperinci untuk mendukung analisis dan pengambilan keputusan
              </Typography>
              
              <Box 
                sx={{ 
                  width: 60, 
                  height: 4, 
                  backgroundColor: theme.palette.secondary.main,
              borderRadius: 2,
                  mx: 'auto',
                  mb: 2,
                  mt: 2
                }} 
              />
            </Box>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: theme.palette.mode === 'dark' ? 0.03 : 0.05,
                  backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                }}
              />
              
              <Grid container alignItems="center" position="relative" zIndex={1}>
                <Grid 
                  item 
                  xs={12} 
                  md={5} 
                  sx={{ 
                    p: { xs: 4, md: 5 },
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        ease: 'easeInOut' 
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        <BarChart 
                          sx={{ 
                            fontSize: { xs: 180, md: 220 }, 
                            color: theme.palette.secondary.main,
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                          }} 
                        />
                      </Box>
                    </motion.div>
                    
                    {/* Decorative background circles */}
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        width: 200, 
                        height: 200, 
                        borderRadius: '50%', 
                        backgroundColor: `${theme.palette.secondary.main}15`,
                        zIndex: 1
                      }} 
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        width: 300, 
                        height: 300, 
                        borderRadius: '50%', 
                        backgroundColor: `${theme.palette.secondary.main}10`,
                        zIndex: 0
                      }} 
                    />
                  </Box>
                </Grid>
                
                <Grid 
                  item 
                  xs={12} 
                  md={7} 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.4)' 
                      : 'rgba(255, 255, 255, 0.9)', 
                    p: { xs: 4, md: 5 },
                    height: '100%',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: { xs: '-20px', md: '50%' },
                      left: { xs: '50%', md: '-20px' },
                      width: { xs: '40px', md: '40px' },
                      height: { xs: '40px', md: '40px' },
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(0, 0, 0, 0.4)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      transform: { xs: 'translateX(-50%) rotate(45deg)', md: 'translateY(-50%) rotate(45deg)' },
                      zIndex: 0
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 800,
                        mb: 2,
                        fontSize: { xs: '1.75rem', md: '2.2rem' }
                      }}
                    >
                  Jelajahi Data Statistik Indonesia
                </Typography>
                    
                    <Box 
                      sx={{ 
                        width: 50,
                        height: 4,
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: 2,
                        mb: 3
                      }} 
                    />
                    
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        mb: 3,
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7
                      }}
                    >
                  Akses data terbaru dari Badan Pusat Statistik (BPS) dalam format yang mudah dipahami
                  dan divisualisasikan pada peta interaktif. Anda dapat melihat berbagai indikator
                  statistik seperti populasi, ekonomi, pendidikan, dan banyak lagi.
                </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {['Demografi', 'Ekonomi', 'Pendidikan', 'Kesehatan', 'Lingkungan'].map((tag, i) => (
                        <Chip 
                          key={i} 
                          label={tag} 
                          size="small" 
                          color={i % 2 === 0 ? 'primary' : 'secondary'} 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      ))}
                    </Box>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/explorer"
                        endIcon={<ArrowForward />}
                  sx={{
                          mt: 2,
                          borderRadius: '50px',
                          px: 3,
                          py: 1.2,
                          fontWeight: 600,
                          boxShadow: '0 8px 20px rgba(240, 123, 63, 0.3)',
                          background: 'linear-gradient(45deg, #f07b3f, #f7b733)'
                        }}
                      >
                        Lihat Data Terbaru
                      </Button>
                    </motion.div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
      </motion.div>
    </Container>
      </Box>
    </Box>
  );
};

export default Home; 