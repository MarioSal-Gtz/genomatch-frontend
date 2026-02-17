import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Expedientes from './pages/Expedientes';
import Usuarios from './pages/Usuarios';
import PanelControl from './pages/PanelControl';
import BusquedaMatch from './pages/BusquedaMatch';
import Reportes from './pages/Reportes';
import DevyserIntegracion from './pages/DevyserIntegracion';
import Configuracion from './pages/Configuracion';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<PanelControl />} />
            <Route path="busqueda" element={<BusquedaMatch />} />
            <Route path="expedientes" element={<Expedientes />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="devyser" element={<DevyserIntegracion />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
