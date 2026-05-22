import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AIPage from './pages/AIPage'
import AnalyticsPage from './pages/AnalyticsPage'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard"  element={<DashboardPage />}  />
        <Route path="/tasks"      element={<TasksPage />}      />
        <Route path="/ai"         element={<AIPage />}         />
        <Route path="/analytics"  element={<AnalyticsPage />}  />
      </Route>
    </Routes>
  )
}

export default App