import {
  LuTarget,
  LuActivity,
  LuTriangleAlert,
  LuFlaskConical,
  LuChartBar,
  LuMicroscope,
  LuArrowUpRight,
  LuArrowDownRight,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { IconType } from 'react-icons';

interface SubMetric {
  label: string;
  value: string;
}

interface KPICardProps {
  label: string;
  value: string;
  trend: { value: number; isUp: boolean };
  icon: IconType;
  iconBgKey: string;
  iconColorKey: string;
  navigateTo: string;
  subMetrics: SubMetric[];
}

const KPICard = ({ label, value, trend, icon: Icon, iconBgKey, iconColorKey, navigateTo, subMetrics }: KPICardProps) => {
  const { t } = useTheme();
  const navigate = useNavigate();
  const iconBg = (t as any)[iconBgKey] || t.accentBg;
  const iconColor = (t as any)[iconColorKey] || t.accentText;

  return (
    <div
      onClick={() => navigate(navigateTo)}
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: '14px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '170px',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = iconColor; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}
    >
      <div className="flex justify-between items-start">
        <div
          className="flex items-center justify-center"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: iconBg,
          }}
        >
          <Icon size={20} color={iconColor} />
        </div>
        <div
          className="flex items-center"
          style={{
            gap: '3px',
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '20px',
            background: trend.isUp ? t.successBg : t.dangerBg,
            color: trend.isUp ? t.success : t.danger,
          }}
        >
          {trend.isUp ? <LuArrowUpRight size={14} /> : <LuArrowDownRight size={14} />}
          {trend.value}%
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <h3
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: t.textMuted,
            marginBottom: '6px',
          }}
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: t.text,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '14px', borderTop: `1px solid ${t.border}`, paddingTop: '12px' }}>
        {subMetrics.map((sm, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ fontSize: '9px', color: t.textFaint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
              {sm.label}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: t.textSecondary, fontVariantNumeric: 'tabular-nums' }}>
              {sm.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DashboardKPIs = () => {
  const kpis: KPICardProps[] = [
    {
      label: 'Compatibilidad',
      value: '94.2%',
      trend: { value: 2.1, isUp: true },
      icon: LuTarget,
      iconBgKey: 'accentBg',
      iconColorKey: 'accentText',
      navigateTo: '/busqueda',
      subMetrics: [
        { label: 'Matches', value: '847' },
        { label: 'Incomp.', value: '12' },
      ],
    },
    {
      label: 'Actividad Reciente',
      value: '1,284',
      trend: { value: 18, isUp: true },
      icon: LuActivity,
      iconBgKey: 'indigoBg',
      iconColorKey: 'indigo',
      navigateTo: '/dashboard',
      subMetrics: [
        { label: 'Seq. 24h', value: '56' },
        { label: 'Búsquedas', value: '312' },
      ],
    },
    {
      label: 'Alertas',
      value: '7',
      trend: { value: 3, isUp: false },
      icon: LuTriangleAlert,
      iconBgKey: 'warnBg',
      iconColorKey: 'warn',
      navigateTo: '/dashboard',
      subMetrics: [
        { label: 'QC fallido', value: '2' },
        { label: 'Por vencer', value: '5' },
      ],
    },
    {
      label: 'Inventario',
      value: '12,842',
      trend: { value: 12, isUp: true },
      icon: LuFlaskConical,
      iconBgKey: 'successBg',
      iconColorKey: 'success',
      navigateTo: '/expedientes',
      subMetrics: [
        { label: 'ISBT', value: '43' },
        { label: 'QC Pass', value: '98.4%' },
      ],
    },
    {
      label: 'Rendimiento',
      value: '23.4',
      trend: { value: 5, isUp: true },
      icon: LuChartBar,
      iconBgKey: 'purpleBg',
      iconColorKey: 'purple',
      navigateTo: '/reportes',
      subMetrics: [
        { label: 'Seq/Téc.', value: '8.2' },
        { label: 'T. Prom.', value: '4.1h' },
      ],
    },
    {
      label: 'Devyser',
      value: '156',
      trend: { value: 8, isUp: true },
      icon: LuMicroscope,
      iconBgKey: 'skyBg',
      iconColorKey: 'sky',
      navigateTo: '/devyser',
      subMetrics: [
        { label: 'Pendientes', value: '14' },
        { label: 'Calidad', value: '99.1%' },
      ],
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};
