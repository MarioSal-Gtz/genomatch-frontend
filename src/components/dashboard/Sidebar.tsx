import { NavLink, useNavigate } from 'react-router-dom';
import {
  LuLayoutDashboard,
  LuSearch,
  LuFolderOpen,
  LuFileChartColumn,
  LuUsers,
  LuMicroscope,
  LuSettings,
  LuLogOut,
  LuDna,
} from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: LuSearch, label: 'Búsqueda y Match', path: '/busqueda' },
  { icon: LuFolderOpen, label: 'Expedientes', path: '/expedientes' },
  { icon: LuFileChartColumn, label: 'Reportes', path: '/reportes' },
  { icon: LuUsers, label: 'Usuarios y Permisos', path: '/usuarios' },
  { icon: LuMicroscope, label: 'Integración Devyser', path: '/devyser' },
  { icon: LuSettings, label: 'Configuración', path: '/configuracion' },
];

export const DashboardSidebar = () => {
  const { logout } = useAuth();
  const { t } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 shrink-0"
      style={{
        width: '240px',
        background: t.bgSidebar,
        borderRight: `1px solid ${t.border}`,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: '34px',
            height: '34px',
            background: t.accent,
            borderRadius: '8px',
          }}
        >
          <LuDna size={18} color="white" />
        </div>
        <div>
          <h1 className="font-bold leading-none" style={{ fontSize: '13px', letterSpacing: '-0.01em', color: t.text }}>
            RBC-GENOmatch
          </h1>
          <span
            style={{
              fontSize: '9px',
              color: t.textSubtle,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Molecular Blood Bank
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto" style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="w-full flex items-center transition-colors"
              style={({ isActive }) => ({
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                background: isActive ? t.navActive : 'transparent',
                color: isActive ? t.accentLight : t.navText,
                fontWeight: isActive ? 500 : 400,
                position: 'relative',
                textDecoration: 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={16}
                    style={{
                      color: isActive ? t.accentLight : t.navIcon,
                      flexShrink: 0,
                    }}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div
                      style={{
                        marginLeft: 'auto',
                        width: '3px',
                        height: '16px',
                        borderRadius: '2px',
                        background: t.accentLight,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div style={{ padding: '12px', borderTop: `1px solid ${t.border}` }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center transition-colors"
          style={{
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            color: t.dangerText,
          }}
        >
          <LuLogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
