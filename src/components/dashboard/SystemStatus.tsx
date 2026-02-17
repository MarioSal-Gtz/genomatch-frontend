import { LuServer, LuDatabase, LuRefreshCw, LuHardDrive, LuClock } from 'react-icons/lu';
import { useTheme } from '../../context/ThemeContext';
import type { IconType } from 'react-icons';

const statusItems: { label: string; value: string; status: 'ok' | 'warning'; icon: IconType }[] = [
  { label: 'Servidor', value: 'Operativo', status: 'ok', icon: LuServer },
  { label: 'Base de datos', value: 'PostgreSQL 15 — Conectado', status: 'ok', icon: LuDatabase },
  { label: 'Sincronización', value: 'Activa — Hace 2 min', status: 'ok', icon: LuRefreshCw },
  { label: 'Último respaldo', value: 'Hoy 03:00 AM', status: 'ok', icon: LuHardDrive },
  { label: 'Uptime', value: '99.97% (30 días)', status: 'ok', icon: LuClock },
];

export const SystemStatus = () => {
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
        <h3 className="font-bold" style={{ fontSize: '14px', color: t.text }}>Estado del Sistema</h3>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: t.successBg,
            color: t.success,
          }}
        >
          Operativo
        </span>
      </div>
      <div className="flex-1" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {statusItems.map((item, index) => {
            const StatusIcon = item.icon;
            const dotColor = item.status === 'ok' ? t.successDot : t.warn;
            return (
              <div
                key={index}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: t.bgInput,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <StatusIcon size={16} style={{ color: t.textMuted, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <span style={{ fontSize: '12px', fontWeight: 600, color: t.text }}>{item.label}</span>
                </div>
                <div className="flex items-center" style={{ gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor }} />
                  <span style={{ fontSize: '11px', color: t.textMuted, fontWeight: 500 }}>{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
