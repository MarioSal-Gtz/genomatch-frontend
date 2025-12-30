import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('genomatch-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('genomatch-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Theme Toggle Component
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        border: 'none',
        background: isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        boxShadow: isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

// Theme styles helper - Matte & Liquid Glass
export const getThemeStyles = (isDark: boolean) => ({
  // Backgrounds
  bg: isDark ? '#0f0f1a' : '#F5F6FA',
  bgCard: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.4)',
  bgCardSolid: isDark ? '#1a1a2e' : '#FFFFFF',
  bgInput: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.5)',

  // Text
  text: isDark ? '#FFFFFF' : '#20222A',
  textMuted: isDark ? 'rgba(255, 255, 255, 0.5)' : '#6B7280',
  textLight: isDark ? 'rgba(255, 255, 255, 0.3)' : '#9CA3AF',

  // Borders
  border: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
  borderLight: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.6)',

  // Accent colors - Matte (no bright gradients)
  accent: isDark ? 'rgba(140, 180, 255, 0.8)' : 'rgba(70, 130, 180, 0.8)',
  accentMuted: isDark ? 'rgba(140, 180, 255, 0.5)' : 'rgba(70, 130, 180, 0.5)',

  // Status - Matte
  success: isDark ? 'rgba(150, 220, 180, 0.9)' : 'rgba(60, 140, 100, 0.9)',
  successBg: isDark ? 'rgba(100, 180, 150, 0.1)' : 'rgba(100, 180, 150, 0.08)',
  error: isDark ? 'rgba(240, 150, 150, 0.9)' : 'rgba(180, 80, 80, 0.9)',
  errorBg: isDark ? 'rgba(200, 120, 120, 0.1)' : 'rgba(200, 120, 120, 0.08)',
});
