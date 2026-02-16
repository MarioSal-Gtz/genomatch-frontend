import { Bell, Search, ChevronRight, HelpCircle } from 'lucide-react';

export const DashboardTopbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <span className="hover:text-blue-600 cursor-pointer transition-colors">Inicio</span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="text-slate-900 font-medium">Panel de Control</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Buscar muestras, donantes..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors group">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 leading-none">Dr. Alejandro Vivas</p>
              <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-medium">Administrador Nivel 3</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border-2 border-blue-200 group-hover:border-blue-400 transition-colors">
              AV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
