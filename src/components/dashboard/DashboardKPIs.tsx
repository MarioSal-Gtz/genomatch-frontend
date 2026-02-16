import type React from 'react';
import {
  Dna,
  FlaskConical,
  ShieldCheck,
  Target,
  Activity,
  Search,
  Users,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: React.ElementType;
  iconColor: string;
}

export const KPICard = ({ label, value, trend, icon: Icon, iconColor }: KPICardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-sm transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-lg", iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</h3>
        <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export const DashboardKPIs = () => {
  const kpis = [
    { label: "Muestras Totales", value: "12,842", trend: { value: 12, isUp: true }, icon: FlaskConical, iconColor: "bg-blue-50 text-blue-600" },
    { label: "Genotipos Completos", value: "8,921", trend: { value: 8, isUp: true }, icon: Dna, iconColor: "bg-indigo-50 text-indigo-600" },
    { label: "Sistemas ISBT", value: "43", trend: { value: 2, isUp: true }, icon: ShieldCheck, iconColor: "bg-emerald-50 text-emerald-600" },
    { label: "Precisión Matching", value: "99.98%", trend: { value: 0.1, isUp: true }, icon: Target, iconColor: "bg-blue-50 text-blue-600" },
    { label: "Secuenciaciones Activas", value: "156", trend: { value: 4, isUp: false }, icon: Activity, iconColor: "bg-amber-50 text-amber-600" },
    { label: "Búsquedas (7d)", value: "2,410", trend: { value: 18, isUp: true }, icon: Search, iconColor: "bg-slate-50 text-slate-600" },
    { label: "Personal Activo", value: "84", icon: UserCheck, iconColor: "bg-purple-50 text-purple-600" },
    { label: "Donantes Registrados", value: "15,200", trend: { value: 5, isUp: true }, icon: Users, iconColor: "bg-sky-50 text-sky-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};
