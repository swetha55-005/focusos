import { motion } from 'framer-motion'

const stats = [
  { label: 'Tasks Completed', value: '12', change: '+3 today',  color: 'text-indigo-400' },
  { label: 'Notes Written',   value: '8',  change: '+1 today',  color: 'text-emerald-400' },
  { label: 'Goals Active',    value: '3',  change: '2 on track', color: 'text-amber-400' },
  { label: 'Focus Hours',     value: '5h', change: '+1h today',  color: 'text-pink-400' },
]

const recentTasks = [
  { title: 'Complete React assignment',  status: 'Done',        priority: 'High'   },
  { title: 'Read system design chapter', status: 'In Progress', priority: 'Medium' },
  { title: 'Practice DSA problems',      status: 'Todo',        priority: 'High'   },
  { title: 'Update GitHub README',       status: 'Todo',        priority: 'Low'    },
]

const statusColors = {
  'Done':        'bg-emerald-500/10 text-emerald-400',
  'In Progress': 'bg-amber-500/10 text-amber-400',
  'Todo':        'bg-slate-500/10 text-slate-400',
}

const priorityColors = {
  'High':   'bg-red-500/10 text-red-400',
  'Medium': 'bg-amber-500/10 text-amber-400',
  'Low':    'bg-slate-500/10 text-slate-400',
}

function DashboardPage() {
  return (
    <div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Good morning! 👋</h1>
        <p className="text-slate-400 mt-1">Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#111118] border border-white/10 rounded-xl p-5"
          >
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-[#111118] border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-semibold text-lg mb-4">Recent Tasks</h2>

        <div className="flex flex-col gap-3">
          {recentTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <span className="text-slate-200 text-sm">{task.title}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DashboardPage