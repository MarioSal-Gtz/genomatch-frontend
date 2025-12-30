import { Users, Activity, Dna, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  {
    title: 'Usuarios Activos',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Analisis Geneticos',
    value: '12,543',
    change: '+8.2%',
    trend: 'up',
    icon: Dna,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Matches Exitosos',
    value: '1,234',
    change: '+23.1%',
    trend: 'up',
    icon: Activity,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Precision Promedio',
    value: '98.7%',
    change: '-0.3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'from-orange-500 to-amber-500',
  },
];

const recentMatches = [
  { id: 1, name: 'Maria Garcia', match: 'Carlos Rodriguez', score: 94.5, date: '2024-01-15' },
  { id: 2, name: 'Juan Lopez', match: 'Ana Martinez', score: 89.2, date: '2024-01-14' },
  { id: 3, name: 'Sofia Hernandez', match: 'Pedro Sanchez', score: 96.8, date: '2024-01-14' },
  { id: 4, name: 'Luis Torres', match: 'Carmen Ruiz', score: 91.3, date: '2024-01-13' },
  { id: 5, name: 'Elena Diaz', match: 'Miguel Flores', score: 88.7, date: '2024-01-13' },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido de vuelta. Aqui tienes un resumen de tu plataforma.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="glass-strong rounded-2xl p-6 card-hover"
            style={{ animationDelay: (index * 0.1) + "s" }}
          >
            <div className="flex items-start justify-between">
              <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + stat.color + " flex items-center justify-center shadow-lg"}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={"flex items-center gap-1 text-sm font-medium " + (stat.trend === 'up' ? 'text-green-600' : 'text-red-500')}>
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Matches Table */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Matches Recientes</h2>
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
            Ver todos
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Usuario</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Match</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Compatibilidad</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentMatches.map((match) => (
                <tr key={match.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                        {match.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{match.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
                        {match.match.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{match.match}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: match.score + "%" }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{match.score}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{match.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
