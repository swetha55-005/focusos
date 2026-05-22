import { useState } from 'react'
import { motion } from 'framer-motion'

const initialTasks = {
  todo: [
    { id: 1, title: 'Study React hooks',        priority: 'High'   },
    { id: 2, title: 'Practice DSA problems',    priority: 'High'   },
    { id: 3, title: 'Read system design book',  priority: 'Medium' },
  ],
  inprogress: [
    { id: 4, title: 'Build FocusOS project',    priority: 'High'   },
    { id: 5, title: 'Update LinkedIn profile',  priority: 'Medium' },
  ],
  done: [
    { id: 6, title: 'Setup React project',      priority: 'High'   },
    { id: 7, title: 'Install Tailwind CSS',     priority: 'Low'    },
  ],
}

const priorityColors = {
  High:   'bg-red-500/10 text-red-400 border border-red-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Low:    'bg-slate-500/10 text-slate-400 border border-slate-500/20',
}

const columns = [
  { key: 'todo',       label: '📋 To Do',       color: 'text-slate-400'   },
  { key: 'inprogress', label: '⚡ In Progress',  color: 'text-amber-400'   },
  { key: 'done',       label: '✅ Done',         color: 'text-emerald-400' },
]

function TaskCard({ task, onMove, columnKey }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A1A24] border border-white/10 rounded-lg p-4 mb-3 hover:border-indigo-500/40 transition-colors duration-200"
    >
      {/* Task title */}
      <p className="text-slate-200 text-sm mb-3">{task.title}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>

        {/* Move buttons */}
        <div className="flex gap-1">
          {columnKey !== 'todo' && (
            <button
              onClick={() => onMove(task.id, columnKey, 'back')}
              className="text-slate-500 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/5 transition-colors"
            >
              ← Back
            </button>
          )}
          {columnKey !== 'done' && (
            <button
              onClick={() => onMove(task.id, columnKey, 'forward')}
              className="text-indigo-400 hover:text-indigo-300 text-xs px-2 py-1 rounded hover:bg-indigo-500/10 transition-colors"
            >
              Forward →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState('Medium')

  const moveTask = (taskId, fromColumn, direction) => {
    const columnOrder = ['todo', 'inprogress', 'done']
    const fromIndex = columnOrder.indexOf(fromColumn)
    const toColumn = direction === 'forward'
      ? columnOrder[fromIndex + 1]
      : columnOrder[fromIndex - 1]

    const task = tasks[fromColumn].find(t => t.id === taskId)

    setTasks(prev => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter(t => t.id !== taskId),
      [toColumn]: [...prev[toColumn], task],
    }))
  }

  const addTask = () => {
    if (!newTitle.trim()) return

    const task = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
    }

    setTasks(prev => ({
      ...prev,
      todo: [task, ...prev.todo],
    }))

    setNewTitle('')
    setNewPriority('Medium')
    setShowForm(false)
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-slate-400 mt-1">Manage your work with Kanban board</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111118] border border-white/10 rounded-xl p-5 mb-6"
        >
          <h3 className="text-white font-medium mb-4">New Task</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="What do you need to do?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-[#1A1A24] border border-white/10 text-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500/50"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button
              onClick={addTask}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </motion.div>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => (
          <div key={col.key} className="bg-[#111118] border border-white/10 rounded-xl p-4">

            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-semibold text-sm ${col.color}`}>{col.label}</h2>
              <span className="bg-white/5 text-slate-400 text-xs px-2 py-0.5 rounded-full">
                {tasks[col.key].length}
              </span>
            </div>

            {/* Task Cards */}
            <div className="min-h-24">
              {tasks[col.key].length === 0 && (
                <p className="text-slate-600 text-xs text-center mt-8">No tasks here</p>
              )}
              {tasks[col.key].map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  columnKey={col.key}
                  onMove={moveTask}
                />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default TasksPage