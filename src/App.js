import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AdminProvider } from './contexts/AdminContext';
import './App.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Pages
import Home from './pages/Home';
import BrandDetail from './pages/BrandDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green shade for health theme
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#03A9F4', // Blue for digital theme
      light: '#4FC3F7',
      dark: '#0288D1',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <AdminProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app-container">
            <Header />
            <div className="content-wrapper">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/brand/:id" element={<BrandDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Sidebar />
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
