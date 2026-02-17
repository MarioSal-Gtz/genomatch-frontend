import {
  LuCirclePlus,
  LuSearch,
  LuFileUp,
  LuFileChartColumn,
  LuLayers,
  LuMicroscope,
  LuClock,
  LuCircleCheckBig,
  LuCircleAlert,
  LuRefreshCw
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { IconType } from 'react-icons';

export const QuickActions = () => {
  const { t } = useTheme();
  const navigate = useNavigate();

  const actions: { label: string; icon: IconType; colorKey: string; bgKey: string; path: string }[] = [
    { label: "Nueva Muestra", icon: LuCirclePlus, colorKey: "accentText", bgKey: "accentBg", path: "/expedientes" },
    { label: "Buscar Compatibilidad", icon: LuSearch, colorKey: "success", bgKey: "successBg", path: "/busqueda" },
    { label: "Importar Devyser", icon: LuFileUp, colorKey: "indigo", bgKey: "indigoBg", path: "/devyser" },
    { label: "Generar Reporte", icon: LuFileChartColumn, colorKey: "purple", bgKey: "purpleBg", path: "/reportes" },
    { label: "Análisis de Lote", icon: LuLayers, colorKey: "warn", bgKey: "warnBg", path: "/expedientes" },
    { label: "Integración Devyser", icon: LuMicroscope, colorKey: "sky", bgKey: "skyBg", path: "/devyser" },
  ];

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '24px' }}>
      <h3 className="font-bold" style={{ fontSize: '14px', marginBottom: '20px', color: t.text }}>Acciones Rápidas</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {actions.map((action, index) => {
          const iconColor = (t as any)[action.colorKey] || t.accentText;
          const iconBg = (t as any)[action.bgKey] || t.accentBg;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center text-center"
              style={{
                padding: '18px 12px',
                borderRadius: '12px',
                border: `1px solid ${t.border}`,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: iconBg,
                  marginBottom: '10px',
                }}
              >
                <action.icon size={18} color={iconColor} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, lineHeight: 1.3 }}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const activityLog: { user: string; action: string; target: string; time: string; icon: IconType; colorKey: string; borderColorKey: string }[] = [
  { user: "Dra. Méndez", action: "completó secuenciación de lote", target: "#S-2024-882", time: "Hace 12 min", icon: LuCircleCheckBig, colorKey: "success", borderColorKey: "successBorder" },
  { user: "Sistema", action: "detectó incompatibilidad crítica", target: "Paciente ID: 9921", time: "Hace 24 min", icon: LuCircleAlert, colorKey: "danger", borderColorKey: "dangerBorder" },
  { user: "Lic. Carlos", action: "importó 50 muestras de", target: "Hospital Regional Norte", time: "Hace 45 min", icon: LuFileUp, colorKey: "accentText", borderColorKey: "accentBorder" },
  { user: "Dr. Torres", action: "actualizó perfil de donante", target: "Juan Pérez (Duffy-)", time: "Hace 1 hora", icon: LuRefreshCw, colorKey: "indigo", borderColorKey: "indigoBg" },
  { user: "Sistema", action: "generó reporte nacional", target: "Enero 2026", time: "Hace 2 horas", icon: LuFileChartColumn, colorKey: "slate", borderColorKey: "slateBg" },
];

export const RecentActivity = () => {
  const { t } = useTheme();

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: '14px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        className="flex justify-between items-center"
        style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${t.border}`,
          background: t.bgCardHeader,
        }}
      >
        <h3 className="font-bold" style={{ fontSize: '14px', color: t.text }}>Actividad Reciente</h3>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: t.accentBg,
            color: t.accentText,
          }}
        >
          Log en vivo
        </span>
      </div>
      <div className="flex-1" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activityLog.map((log, index) => {
            const color = (t as any)[log.colorKey] || t.accentText;
            const borderColor = (t as any)[log.borderColorKey] || t.accentBorder;
            const LogIcon = log.icon;
            return (
              <div key={index} className="flex relative" style={{ gap: '14px' }}>
                {index !== activityLog.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '9px',
                      top: '24px',
                      bottom: '-24px',
                      width: '2px',
                      background: t.border,
                    }}
                  />
                )}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: t.bg,
                    border: `2px solid ${borderColor}`,
                    zIndex: 1,
                  }}
                >
                  <LogIcon size={10} color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: t.textMuted }}>
                    <span className="font-bold" style={{ color: t.text }}>{log.user}</span> {log.action}{' '}
                    <span className="font-semibold" style={{ color: t.accentText }}>{log.target}</span>
                  </p>
                  <div className="flex items-center" style={{ gap: '5px', marginTop: '4px', fontSize: '10px', color: t.textFaint }}>
                    <LuClock size={11} />
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          padding: '16px 24px',
          borderTop: `1px solid ${t.border}`,
          background: t.bgCardHeader,
          marginTop: 'auto',
        }}
      >
        <button
          className="w-full"
          style={{ padding: '8px', fontSize: '12px', fontWeight: 600, color: t.textMuted, borderRadius: '8px' }}
        >
          Ver log de auditoría completo
        </button>
      </div>
    </div>
  );
};
