import { NavLink, useNavigate } from 'react-router-dom';
import { Users, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme, getThemeStyles } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const theme = getThemeStyles(isDark);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        zIndex: 100
      }}
    >
      {/* Left - Logo + Tab */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Logo Text */}
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: theme.text
          }}
        >
          geno<span style={{
            fontWeight: 600,
            color: isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)"
          }}>match</span>
        </h1>

        {/* Single Tab - Dashboard */}
        <NavLink
          to="/dashboard"
          style={{
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 600,
            color: theme.text,
            textDecoration: "none",
            borderRadius: "12px",
            background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)"}`
          }}
        >
          Dashboard
        </NavLink>
      </div>

      {/* Right - Search, User, Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: theme.textMuted
            }}
          />
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              width: "180px",
              padding: "10px 14px 10px 38px",
              borderRadius: "12px",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
              background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              fontSize: "13px",
              fontWeight: 500,
              color: theme.text,
              outline: "none"
            }}
          />
        </div>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 14px 6px 6px",
            borderRadius: "12px",
            background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)"}`
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: isDark ? "rgba(140, 180, 255, 0.2)" : "rgba(70, 130, 180, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)",
              fontWeight: 600,
              fontSize: "13px"
            }}
          >
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: theme.text }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p style={{ fontSize: "10px", color: theme.textMuted }}>Bienvenido</p>
          </div>
        </div>

        {/* Users Icon */}
        <NavLink
          to="/usuarios"
          style={({ isActive }) => ({
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isActive
              ? (isDark ? "rgba(140, 180, 255, 0.15)" : "rgba(70, 130, 180, 0.12)")
              : (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.5)"),
            backdropFilter: "blur(12px)",
            border: `1px solid ${isActive
              ? (isDark ? "rgba(140, 180, 255, 0.3)" : "rgba(70, 130, 180, 0.25)")
              : (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)")}`,
            color: isActive
              ? (isDark ? "rgba(140, 180, 255, 0.9)" : "rgba(70, 130, 180, 0.9)")
              : theme.textMuted,
            cursor: "pointer",
            textDecoration: "none"
          })}
        >
          <Users size={16} />
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.08)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.15)"}`,
            color: isDark ? "rgba(248, 113, 113, 0.9)" : "rgba(220, 38, 38, 0.8)",
            cursor: "pointer"
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
}
