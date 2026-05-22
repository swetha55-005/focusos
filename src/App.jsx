import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <Routes>

      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* App pages with sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

    </Routes>
  )
}

export default App