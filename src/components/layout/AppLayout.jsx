import { Outlet } from 'react-router-dom'
import Sidebar from './navItems'

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">

      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>

    </div>
  )
}

export default AppLayout