import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/App.scss';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Fungsi untuk toggle tema
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Load tema dari localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Membuat tema dari Material UI dengan warna yang lebih elegan
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3a7bd5',
        light: '#6fa6ff',
        dark: '#0054a3',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f07b3f',
        light: '#ffac6c',
        dark: '#b74d13',
        contrastText: '#ffffff',
      },
      success: {
        main: '#2ecc71',
        dark: '#27ae60',
      },
      info: {
        main: '#3498db',
        dark: '#2980b9',
      },
      warning: {
        main: '#f39c12',
        dark: '#e67e22',
      },
      error: {
        main: '#e74c3c',
        dark: '#c0392b',
      },
      background: {
        default: darkMode ? '#1c2331' : '#f9fafb',
        paper: darkMode ? '#2c3e50' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#2c3e50',
        secondary: darkMode ? '#b0b0b0' : '#7f8c8d',
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '0em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontWeight: 500,
        letterSpacing: '0em',
      },
      h6: {
        fontWeight: 500,
        letterSpacing: '0.0075em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 6px rgba(0, 0, 0, 0.07)',
      '0px 6px 8px rgba(0, 0, 0, 0.08)',
      '0px 8px 12px rgba(0, 0, 0, 0.09)',
      '0px 10px 14px rgba(0, 0, 0, 0.1)',
      // ... rest of shadows remain unchanged
      ...Array(19).fill(''),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          containedPrimary: {
            backgroundImage: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
          },
          containedSecondary: {
            backgroundImage: 'linear-gradient(135deg, #f07b3f 0%, #f7b733 100%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content fade-in">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 