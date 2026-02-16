import { DashboardSidebar } from '../components/dashboard/Sidebar';
import { DashboardTopbar } from '../components/dashboard/Topbar';
import { DashboardKPIs } from '../components/dashboard/DashboardKPIs';
import { FrequentSearches, StaffPerformance } from '../components/dashboard/DashboardTables';
import { QuickActions, RecentActivity, GeographicDistribution } from '../components/dashboard/DashboardWidgets';
import { Info } from 'lucide-react';

export default function PanelControl() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar with Breadcrumbs and Profile */}
        <DashboardTopbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Panel de Control</h2>
              <p className="text-slate-500 mt-1 flex items-center gap-2">
                Resumen general del banco de sangre molecular
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider border border-blue-100">
                  <Info className="w-3 h-3" /> Sistema Nacional Sincronizado
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                Exportar Dashboard
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                Nuevo Análisis
              </button>
            </div>
          </div>

          {/* KPI Grid */}
          <section className="mb-8">
            <DashboardKPIs />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Left Column: Tables */}
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FrequentSearches />
              <StaffPerformance />
              <div className="md:col-span-2">
                <GeographicDistribution />
              </div>
            </div>

            {/* Right Column: Widgets */}
            <div className="flex flex-col gap-6">
              <QuickActions />
              <RecentActivity />
            </div>
          </div>

          {/* Footer Audit Info */}
          <footer className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-[11px] text-slate-400 font-medium uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Estado del Servidor: Óptimo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Sincronización: Activa (Hace 2m)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium italic">
              ID de Sesión: RBC-MATCH-8821-X992 • Nivel de Autorización: Administrador Maestro
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
