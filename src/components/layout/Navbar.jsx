function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-md">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-white font-bold text-lg">FocusOS</span>
      </div>

      {/* Button */}
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
        Get Started Free
      </button>

    </nav>
  )
}

export default Navbar