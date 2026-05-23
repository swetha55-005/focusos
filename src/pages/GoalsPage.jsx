import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const initialGoals = [
  {
    id: 1,
    title: 'Get Placed in a Product Company',
    target: 100,
    current: 35,
    deadline: 'Dec 2026',
    color: 'bg-indigo-500',
  },
  {
    id: 2,
    title: 'Complete 100 DSA Problems',
    target: 100,
    current: 42,
    deadline: 'Jul 2026',
    color: 'bg-emerald-500',
  },
  {
    id: 3,
    title: 'Build 3 Full Stack Projects',
    target: 3,
    current: 1,
    deadline: 'Aug 2026',
    color: 'bg-amber-500',
  },
  {
    id: 4,
    title: 'Learn System Design',
    target: 20,
    current: 8,
    deadline: 'Jun 2026',
    color: 'bg-pink-500',
  },
]

function GoalCard({ goal, onUpdate, onDelete }) {
  const percentage = Math.round((goal.current / goal.target) * 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111118] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white font-medium text-sm flex-1 pr-4">{goal.title}</h3>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-slate-600 hover:text-red-400 text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 text-xs">Progress</span>
          <span className="text-white text-xs font-medium">{percentage}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${goal.color}`}
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-slate-500 text-xs">
          {goal.current} / {goal.target} completed
        </span>
        <span className="text-slate-500 text-xs">
          🎯 {goal.deadline}
        </span>
      </div>

      {/* Update progress buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onUpdate(goal.id, -1)}
          disabled={goal.current <= 0}
          className="flex-1 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white py-1.5 rounded-lg text-xs transition-colors disabled:opacity-30"
        >
          − Less
        </button>
        <button
          onClick={() => onUpdate(goal.id, 1)}
          disabled={goal.current >= goal.target}
          className="flex-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 py-1.5 rounded-lg text-xs transition-colors disabled:opacity-30"
        >
          + Progress
        </button>
      </div>

    </motion.div>
  )
}

function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTarget, setNewTarget] = useState('')
  const [newDeadline, setNewDeadline] = useState('')

  const colors = [
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-pink-500',
    'bg-blue-500',
  ]

  const updateGoal = (id, change) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === id
          ? { ...g, current: Math.min(g.target, Math.max(0, g.current + change)) }
          : g
      )
    )
  }

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  const addGoal = () => {
    if (!newTitle.trim() || !newTarget) return
    const goal = {
      id: Date.now(),
      title: newTitle,
      target: parseInt(newTarget),
      current: 0,
      deadline: newDeadline || 'No deadline',
      color: colors[Math.floor(Math.random() * colors.length)],
    }
    setGoals(prev => [goal, ...prev])
    setNewTitle('')
    setNewTarget('')
    setNewDeadline('')
    setShowForm(false)
  }

  const totalGoals = goals.length
  const completedGoals = goals.filter(
    g => g.current >= g.target
  ).length

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Goals 🎯</h1>
          <p className="text-slate-400 mt-1">
            {completedGoals} of {totalGoals} goals completed
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#111118] border border-white/10 rounded-xl p-5 mb-6"
          >
            <h3 className="text-white font-medium mb-4">New Goal</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Goal title (e.g. Complete 50 DSA problems)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Target number (e.g. 50)"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="flex-1 bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50"
                />
                <input
                  type="text"
                  placeholder="Deadline (e.g. Dec 2026)"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="flex-1 bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addGoal}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Save Goal
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="border border-white/10 text-slate-400 px-5 py-2 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdate={updateGoal}
            onDelete={deleteGoal}
          />
        ))}

        {goals.length === 0 && (
          <div className="col-span-2 text-center py-20 text-slate-600">
            No goals yet. Add your first goal! 🎯
          </div>
        )}
      </div>

    </div>
  )
}

export default GoalsPage
