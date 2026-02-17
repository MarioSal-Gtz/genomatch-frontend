import { DashboardKPIs } from '../components/dashboard/DashboardKPIs';
import { QuickActions, RecentActivity } from '../components/dashboard/DashboardWidgets';
import { AlertsSummary } from '../components/dashboard/AlertsSummary';
import { SystemStatus } from '../components/dashboard/SystemStatus';
import { LuInfo } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';

export default function PanelControl() {
  const { t } = useTheme();

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4" style={{ marginBottom: '32px' }}>
        <div>
          <h2 className="font-bold" style={{ fontSize: '26px', letterSpacing: '-0.02em', color: t.text }}>
            Dashboard
          </h2>
          <p className="flex items-center gap-3" style={{ color: t.textMuted, fontSize: '14px', marginTop: '6px' }}>
            Resumen general del banco de sangre molecular
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                padding: '3px 10px',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: t.accentBg,
                color: t.accentText,
                border: `1px solid ${t.accentBorder}`,
              }}
            >
              <LuInfo size={12} /> Sistema Nacional Sincronizado
            </span>
          </p>
        </div>
        <div className="flex items-center" style={{ gap: '12px' }}>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              background: t.bgHover,
              border: `1px solid ${t.borderInput}`,
              color: t.textMuted,
              cursor: 'pointer',
            }}
          >
            Exportar Dashboard
          </button>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              background: t.accent,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: t.accentShadow,
            }}
          >
            Nuevo Análisis
          </button>
        </div>
      </div>

      {/* KPIs */}
      <section style={{ marginBottom: '32px' }}>
        <DashboardKPIs />
      </section>

      {/* Alerts + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <AlertsSummary />
        <RecentActivity />
      </div>

      {/* QuickActions + SystemStatus */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <QuickActions />
        <SystemStatus />
      </div>

      {/* Footer */}
      <footer
        className="flex flex-col md:flex-row justify-between items-center"
        style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${t.border}`, gap: '16px' }}
      >
        <div className="flex items-center" style={{ gap: '28px', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.textFaint }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: t.successDot }} />
            <span>Estado del Servidor: Óptimo</span>
          </div>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: t.syncDot }} />
            <span>Sincronización: Activa (Hace 2m)</span>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500, fontStyle: 'italic' }}>
          ID de Sesión: RBC-MATCH-8821-X992
        </p>
      </footer>
    </>
  );
}
