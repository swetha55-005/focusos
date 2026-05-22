import { motion } from 'framer-motion'
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from 'recharts'

const weeklyData = [
  { day: 'Mon', tasks: 4, hours: 3 },
  { day: 'Tue', tasks: 7, hours: 5 },
  { day: 'Wed', tasks: 5, hours: 4 },
  { day: 'Thu', tasks: 9, hours: 6 },
  { day: 'Fri', tasks: 6, hours: 4 },
  { day: 'Sat', tasks: 3, hours: 2 },
  { day: 'Sun', tasks: 8, hours: 5 },
]

const stats = [
  { label: 'Total Tasks Done', value: '42',  color: 'text-indigo-400' },
  { label: 'Avg Daily Tasks',  value: '6',   color: 'text-emerald-400' },
  { label: 'Best Day',         value: 'Thu', color: 'text-amber-400' },
  { label: 'Focus Hours',      value: '29h', color: 'text-pink-400' },
]

const tooltipStyle = {
  backgroundColor: '#1A1A24',
  border: '1px solid #ffffff15',
  borderRadius: '8px',
  color: '#f1f5f9',
}

function AnalyticsPage() {
  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics 📊</h1>
        <p className="text-slate-400 mt-1">Track your productivity over time</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#111118] border border-white/10 rounded-xl p-5"
          >
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111118] border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-white font-semibold mb-1">Tasks Completed</h2>
          <p className="text-slate-400 text-sm mb-6">This week</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="#475569"
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#taskGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#111118] border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-white font-semibold mb-1">Focus Hours</h2>
          <p className="text-slate-400 text-sm mb-6">This week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="day"
                stroke="#475569"
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: '#475569', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar
                dataKey="hours"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  )
}

export default AnalyticsPage