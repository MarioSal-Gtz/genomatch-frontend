import {
  PlusCircle,
  Search,
  FileUp,
  FileBarChart,
  Layers,
  UserCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const QuickActions = () => {
  const actions = [
    { label: "Nueva Muestra", icon: PlusCircle, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Buscar Compatibilidad", icon: Search, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Importar Datos", icon: FileUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Generar Reporte", icon: FileBarChart, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Análisis de Lote", icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Perfil Farmacogenómico", icon: UserCircle, color: "text-sky-600", bg: "bg-sky-50" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-full">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all group text-center"
          >
            <div className={cn("p-2 rounded-lg mb-2 transition-transform group-hover:scale-110", action.bg, action.color)}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const activityLog = [
  { user: "Dra. Méndez", action: "completó secuenciación de lote", target: "#S-2024-882", time: "Hace 12 min", icon: CheckCircle2, color: "text-emerald-500" },
  { user: "Sistema", action: "detectó incompatibilidad crítica", target: "Paciente ID: 9921", time: "Hace 24 min", icon: AlertCircle, color: "text-red-500" },
  { user: "Lic. Carlos", action: "importó 50 muestras de", target: "Hospital Regional Norte", time: "Hace 45 min", icon: FileUp, color: "text-blue-500" },
  { user: "Dr. Torres", action: "actualizó perfil de donante", target: "Juan Pérez (Duffy-)", time: "Hace 1 hora", icon: RefreshCw, color: "text-indigo-500" },
  { user: "Sistema", action: "generó reporte nacional", target: "Enero 2026", time: "Hace 2 horas", icon: FileBarChart, color: "text-slate-500" },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-900 text-sm">Actividad Reciente</h3>
        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Log en vivo</span>
      </div>
      <div className="flex-1 p-5 space-y-6">
        {activityLog.map((log, index) => (
          <div key={index} className="flex gap-4 relative">
            {index !== activityLog.length - 1 && (
              <div className="absolute left-[9px] top-6 bottom-[-24px] w-[2px] bg-slate-100" />
            )}
            <div className={cn("w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center shrink-0 z-10", log.color.replace('text', 'border'))}>
              <log.icon className={cn("w-3 h-3", log.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-600 leading-normal">
                <span className="font-bold text-slate-900">{log.user}</span> {log.action}{' '}
                <span className="font-semibold text-blue-600">{log.target}</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <button className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
          Ver log de auditoría completo
        </button>
      </div>
    </div>
  );
};

export const GeographicDistribution = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 text-sm">Distribución Geográfica de Donantes</h3>
        <select className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none text-slate-600">
          <option>Nacional</option>
          <option>Región Norte</option>
          <option>Región Sur</option>
          <option>Región Central</option>
        </select>
      </div>
      <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#2563eb_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_30%,#2563eb_0%,transparent_30%)]" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_80%_70%,#2563eb_0%,transparent_30%)]" />

        <div className="text-center z-10 p-6">
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100">
            <Layers className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-900">Mapa Coroplético Activo</p>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">Visualización de densidad de donantes por genotipo RhD-</p>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600">
            <div className="w-2 h-2 rounded-full bg-blue-600" /> <span>Alta Densidad</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600">
            <div className="w-2 h-2 rounded-full bg-blue-300" /> <span>Media Densidad</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600">
            <div className="w-2 h-2 rounded-full bg-blue-100" /> <span>Baja Densidad</span>
          </div>
        </div>
      </div>
    </div>
  );
};
