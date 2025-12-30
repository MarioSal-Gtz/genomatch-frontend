import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme, getThemeStyles } from '../context/ThemeContext';
import Navbar from './Navbar';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const theme = getThemeStyles(isDark);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        transition: "background 0.3s ease"
      }}
    >
      <Navbar />

      <main
        style={{
          paddingTop: "84px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
