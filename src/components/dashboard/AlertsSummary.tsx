import { LuTriangleAlert, LuCircleAlert, LuInfo, LuClock } from 'react-icons/lu';
import { useTheme } from '../../context/ThemeContext';

const alerts = [
  {
    severity: 'critical' as const,
    title: 'QC fallido en lote #S-2024-889',
    description: '3 muestras no pasaron el control de calidad',
    time: 'Hace 15 min',
  },
  {
    severity: 'warning' as const,
    title: 'Fenotipo raro detectado',
    description: 'Paciente ID: 4421 — Bombay (Oh) confirmado',
    time: 'Hace 42 min',
  },
  {
    severity: 'warning' as const,
    title: 'Muestras próximas a vencer',
    description: '12 muestras vencen en los próximos 7 días',
    time: 'Hace 1 hora',
  },
  {
    severity: 'info' as const,
    title: 'Sincronización Devyser completada',
    description: 'Run #DEV-0224 procesado exitosamente',
    time: 'Hace 2 horas',
  },
];

export const AlertsSummary = () => {
  const { t } = useTheme();

  const severityConfig = {
    critical: { icon: LuTriangleAlert, color: t.danger, bg: t.dangerBg, border: t.dangerBorder, label: 'Crítica' },
    warning: { icon: LuCircleAlert, color: t.warn, bg: t.warnBg, border: 'rgba(245,158,11,0.2)', label: 'Advertencia' },
    info: { icon: LuInfo, color: t.accentText, bg: t.accentBg, border: t.accentBorder, label: 'Info' },
  };

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
        <h3 className="font-bold" style={{ fontSize: '14px', color: t.text }}>Alertas del Sistema</h3>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: t.dangerBg,
            color: t.danger,
          }}
        >
          {alerts.filter(a => a.severity === 'critical').length} críticas
        </span>
      </div>
      <div className="flex-1" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((alert, index) => {
            const config = severityConfig[alert.severity];
            const AlertIcon = config.icon;
            return (
              <div
                key={index}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                  }}
                >
                  <AlertIcon size={16} color={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '12px', fontWeight: 700, color: t.text, marginBottom: '2px' }}>{alert.title}</p>
                  <p style={{ fontSize: '11px', color: t.textMuted, marginBottom: '6px' }}>{alert.description}</p>
                  <div className="flex items-center" style={{ gap: '5px', fontSize: '10px', color: t.textFaint }}>
                    <LuClock size={10} />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
