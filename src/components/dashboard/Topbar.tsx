import { useLocation, Link } from 'react-router-dom';
import { LuBell, LuSearch, LuChevronRight, LuCircleHelp, LuSun, LuMoon, LuDna } from 'react-icons/lu';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const routeNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/busqueda': 'Búsqueda y Match',
  '/expedientes': 'Expedientes',
  '/reportes': 'Reportes',
  '/usuarios': 'Usuarios y Permisos',
  '/devyser': 'Integración Devyser',
  '/configuracion': 'Configuración',
};

export const DashboardTopbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme, t } = useTheme();
  const { user } = useAuth();
  const currentName = routeNames[location.pathname] || 'Dashboard';

  const userName = user ? `${user.firstName} ${user.lastName}` : 'Usuario';
  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  return (
    <header
      className="flex items-center justify-between sticky top-0 z-10"
      style={{
        height: '56px',
        padding: '0 28px',
        background: t.bgTopbar,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      {/* Left: Logo + Breadcrumbs */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Institutional Logo */}
        <div className="flex items-center" style={{ gap: '8px', paddingRight: '16px', borderRight: `1px solid ${t.border}` }}>
          <LuDna size={16} color={t.accent} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ABALAT
          </span>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center" style={{ gap: '10px', fontSize: '13px' }}>
          <Link
            to="/dashboard"
            className="cursor-pointer"
            style={{ color: t.textMuted, textDecoration: 'none' }}
          >
            Inicio
          </Link>
          <LuChevronRight size={14} color={t.textFaint} />
          <span className="font-medium" style={{ color: t.text }}>{currentName}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Search */}
        <div className="relative">
          <LuSearch
            size={15}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: t.textFaint,
            }}
          />
          <input
            type="text"
            placeholder="Buscar muestras, donantes..."
            style={{
              paddingLeft: '36px',
              paddingRight: '16px',
              height: '34px',
              width: '240px',
              borderRadius: '20px',
              fontSize: '12px',
              background: t.bgInput,
              border: `1px solid ${t.borderInput}`,
              color: t.text,
              outline: 'none',
            }}
          />
        </div>

        {/* Divider + Icons + Profile */}
        <div
          className="flex items-center"
          style={{
            gap: '6px',
            paddingLeft: '16px',
            borderLeft: `1px solid ${t.borderInput}`,
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              color: t.textMuted,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
            }}
          >
            {isDark ? <LuSun size={17} /> : <LuMoon size={17} />}
          </button>

          {/* Bell */}
          <button
            className="flex items-center justify-center relative"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              color: t.textMuted,
            }}
          >
            <LuBell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '8px',
                width: '7px',
                height: '7px',
                background: t.bellDot,
                borderRadius: '50%',
                border: `2px solid ${t.bellDotBorder}`,
              }}
            />
          </button>

          {/* Help */}
          <button
            className="flex items-center justify-center"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              color: t.textMuted,
            }}
          >
            <LuCircleHelp size={17} />
          </button>

          {/* Profile */}
          <div
            className="flex items-center cursor-pointer"
            style={{
              gap: '10px',
              marginLeft: '8px',
              paddingLeft: '14px',
              borderLeft: `1px solid ${t.border}`,
            }}
          >
            <div className="text-right">
              <p className="font-semibold leading-none" style={{ fontSize: '12px', color: t.text }}>
                {userName}
              </p>
              <p
                style={{
                  fontSize: '10px',
                  color: t.textSubtle,
                  marginTop: '3px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                }}
              >
                Administrador
              </p>
            </div>
            <div
              className="flex items-center justify-center font-bold shrink-0"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: t.avatarBg,
                color: t.avatarText,
                fontSize: '12px',
                border: `2px solid ${t.avatarBorder}`,
              }}
            >
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
