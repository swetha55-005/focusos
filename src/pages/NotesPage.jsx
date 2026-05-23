import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const initialNotes = [
  {
    id: 1,
    title: 'React Hooks Study Notes',
    content: 'useState is for storing data. useEffect is for side effects like API calls. useRef is for accessing DOM elements directly.',
    date: '24 May 2026',
    color: 'border-indigo-500/40',
  },
  {
    id: 2,
    title: 'Placement Preparation Plan',
    content: 'Week 1: DSA basics. Week 2: React projects. Week 3: System design. Week 4: Mock interviews. Apply to companies daily.',
    date: '23 May 2026',
    color: 'border-emerald-500/40',
  },
  {
    id: 3,
    title: 'Project Ideas',
    content: 'FocusOS - AI productivity dashboard. Already building this! Add more features like calendar, pomodoro timer, and team collaboration.',
    date: '22 May 2026',
    color: 'border-amber-500/40',
  },
]

function NotesPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [selected, setSelected] = useState(notes[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const selectNote = (note) => {
    setSelected(note)
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditTitle(selected.title)
    setEditContent(selected.content)
    setIsEditing(true)
  }

  const saveEdit = () => {
    const updated = notes.map(n =>
      n.id === selected.id
        ? { ...n, title: editTitle, content: editContent }
        : n
    )
    setNotes(updated)
    setSelected({ ...selected, title: editTitle, content: editContent })
    setIsEditing(false)
  }

  const deleteNote = (id) => {
    const remaining = notes.filter(n => n.id !== id)
    setNotes(remaining)
    setSelected(remaining[0] || null)
  }

  const addNote = () => {
    if (!newTitle.trim()) return
    const note = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }),
      color: 'border-indigo-500/40',
    }
    setNotes(prev => [note, ...prev])
    setSelected(note)
    setNewTitle('')
    setNewContent('')
    setShowForm(false)
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Notes 📝</h1>
          <p className="text-slate-400 mt-1">Write and organize your thoughts</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + New Note
        </button>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#111118] border border-white/10 rounded-xl p-5 mb-6"
          >
            <h3 className="text-white font-medium mb-4">New Note</h3>
            <input
              type="text"
              placeholder="Note title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-indigo-500/50"
            />
            <textarea
              placeholder="Write your note here..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              className="w-full bg-[#1A1A24] border border-white/10 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-indigo-500/50 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={addNote}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Note
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="border border-white/10 hover:border-white/20 text-slate-400 px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Notes List */}
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => selectNote(note)}
              className={`bg-[#111118] border rounded-xl p-4 cursor-pointer transition-all duration-200
                ${selected?.id === note.id
                  ? 'border-indigo-500/60 bg-indigo-500/5'
                  : `border-white/10 hover:border-white/20 ${note.color}`
                }`}
            >
              <h3 className="text-white text-sm font-medium mb-1 truncate">{note.title}</h3>
              <p className="text-slate-500 text-xs truncate">{note.content}</p>
              <p className="text-slate-600 text-xs mt-2">{note.date}</p>
            </motion.div>
          ))}
        </div>

        {/* Note Detail */}
        <div className="lg:col-span-2 bg-[#111118] border border-white/10 rounded-xl p-6">
          {selected ? (
            <>
              {/* Note Header */}
              <div className="flex items-center justify-between mb-6">
                {isEditing ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 bg-transparent text-white text-xl font-bold border-b border-indigo-500/50 pb-1 focus:outline-none mr-4"
                  />
                ) : (
                  <h2 className="text-white text-xl font-bold">{selected.title}</h2>
                )}

                <div className="flex gap-2">
                  {isEditing ? (
                    <button
                      onClick={saveEdit}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={startEditing}
                      className="border border-white/10 hover:border-white/20 text-slate-400 hover:text-white px-4 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteNote(selected.id)}
                    className="border border-red-500/20 hover:border-red-500/40 text-red-400 px-4 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Note Content */}
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={12}
                  className="w-full bg-transparent text-slate-300 text-sm leading-relaxed focus:outline-none resize-none"
                />
              ) : (
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.content}
                </p>
              )}

              <p className="text-slate-600 text-xs mt-6">{selected.date}</p>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-600">Select a note or create a new one</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default NotesPage