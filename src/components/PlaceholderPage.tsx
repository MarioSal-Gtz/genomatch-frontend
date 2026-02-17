import type { IconType } from 'react-icons';
import { LuConstruction } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';

interface PlaceholderPageProps {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
}

export default function PlaceholderPage({ icon: Icon, title, description, features }: PlaceholderPageProps) {
  const { t } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', padding: '40px' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: t.accentBg,
          border: `1px solid ${t.accentBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <Icon size={36} color={t.accentText} />
      </div>

      <h2 style={{ fontSize: '26px', fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '8px' }}>
        {title}
      </h2>

      <p style={{ fontSize: '14px', color: t.textMuted, maxWidth: '480px', marginBottom: '24px', lineHeight: 1.6 }}>
        {description}
      </p>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '20px',
          background: t.warnBg,
          border: `1px solid rgba(245,158,11,0.2)`,
          marginBottom: '32px',
        }}
      >
        <LuConstruction size={14} color={t.warn} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: t.warn, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          En desarrollo
        </span>
      </div>

      <div
        style={{
          background: t.bgCard,
          border: `1px solid ${t.border}`,
          borderRadius: '14px',
          padding: '24px 32px',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <h4 style={{ fontSize: '11px', fontWeight: 700, color: t.textSubtle, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Funcionalidades planificadas
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: t.accentText, flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: t.textSecondary }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
