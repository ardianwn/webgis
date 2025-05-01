import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  FilterAlt,
  InfoOutlined,
  LayersOutlined,
  Map as MapIcon,
  Satellite,
  SearchOutlined,
  Terrain
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';

// Mengimpor CSS untuk memperbaiki ikon Leaflet
import '../styles/leaflet-fix.scss';

// Komponen untuk mengubah layer peta dasar
const ChangeMapView = ({ tileProvider }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && tileProvider) {
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      
      L.tileLayer(tileProvider.url, {
        attribution: tileProvider.attribution,
        maxZoom: tileProvider.maxZoom || 19
      }).addTo(map);
    }
  }, [map, tileProvider]);

  return null;
};

const MapPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDataset, setSelectedDataset] = useState('');
  const [datasets, setDatasets] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [opacity, setOpacity] = useState(0.7);
  const [activeRegion, setActiveRegion] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [legendOpen, setLegendOpen] = useState(true);
  const mapRef = useRef(null);
  
  // Daftar provider tile yang tersedia
  const tileProviders = [
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      icon: <MapIcon />,
      color: '#3a7bd5'
    },
    {
      name: 'OpenTopoMap',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
      maxZoom: 17,
      icon: <Terrain />,
      color: '#2ecc71'
    },
    {
      name: 'ESRI World Imagery',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      maxZoom: 19,
      icon: <Satellite />,
      color: '#34495e'
    },
    {
      name: 'CartoDB Dark',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com">CartoDB</a> contributors',
      maxZoom: 19,
      icon: <MapIcon />,
      color: '#1a1a2e'
    },
    {
      name: 'CartoDB Voyager',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com">CartoDB</a> contributors',
      maxZoom: 19,
      icon: <MapIcon />,
      color: '#4a69bd'
    }
  ];
  
  // State untuk menyimpan provider tile yang dipilih
  const [selectedTileProvider, setSelectedTileProvider] = useState(tileProviders[0]);

  // Mendapatkan daftar dataset
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        // Simulasi data dari API
        const sampleDatasets = [
          { id: '1', name: 'Jumlah Penduduk per Provinsi', year: '2020', indicator: 'Demografi' },
          { id: '2', name: 'Produk Domestik Regional Bruto', year: '2019', indicator: 'Ekonomi' },
          { id: '3', name: 'Tingkat Pengangguran Terbuka', year: '2021', indicator: 'Ketenagakerjaan' },
          { id: '4', name: 'Indeks Pembangunan Manusia', year: '2021', indicator: 'Sosial' },
          { id: '5', name: 'Persentase Penduduk Miskin', year: '2021', indicator: 'Kemiskinan' }
        ];
        setDatasets(sampleDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  // Mendapatkan GeoJSON data Indonesia
  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        // Dalam implementasi sebenarnya, data ini akan diambil dari server
        // Saat ini kita menggunakan URL publik untuk mendapatkan GeoJSON Indonesia
        const response = await fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson');
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON:', error);
      }
    };

    fetchGeoJson();
  }, []);

  // Mendapatkan data statistik saat dataset dipilih
  useEffect(() => {
    if (!selectedDataset) return;

    const fetchStatData = async () => {
      try {
        // Implementasi sebenarnya akan mengambil data dari server
        console.log(`Fetching data for dataset ${selectedDataset}`);
        // setStatData(data);
      } catch (error) {
        console.error('Error fetching statistical data:', error);
      }
    };

    fetchStatData();
  }, [selectedDataset]);

  // Fungsi style untuk GeoJSON
  const getStyle = (feature) => {
    // Warna berdasarkan dataset yang dipilih (implementasi sederhana)
    const getColorScale = () => {
      if (!selectedDataset) return ['#3a7bd5', '#3a7bd5', '#3a7bd5', '#3a7bd5', '#3a7bd5'];

      const dataset = datasets.find(d => d.id === selectedDataset);
      switch (dataset?.indicator) {
        case 'Ketenagakerjaan':
          // Updated colors for unemployment data to match the example image
          return ['#f9ffef', '#c5e8b3', '#7aca7a', '#309c54', '#0d472d'];
        case 'Demografi': 
          // Updated to purple gradient for population data (Jumlah Penduduk)
          return ['#e4e6f5', '#b6b4d8', '#9381b8', '#7b559e', '#5e2c8a'];
        case 'Ekonomi': 
          return ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#225ea8'];
        case 'Sosial': 
          return ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#ae017e'];
        case 'Kemiskinan': 
          return ['#fff7bc', '#fee391', '#fec44f', '#fe9929', '#cc4c02'];
        default: 
          return ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'];
      }
    };

    const colorScale = getColorScale();
    const random = Math.floor(Math.random() * colorScale.length);
    const color = colorScale[random];

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: opacity
    };
  };

  // Fungsi saat fitur di klik
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const { NAME_1 } = feature.properties;
      
      // Popup saat provinsi diklik dengan styling yang lebih baik
      const popupContent = `
        <div class="custom-popup">
          <h4 style="
            margin-top: 0;
            margin-bottom: 12px;
            color: #3a7bd5;
            font-size: 18px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${NAME_1}
          </h4>
          <div class="popup-content" style="
            margin-bottom: 15px;
            font-size: 14px;
          ">
            <p style="
              margin: 6px 0;
              display: flex;
              justify-content: space-between;
            ">
              <span style="font-weight: 500; color: #666;">Indikator:</span>
              <span style="max-width: 170px; text-align: right;">${datasets.find(d => d.id === selectedDataset)?.name || 'Pilih dataset'}</span>
            </p>
            <p style="
              margin: 6px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
              <span style="font-weight: 500; color: #666;">Nilai:</span>
              <span style="
                font-weight: bold;
                color: #3a7bd5;
                font-size: 16px;
              ">${Math.floor(Math.random() * 100).toLocaleString()}</span>
            </p>
            <p style="
              margin: 6px 0;
              display: flex;
              justify-content: space-between;
            ">
              <span style="font-weight: 500; color: #666;">Tahun:</span>
              <span style="
                background-color: #f0f7ff;
                color: #3a7bd5;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
              ">${datasets.find(d => d.id === selectedDataset)?.year || '-'}</span>
            </p>
          </div>
          <button class="popup-button" style="
            background-color: #3a7bd5;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          " onmouseover="this.style.backgroundColor='#2c6bc7'" onmouseout="this.style.backgroundColor='#3a7bd5'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Lihat Detail
          </button>
        </div>
      `;
      
      // Kustomisasi popup
      const customPopup = L.popup({
        maxWidth: 300,
        minWidth: 250,
        className: 'custom-leaflet-popup',
        closeButton: true,
        closeOnClick: false,
        autoPan: true,
        autoPanPadding: [50, 50]
      }).setContent(popupContent);
      
      layer.bindPopup(customPopup);
      
      // Highlight saat mouse over
      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            weight: 3,
            color: '#FFFFFF',
            dashArray: '',
            fillOpacity: opacity + 0.2
          });
          layer.bringToFront();
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            weight: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: opacity
          });
        },
        click: (e) => {
          setActiveRegion({
            name: NAME_1,
            value: Math.floor(Math.random() * 100),
            year: datasets.find(d => d.id === selectedDataset)?.year || '2021',
            dataset: datasets.find(d => d.id === selectedDataset)?.name || 'Data tidak tersedia'
          });
          setShowInfoPanel(true);
        }
      });
    }
  };

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const handleOpacityChange = (event, newValue) => {
    setOpacity(newValue);
  };
  
  const handleTileProviderChange = (provider) => {
    setSelectedTileProvider(provider);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  const buttonVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 }
  };

  // Helper function to get color scale for the legend
  const getLegendColorScale = () => {
    if (!selectedDataset) return ['#3a7bd5', '#3a7bd5', '#3a7bd5', '#3a7bd5', '#3a7bd5'];

    const dataset = datasets.find(d => d.id === selectedDataset);
    switch (dataset?.indicator) {
      case 'Ketenagakerjaan':
        // Updated colors for unemployment data to match the example image
        return ['#f9ffef', '#c5e8b3', '#7aca7a', '#309c54', '#0d472d'];
      case 'Demografi': 
        // Updated to purple gradient for population data (Jumlah Penduduk)
        return ['#e4e6f5', '#b6b4d8', '#9381b8', '#7b559e', '#5e2c8a'];
      case 'Ekonomi': 
        return ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#225ea8'];
      case 'Sosial': 
        return ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#ae017e'];
      case 'Kemiskinan': 
        return ['#fff7bc', '#fee391', '#fec44f', '#fe9929', '#cc4c02'];
      default: 
        return ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'];
    }
  };

  return (
    <Box sx={{ position: 'relative', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      
      {/* Drawer Panel Kontrol */}
      <AnimatePresence>
        <motion.div
          initial={isMobile ? 'closed' : 'open'}
          animate={drawerOpen ? 'open' : 'closed'}
          variants={drawerVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: { xs: 280, md: 320 },
              height: '100%',
              overflow: 'auto',
              borderRadius: 0,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom, rgba(44, 62, 80, 0.97), rgba(28, 35, 49, 0.97))'
                : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.97), rgba(249, 250, 251, 0.97))',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display="flex" alignItems="center">
                <MapIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Peta Interaktif
                </Typography>
              </Box>
              <IconButton onClick={toggleDrawer} size="small">
                <ChevronLeft />
              </IconButton>
            </Box>
            
            <Divider />
            
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Cari wilayah..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <FilterAlt fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                Filter Data
              </Typography>
              
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel id="dataset-select-label">Dataset</InputLabel>
                <Select
                  labelId="dataset-select-label"
                  id="dataset-select"
                  value={selectedDataset}
                  label="Dataset"
                  onChange={handleDatasetChange}
                >
                  <MenuItem value="">
                    <em>Pilih dataset</em>
                  </MenuItem>
                  {datasets.map((dataset) => (
                    <MenuItem key={dataset.id} value={dataset.id}>
                      <Box>
                        {dataset.name}
                        <Box display="flex" alignItems="center" mt={0.5}>
                          <Chip 
                            label={dataset.indicator} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                            sx={{ mr: 1, fontSize: '0.7rem' }}
                          />
                          <Chip 
                            label={dataset.year} 
                            size="small" 
                            color="secondary" 
                            variant="outlined" 
                            sx={{ fontSize: '0.7rem' }}
                          />
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <LayersOutlined fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                  Lapisan Peta
                </Typography>
                
                <Accordion
                  elevation={0}
                  sx={{
                    mt: 1,
                    background: 'transparent',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ p: 0 }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Tampilan Dasar
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Grid container spacing={1}>
                      {tileProviders.map((provider, index) => (
                        <Grid item xs={6} key={index}>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Paper
                              elevation={0}
                              onClick={() => handleTileProviderChange(provider)}
                              sx={{
                                p: 1,
                                cursor: 'pointer',
                                border: `1px solid ${provider === selectedTileProvider ? provider.color : theme.palette.divider}`,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: provider === selectedTileProvider 
                                  ? `${provider.color}10` 
                                  : theme.palette.background.paper
                              }}
                            >
                              <Box 
                                sx={{ 
                                  mr: 1, 
                                  color: provider.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {provider.icon}
                              </Box>
                              <Typography variant="body2" noWrap>
                                {provider.name}
                              </Typography>
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                    Transparansi
                  </Typography>
                  <Slider
                    value={opacity}
                    onChange={handleOpacityChange}
                    min={0}
                    max={1}
                    step={0.1}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 0.5, label: '50%' },
                      { value: 1, label: '100%' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value * 100}%`}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <InfoOutlined fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                  Informasi
                </Typography>
                
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.15)' 
                      : 'rgba(0, 0, 0, 0.03)',
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography variant="body2">
                    Data pada peta interaktif ini merupakan data simulasi untuk keperluan demonstrasi.
                  </Typography>
                  
                  <Button 
                    size="small"
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 1, textTransform: 'none', borderRadius: '50px' }}
                  >
                    Tentang Data
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>

      {/* Tombol toggle drawer untuk mobile */}
      {!drawerOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 900
          }}
        >
          <Tooltip title="Buka Panel Kontrol">
            <IconButton
              onClick={toggleDrawer}
              size="large"
              color="primary"
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <ChevronRight />
            </IconButton>
          </Tooltip>
        </motion.div>
      )}

      {/* Legend */}
      <AnimatePresence>
        {selectedDataset && legendOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: drawerOpen ? (isMobile ? '280px' : '320px') : '20px',
              zIndex: 900,
              maxWidth: '350px'
            }}
          >
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }} className="glass-panel">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {datasets.find(d => d.id === selectedDataset)?.name}
                </Typography>
                <IconButton size="small" onClick={() => setLegendOpen(false)}>
                  <ChevronRight fontSize="small" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {(() => {
                  const colorScale = getLegendColorScale();
                  return (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: colorScale[4], mr: 1, borderRadius: 1 }} />
                        <Typography variant="caption">Sangat Tinggi</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: colorScale[3], mr: 1, borderRadius: 1 }} />
                        <Typography variant="caption">Tinggi</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: colorScale[2], mr: 1, borderRadius: 1 }} />
                        <Typography variant="caption">Sedang</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: colorScale[1], mr: 1, borderRadius: 1 }} />
                        <Typography variant="caption">Rendah</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: colorScale[0], mr: 1, borderRadius: 1 }} />
                        <Typography variant="caption">Sangat Rendah</Typography>
                      </Box>
                    </>
                  );
                })()}
              </Box>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                Sumber: BPS, {datasets.find(d => d.id === selectedDataset)?.year}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Peta */}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          transition: 'margin-left 0.3s ease',
          ml: drawerOpen ? { xs: '280px', md: '320px' } : 0
        }}
      >
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          ref={mapRef}
          className="map-container"
        >
          <TileLayer
            url={selectedTileProvider.url}
            attribution={selectedTileProvider.attribution}
          />
          <ZoomControl position="bottomright" />
          <ChangeMapView tileProvider={selectedTileProvider} />
          
          {geojsonData && (
            <GeoJSON
              data={geojsonData}
              style={getStyle}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </Box>
      
      {/* Watermark */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 900,
          pointerEvents: 'none'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            fontWeight: 'medium'
          }}
        >
          WebGIS Indonesia © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default MapPage; 