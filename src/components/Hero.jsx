import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

      {/* Small label at top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm px-4 py-1.5 rounded-full mb-6"
      >
        ✨ AI Powered Productivity
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-tight mb-6"
      >
        Your AI-powered
        <span className="text-indigo-400"> command center</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-400 text-lg max-w-xl mb-10"
      >
        Manage tasks, write notes, track goals and get AI assistance —
        all in one beautiful workspace.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-4"
      >
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          Get Started Free
        </button>
        <button className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
          View Demo
        </button>
      </motion.div>

    </section>
  )
}

export default Hero