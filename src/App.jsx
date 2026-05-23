import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AnalyticsPage from './pages/AnalyticsPage'
import NotesPage from './pages/NotesPage'
import GoalsPage from './pages/GoalsPage'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard"  element={<DashboardPage />}  />
        <Route path="/tasks"      element={<TasksPage />}      />
        <Route path="/analytics"  element={<AnalyticsPage />}  />
        <Route path="/notes"      element={<NotesPage />}      />
        <Route path="/goals"      element={<GoalsPage />}      />
      </Route>
    </Routes>
  )
}

export default App