import {
  LayoutDashboard,
  Search,
  Dna,
  Box,
  ShieldCheck,
  Map as MapIcon,
  Users,
  FileText,
  CheckSquare,
  Database,
  LogOut,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Search, label: 'Búsqueda de Muestras' },
  { icon: Dna, label: 'Genotipos' },
  { icon: Box, label: 'Inventario' },
  { icon: ShieldCheck, label: 'Compatibilidad' },
  { icon: MapIcon, label: 'Mapa' },
  { icon: Users, label: 'Donantes' },
  { icon: FileText, label: 'Reportes' },
  { icon: CheckSquare, label: 'Tareas' },
  { icon: Database, label: 'Sistema Nacional' },
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <Dna className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm tracking-tight leading-none">RBC-GENOmatch</h1>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Molecular Blood Bank</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors group",
              item.active
                ? "bg-blue-600/10 text-blue-400 font-medium"
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4 transition-colors",
              item.active ? "text-blue-400" : "text-slate-500 group-hover:text-white"
            )} />
            <span>{item.label}</span>
            {item.active && <div className="ml-auto w-1 h-4 bg-blue-400 rounded-full" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          <span>Configuración</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
