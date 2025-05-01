import {
    BarChart as BarChartIcon,
    DataArray,
    FileDownload,
    FilterAlt,
    PieChart as PieChartIcon,
    Refresh,
    Search,
    Timeline,
    TrendingUp,
    ViewList,
    ViewModule
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
// Import chart library
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Tooltip as ChartTooltip, Legend, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const DataExplorer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDataset, setSelectedDataset] = useState('');
  const [datasets, setDatasets] = useState([]);
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'province', direction: 'asc' });
  const chartRef = useRef(null);

  // Mendapatkan daftar dataset
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch('/src/data/bps/datasets.json');
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  // Mendapatkan daftar provinsi dari GeoJSON
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('./data/indonesia.geojson');
        const data = await response.json();
        const provinceList = data.features.map(feature => feature.properties.state);
        setProvinces(provinceList);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  // Mendapatkan data saat dataset dipilih
  useEffect(() => {
    if (!selectedDataset || !provinces.length) return;

    const fetchDatasetData = async () => {
      setIsLoading(true);
      
      try {
        // Mengambil data dari file CSV sesuai dataset yang dipilih
        const response = await fetch(`./data/bps/${selectedDataset}_${datasets.find(d => d.id === selectedDataset)?.name.replace(/\s+/g, '_').toLowerCase()}.csv`);
        const csvText = await response.text();
        
        // Parsing data CSV
        const rows = csvText.split('\n');
        const headers = rows[0].split(',');
        const provinceIndex = headers.indexOf('province');
        const valueIndex = headers.indexOf('value');
        const yearIndex = headers.indexOf('year');
        
        // Membuat array data dari CSV
        const csvData = [];
        
        // Skip baris header (index 0)
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;
          
          const columns = rows[i].split(',');
          const province = columns[provinceIndex];
          const value = parseFloat(columns[valueIndex]);
          const year = columns[yearIndex];
          
          csvData.push({
        province,
            value,
            year,
            // Generate nilai tambahan
            trend: Math.random() > 0.5 ? 'up' : 'down',
            change: parseFloat((Math.random() * 10).toFixed(2)),
            rank: i
          });
        }
        
        // Sort data berdasarkan nilai untuk mendapatkan ranking yang benar
        csvData.sort((a, b) => b.value - a.value);
        csvData.forEach((item, index) => {
          item.rank = index + 1;
        });
        
        // Generate data historis (simulasi untuk contoh tren waktu)
        const selectedYear = datasets.find(d => d.id === selectedDataset)?.year;
        const historicalYears = Array.from({ length: 7 }, (_, i) => (parseInt(selectedYear) - 6 + i).toString());
        
        // Pilih 5 provinsi dengan nilai tertinggi untuk data historis
        const topProvinces = csvData.slice(0, 5);
        
        const historicalData = topProvinces.map(provinceData => {
          return {
            province: provinceData.province,
            values: historicalYears.map(year => ({
              year,
              value: year === selectedYear ? 
                provinceData.value : 
                // Simulasi nilai historis dengan variasi random dari nilai saat ini
                parseFloat((provinceData.value * (0.7 + Math.random() * 0.6)).toFixed(2))
            }))
          };
        });
        
        setData(csvData);
        setHistoryData(historicalData);
      } catch (error) {
        console.error('Error fetching dataset data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatasetData();
  }, [selectedDataset, datasets, provinces]);

  // Filter data berdasarkan pencarian
  const filteredData = data.filter(item => 
    item.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting data
  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Handler untuk perubahan dataset
  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
    setPage(0);
  };

  // Handler untuk perubahan halaman di tabel
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler untuk perubahan baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handler untuk perubahan tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handler untuk perubahan mode tampilan
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Handler untuk pencarian
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handler untuk sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handler untuk me-refresh data
  const handleRefreshData = async () => {
    if (!selectedDataset) return;
    
    setIsLoading(true);
    
    try {
      // Fetch data again
      const response = await fetch(`./data/bps/${selectedDataset}_${datasets.find(d => d.id === selectedDataset)?.name.replace(/\s+/g, '_').toLowerCase()}.csv`);
      const csvText = await response.text();
      
      // Parsing data CSV
      const rows = csvText.split('\n');
      const headers = rows[0].split(',');
      const provinceIndex = headers.indexOf('province');
      const valueIndex = headers.indexOf('value');
      const yearIndex = headers.indexOf('year');
      
      // Membuat array data dari CSV
      const csvData = [];
      
      // Skip baris header (index 0)
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        
        const columns = rows[i].split(',');
        const province = columns[provinceIndex];
        const value = parseFloat(columns[valueIndex]);
        const year = columns[yearIndex];
        
        csvData.push({
          province,
          value,
          year,
          // Generate nilai tambahan
          trend: Math.random() > 0.5 ? 'up' : 'down',
          change: parseFloat((Math.random() * 10).toFixed(2)),
          rank: i
        });
      }
      
      // Sort data berdasarkan nilai untuk mendapatkan ranking yang benar
      csvData.sort((a, b) => b.value - a.value);
      csvData.forEach((item, index) => {
        item.rank = index + 1;
      });
      
      setData(csvData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handler untuk download data
  const handleDownloadData = () => {
    if (!selectedDataset || !data.length) return;
    
    const dataset = datasets.find(d => d.id === selectedDataset);
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Provinsi,Nilai,Tahun,Trend,Perubahan,Peringkat\n";
    
    sortedData.forEach(item => {
      csvContent += `${item.province},${item.value},${item.year},${item.trend === 'up' ? 'Naik' : 'Turun'},${item.change},${item.rank}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${dataset.name.replace(/\s+/g, '_')}_${dataset.year}.csv`);
    document.body.appendChild(link);
    
    // Download file
    link.click();
    document.body.removeChild(link);
  };

  // Mendapatkan properti untuk header tabel yang bisa diurutkan
  const getSortProps = (key) => {
    return {
      onClick: () => requestSort(key),
      sx: { 
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        ...(sortConfig.key === key && {
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        })
      }
    };
  };

  // Get color based on dataset indicator
  const getDatasetColor = () => {
    const dataset = datasets.find(d => d.id === selectedDataset);
    switch (dataset?.indicator) {
      case 'Demografi': return ['rgba(94, 44, 138, 0.8)', 'rgba(123, 85, 158, 0.8)'];
      case 'Ekonomi': return ['rgba(34, 94, 168, 0.8)', 'rgba(65, 182, 196, 0.8)'];
      case 'Ketenagakerjaan': return ['rgba(13, 71, 45, 0.8)', 'rgba(48, 156, 84, 0.8)'];
      case 'Sosial': return ['rgba(174, 1, 126, 0.8)', 'rgba(247, 104, 161, 0.8)'];
      case 'Kemiskinan': return ['rgba(204, 76, 2, 0.8)', 'rgba(254, 153, 41, 0.8)'];
      default: return ['rgba(58, 123, 213, 0.8)', 'rgba(84, 179, 247, 0.8)'];
    }
  };

  // Fungsi untuk membuat chart simulasi
  const renderPlaceholderChart = () => {
    const dataset = datasets.find(d => d.id === selectedDataset);
    const [primaryColor, secondaryColor] = getDatasetColor();
    
    // Bar chart config
    const barChartData = {
      labels: sortedData.slice(0, 10).map(item => item.province),
      datasets: [
        {
          label: dataset?.name || 'Nilai',
          data: sortedData.slice(0, 10).map(item => item.value),
          backgroundColor: primaryColor,
          borderColor: primaryColor.replace('0.8', '1'),
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
    
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme.palette.text.primary,
            padding: 16,
            font: {
              weight: 'bold'
            }
          },
        },
        title: {
          display: true,
          text: `${dataset?.name || 'Data'} (${dataset?.year || ''})`,
          color: theme.palette.text.primary,
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 16
        },
        tooltip: {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          bodyColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          borderColor: theme.palette.divider,
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          titleFont: {
            weight: 'bold'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: theme.palette.text.secondary,
            font: {
              size: 11
            }
          }
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: theme.palette.text.secondary,
            font: {
              size: 11
            }
          }
        },
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuad'
      }
    };
    
    // Pie chart config
    const pieChartData = {
      labels: sortedData.slice(0, 5).map(item => item.province),
      datasets: [
        {
          label: dataset?.name || 'Nilai',
          data: sortedData.slice(0, 5).map(item => item.value),
          backgroundColor: [
            primaryColor, 
            secondaryColor,
            primaryColor.replace('0.8', '0.6'),
            secondaryColor.replace('0.8', '0.6'),
            primaryColor.replace('0.8', '0.4')
          ],
          borderColor: theme.palette.background.paper,
          borderWidth: 2,
        },
      ],
    };
    
    const pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: theme.palette.text.primary,
            padding: 16,
            font: {
              size: 12
            },
            usePointStyle: true,
            pointStyle: 'circle'
          },
        },
        title: {
          display: true,
          text: `Top 5 Provinsi - ${dataset?.name || 'Data'} (${dataset?.year || ''})`,
          color: theme.palette.text.primary,
          font: {
            weight: 'bold'
          },
          padding: 16
        },
        tooltip: {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          bodyColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          borderColor: theme.palette.divider,
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const label = context.label;
              return `${label}: ${value.toLocaleString()} ${dataset?.unit || ''}`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800
      },
      cutout: '50%',
      radius: '90%'
    };
    
    // Line chart config for time trends
    const timeChartData = {
      labels: historyData.length > 0 ? historyData[0].values.map(v => v.year) : [],
      datasets: historyData.map((item, index) => ({
        label: item.province,
        data: item.values.map(v => v.value),
        borderColor: index === 0 ? primaryColor : 
                    index === 1 ? secondaryColor : 
                    index === 2 ? primaryColor.replace('0.8', '0.6') :
                    index === 3 ? secondaryColor.replace('0.8', '0.6') :
                    primaryColor.replace('0.8', '0.4'),
        backgroundColor: 'transparent',
        pointBackgroundColor: index === 0 ? primaryColor : 
                             index === 1 ? secondaryColor : 
                             index === 2 ? primaryColor.replace('0.8', '0.6') :
                             index === 3 ? secondaryColor.replace('0.8', '0.6') :
                             primaryColor.replace('0.8', '0.4'),
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      })),
    };
    
    const timeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: theme.palette.text.primary,
          },
        },
        title: {
          display: true,
          text: `Tren ${dataset?.name || 'Data'} (2015-${dataset?.year || '2021'})`,
          color: theme.palette.text.primary,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: theme.palette.text.secondary,
          }
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: theme.palette.text.secondary,
          }
        },
      },
    };
    
    return (
      <Box 
        sx={{ 
          height: 400, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 4,
          border: `1px dashed ${theme.palette.divider}`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `inset 0 0 20px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'}`
        }}
        ref={chartRef}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{ 
                rotate: 360 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "linear"
              }}
            >
              <CircularProgress size={40} color="primary" sx={{ mb: 2 }} />
            </motion.div>
            <Typography variant="body2" color="text.secondary">
              Mempersiapkan data...
            </Typography>
          </Box>
        ) : !selectedDataset ? (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DataArray sx={{ 
                fontSize: 80, 
                color: 'text.secondary', 
                mb: 2, 
                opacity: 0.6,
                filter: `drop-shadow(0 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'})`
              }} />
            </motion.div>
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 1,
              fontWeight: 'medium',
              textShadow: `0 1px 2px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`
            }}>
              Pilih dataset untuk melihat visualisasi
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: '80%' }}>
              Eksplorasi dan bandingkan data statistik antar wilayah menggunakan visualisasi interaktif
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              p: 2, 
              zIndex: 1,
              display: 'flex'
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tooltip title="Unduh Visualisasi">
                  <IconButton 
                    color="primary" 
                    size="small"
                    onClick={handleDownloadData}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <FileDownload />
                  </IconButton>
                </Tooltip>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tooltip title="Segarkan Data">
                  <IconButton 
                    color="primary" 
                    size="small" 
                    sx={{ 
                      ml: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleRefreshData}
                  >
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            
            <Box sx={{ position: 'relative', width: '100%', height: '100%', p: 2 }}>
              <AnimatePresence mode="wait">
                {tabValue === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="barchart"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <Bar data={barChartData} options={barChartOptions} />
                  </motion.div>
                )}
                {tabValue === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="piechart"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <Pie data={pieChartData} options={pieChartOptions} />
                  </motion.div>
                )}
                {tabValue === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="timeline"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <Line data={timeChartData} options={timeChartOptions} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </>
        )}
      </Box>
    );
  };

  // Rendering tabel data
  const renderDataTable = () => {
    const dataset = datasets.find(d => d.id === selectedDataset);
    
    return (
      <Paper elevation={0} sx={{ 
        width: '100%', 
        borderRadius: 2, 
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.08)'
        }
      }}>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'
        }}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center'
          }}>
            <DataArray fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
            {isLoading ? 'Memuat data...' : `${sortedData.length} ${sortedData.length > 0 ? 'provinsi' : 'provinsi'}`}
            </Typography>
          <Box>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Cari provinsi..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'rgba(0, 0, 0, 0.12)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main + '80'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
              sx={{ 
                width: { xs: '120px', sm: '200px' }
              }}
            />
          </Box>
        </Box>
        
        <TableContainer sx={{ 
          maxHeight: 400,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'
          }
        }}>
          <Table stickyHeader size="small" aria-label="data table">
            <TableHead>
              <TableRow>
                <TableCell {...getSortProps('province')} sx={{ 
                  fontWeight: 'bold',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(58, 123, 213, 0.06)',
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                }}>
                  Provinsi
                  <Box component="span" sx={{ ml: 0.5, fontSize: '0.8rem', color: 'text.secondary' }}>
                    {sortConfig.key === 'province' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </Box>
                </TableCell>
                <TableCell {...getSortProps('value')} align="right" sx={{ 
                  fontWeight: 'bold',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(58, 123, 213, 0.06)',
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                }}>
                  Nilai
                  <Box component="span" sx={{ ml: 0.5, fontSize: '0.8rem', color: 'text.secondary' }}>
                    {sortConfig.key === 'value' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontWeight: 'bold',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(58, 123, 213, 0.06)',
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                }}>
                  Tren
                </TableCell>
                <TableCell {...getSortProps('rank')} align="right" sx={{ 
                  fontWeight: 'bold',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(58, 123, 213, 0.06)',
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                }}>
                  Peringkat
                  <Box component="span" sx={{ ml: 0.5, fontSize: '0.8rem', color: 'text.secondary' }}>
                    {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <motion.div
                      animate={{ 
                        rotate: 360 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "linear"
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      <CircularProgress size={30} color="primary" />
                    </motion.div>
                  </TableCell>
                </TableRow>
              ) : sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm ? 'Tidak ditemukan provinsi yang sesuai' : 'Pilih dataset untuk menampilkan data'}
            </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row.province}
                      hover
                      sx={{ 
                        '&:nth-of-type(odd)': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.03)' 
                            : 'rgba(0, 0, 0, 0.02)'
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(58, 123, 213, 0.08)',
                          transition: 'background-color 0.2s'
                        },
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                        {row.province}
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {row.value.toLocaleString()} {dataset?.unit}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {row.trend === 'up' ? (
                          <Chip 
                            icon={<TrendingUp fontSize="small" />} 
                            label={`+${row.change}%`} 
                            color="success" 
                            size="small" 
                            variant="outlined"
                            sx={{
                              fontWeight: 'medium',
                              '& .MuiChip-icon': {
                                color: 'inherit'
                              },
                              borderRadius: '12px',
                              transition: 'all 0.2s',
                              '&:hover': {
                                boxShadow: '0 2px 8px rgba(0, 200, 83, 0.2)'
                              }
                            }}
                          />
                        ) : (
                          <Chip 
                            icon={<TrendingUp fontSize="small" sx={{ transform: 'rotate(180deg)' }} />} 
                            label={`-${row.change}%`} 
                            color="error" 
                            size="small" 
                            variant="outlined"
                            sx={{
                              fontWeight: 'medium',
                              '& .MuiChip-icon': {
                                color: 'inherit'
                              },
                              borderRadius: '12px',
                              transition: 'all 0.2s',
                              '&:hover': {
                                boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)'
                              }
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={`#${row.rank}`} 
                          size="small" 
                          color={row.rank <= 10 ? "primary" : "default"}
                          variant={row.rank <= 10 ? "filled" : "outlined"}
                          sx={{
                            fontWeight: 'bold',
                            borderRadius: '12px',
                            minWidth: '45px',
                            transition: 'all 0.2s',
                            ...(row.rank <= 10 && {
                              '&:hover': {
                                boxShadow: '0 2px 8px rgba(58, 123, 213, 0.25)'
                              }
                            })
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Baris per halaman:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            '.MuiTablePagination-selectIcon': {
              color: theme.palette.primary.main
            }
          }}
        />
      </Paper>
    );
  };

  // Rendering kartu data untuk tampilan grid
  const renderDataCards = () => {
    const dataset = datasets.find(d => d.id === selectedDataset);
    
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {isLoading ? 'Memuat data...' : `${sortedData.length} ${sortedData.length > 0 ? 'provinsi' : 'provinsi'}`}
          </Typography>
          <Box>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Cari provinsi..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '120px', sm: '200px' } }}
            />
          </Box>
        </Box>
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : sortedData.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Tidak ditemukan provinsi yang sesuai' : 'Pilih dataset untuk menampilkan data'}
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2} sx={{ p: 2 }}>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Grid item xs={12} sm={6} md={4} key={row.province}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card 
                        elevation={1} 
                        sx={{ 
                          height: '100%',
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: `1px solid ${theme.palette.divider}`,
                          '&:hover': {
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                            borderColor: theme.palette.primary.main,
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box 
                          sx={{ 
                            p: 2, 
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.02)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: `rgba(${row.rank <= 10 ? '58, 123, 213' : '150, 150, 150'}, 0.2)`,
                              color: row.rank <= 10 ? theme.palette.primary.main : 'text.secondary',
                              mr: 1.5,
                              width: 36,
                              height: 36
                            }}
                          >
                            {row.rank}
                          </Avatar>
                          <Typography variant="subtitle1" fontWeight={500} noWrap>
                            {row.province}
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nilai
                              </Typography>
                              <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {row.value.toLocaleString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {dataset?.unit}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Perubahan
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography 
                                  variant="body1" 
                                  fontWeight="medium" 
                                  color={row.trend === 'up' ? 'success.main' : 'error.main'}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  {row.trend === 'up' ? (
                                    <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                                  ) : (
                                    <TrendingUp fontSize="small" sx={{ mr: 0.5, transform: 'rotate(180deg)' }} />
                                  )}
                                  {row.trend === 'up' ? '+' : '-'}{row.change}%
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Dari tahun sebelumnya
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
            
            <TablePagination
              rowsPerPageOptions={[6, 12, 24]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Item per halaman:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
            />
          </>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              backgroundImage: theme.palette.mode === 'dark' 
                ? 'linear-gradient(to right, #2c3e50, #1c2331)' 
                : 'linear-gradient(to right, #3a7bd5, #00d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
          Eksplorasi Data
        </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Jelajahi dan analisis data statistik Indonesia dengan visualisasi interaktif
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Panel Kontrol */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%', 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                position: 'sticky',
                top: 85,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)',
                  borderColor: theme.palette.primary.main + '40'
                },
                overflow: 'hidden'
              }}
              className="panel-shadow"
            >
              <Typography variant="subtitle1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
                <FilterAlt fontSize="small" sx={{ 
                  mr: 0.5, 
                  color: theme.palette.primary.main, 
                  verticalAlign: 'text-bottom',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.7 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.7 }
                  }
                }} />
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
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main + '80'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    },
                    borderRadius: 1.5
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: 2,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                        maxHeight: 300,
                        '& .MuiMenuItem-root': {
                          my: 0.5,
                          px: 1.5,
                          mx: 0.5,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: theme.palette.primary.main + '10'
                          },
                          '&.Mui-selected': {
                            bgcolor: theme.palette.primary.main + '20'
                          }
                        }
                      }
                    }
                  }}
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
                            sx={{ 
                              mr: 1, 
                              fontSize: '0.7rem',
                              borderRadius: '12px',
                              fontWeight: 'bold'
                            }}
                          />
                          <Chip 
                            label={dataset.year} 
                            size="small" 
                            color="secondary" 
                            variant="outlined" 
                            sx={{ 
                              fontSize: '0.7rem',
                              borderRadius: '12px',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider sx={{ 
                my: 3,
                '&::before, &::after': {
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.06)'
                }
              }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '40%',
                    height: '2px',
                    bottom: -1,
                    left: 0,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '1px'
                  }
                }}>
                  Informasi Dataset
                </Typography>
                
                {selectedDataset ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ 
                      mt: 2,
                      p: 1.5, 
                      borderRadius: 2, 
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
                      boxShadow: 'inset 0 1px 8px rgba(0, 0, 0, 0.05)'
                    }}>
                      <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <strong style={{ 
                          marginRight: '8px',
                          display: 'inline-block',
                          width: '78px'
                        }}>Indikator:</strong>
                        <Chip 
                          label={datasets.find(d => d.id === selectedDataset)?.indicator} 
                  size="small"
                          color="primary"
                          sx={{ 
                            height: 24, 
                            fontSize: '0.75rem',
                            fontWeight: 'medium'
                          }}
                        />
                  </Typography>
                      <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <strong style={{ 
                          marginRight: '8px',
                          display: 'inline-block',
                          width: '78px'
                        }}>Tahun:</strong>
                    <Chip 
                          label={datasets.find(d => d.id === selectedDataset)?.year} 
                      size="small" 
                          color="secondary"
                          sx={{ 
                            height: 24, 
                            fontSize: '0.75rem',
                            fontWeight: 'medium'
                          }}
                        />
                </Typography>
                      <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ 
                          marginRight: '8px',
                          display: 'inline-block',
                          width: '78px'
                        }}>Satuan:</strong>
                        <span>{datasets.find(d => d.id === selectedDataset)?.unit}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: '0.8rem', fontStyle: 'italic' }}>
                        Sumber: Badan Pusat Statistik
                      </Typography>
                      
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                  <Button 
                    variant="outlined" 
                          color="primary"
                    size="small" 
                    startIcon={<FileDownload />}
                          sx={{ 
                            mt: 2, 
                            borderRadius: '50px', 
                            textTransform: 'none',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            },
                            fontWeight: 'medium'
                          }}
                        >
                          Unduh Dataset
                  </Button>
                      </motion.div>
                </Box>
                  </motion.div>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: `1px dashed ${theme.palette.divider}`,
                    mt: 2
                  }}>
                    Pilih dataset untuk melihat informasi
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Area Konten */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              {renderPlaceholderChart()}
                </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ 
                    display: 'flex', 
                justifyContent: 'space-between', 
                    alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                position: 'relative',
                zIndex: 1,
                mb: 2,
                backgroundColor: 'transparent'
              }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  sx={{ 
                    '& .MuiTab-root': { 
                      minWidth: 'auto',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      px: 2.5,
                      py: 1,
                      borderRadius: '50px',
                      mx: 0.3,
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.03)'
                      }
                    },
                    '& .Mui-selected': {
                      fontWeight: 'bold',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                    },
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '2px'
                    }
                  }}
                >
                  <Tab 
                    icon={<BarChartIcon sx={{ fontSize: '1.2rem' }}/>} 
                    iconPosition="start" 
                    label="Grafik Batang" 
                  />
                  <Tab 
                    icon={<PieChartIcon sx={{ fontSize: '1.2rem' }}/>} 
                    iconPosition="start" 
                    label="Grafik Lingkaran" 
                  />
                  <Tab 
                    icon={<Timeline sx={{ fontSize: '1.2rem' }}/>} 
                    iconPosition="start" 
                    label="Tren Waktu" 
                  />
                </Tabs>
                
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={handleViewModeChange}
                  aria-label="view mode"
                  size="small"
                  sx={{
                    '& .MuiToggleButton-root': {
                      border: `1px solid ${theme.palette.divider}`,
                      '&:first-of-type': {
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px',
                      },
                      '&:last-of-type': {
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                      },
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
                      },
                      '&.Mui-selected': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(58, 123, 213, 0.2)' : 'rgba(58, 123, 213, 0.1)',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(58, 123, 213, 0.25)' : 'rgba(58, 123, 213, 0.15)'
                        }
                      }
                    },
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <ToggleButton value="table" aria-label="table view">
                    <Tooltip 
                      title="Tampilan Tabel" 
                      placement="top"
                      arrow
                      enterDelay={500}
                      sx={{
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      <ViewList />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="grid" aria-label="grid view">
                    <Tooltip 
                      title="Tampilan Grid" 
                      placement="top"
                      arrow
                      enterDelay={500}
                      sx={{
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      <ViewModule />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
                </Box>
            </Box>

            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'table' ? renderDataTable() : renderDataCards()}
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default DataExplorer; 