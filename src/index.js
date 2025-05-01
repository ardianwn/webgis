import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import DataExplorer from './pages/DataExplorer';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import './styles/index.scss';

// Konfigurasi future flags untuk React Router v7
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'map', element: <MapPage /> },
      { path: 'explorer', element: <DataExplorer /> },
      { path: 'about', element: <About /> },
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); 