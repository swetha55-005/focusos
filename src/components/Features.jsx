import { motion } from 'framer-motion'

const features = [
  {
    icon: '✅',
    title: 'Smart Task Manager',
    description: 'Organize your work with a beautiful Kanban board. Drag, drop and get things done.',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Ask your AI assistant to break down tasks, write notes or plan your day instantly.',
  },
  {
    icon: '📊',
    title: 'Productivity Analytics',
    description: 'See your progress with beautiful charts and a daily activity heatmap.',
  },
]

function Features() {
  return (
    <section className="py-24 px-6">

      {/* Section title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Everything you need to stay focused
        </h2>
        <p className="text-slate-400 text-lg">
          Built for students and professionals who want to do more.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#111118] border border-white/10 rounded-xl p-6 hover:border-indigo-500/40 transition-colors duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default Features