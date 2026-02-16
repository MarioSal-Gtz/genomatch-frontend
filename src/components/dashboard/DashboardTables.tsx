import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const frequentSearches = [
  { term: "RhD Positivo / Kell Negativo", count: 1240, change: 12.5, positive: true },
  { term: "Duffy (Fya- / Fyb-)", count: 856, change: 8.2, positive: true },
  { term: "Kidd (Jka- / Jkb+)", count: 642, change: 3.1, positive: false },
  { term: "MNS (S- / s+)", count: 531, change: 5.4, positive: true },
  { term: "Vel Negativo", count: 124, change: 1.2, positive: false },
];

export const FrequentSearches = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-900 text-sm">Búsquedas Más Frecuentes</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1">
        {frequentSearches.map((search, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-4 hover:bg-slate-50 transition-colors",
              index !== frequentSearches.length - 1 && "border-b border-slate-50"
            )}
          >
            <div>
              <p className="text-sm font-medium text-slate-800">{search.term}</p>
              <p className="text-xs text-slate-500 mt-1 tabular-nums">{search.count.toLocaleString()} búsquedas</p>
            </div>
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded",
              search.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}>
              {search.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {search.change}%
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <button className="w-full py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
          Ver reporte detallado
        </button>
      </div>
    </div>
  );
};

const staffPerformance = [
  { name: "Dra. Lucía Méndez", role: "Genetista Senior", sequences: 45, reviews: 128, avatar: "LM", color: "bg-blue-100 text-blue-700" },
  { name: "Lic. Roberto Carlos", role: "Técnico Molecular", sequences: 38, reviews: 92, avatar: "RC", color: "bg-indigo-100 text-indigo-700" },
  { name: "Dr. Sergio Torres", role: "Bioquímico", sequences: 31, reviews: 110, avatar: "ST", color: "bg-emerald-100 text-emerald-700" },
  { name: "Lic. Elena Rivas", role: "Técnico de Laboratorio", sequences: 28, reviews: 75, avatar: "ER", color: "bg-purple-100 text-purple-700" },
];

export const StaffPerformance = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-900 text-sm">Rendimiento del Personal</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-400">Usuario</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 text-center">Secuencias</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 text-center">Revisiones</th>
            </tr>
          </thead>
          <tbody>
            {staffPerformance.map((user, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0", user.color)}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{user.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-center text-sm font-medium text-slate-600 tabular-nums">
                  {user.sequences}
                </td>
                <td className="px-5 py-3 text-center text-sm font-medium text-slate-600 tabular-nums">
                  {user.reviews}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
        <button className="w-full py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
          Gestionar equipo
        </button>
      </div>
    </div>
  );
};
