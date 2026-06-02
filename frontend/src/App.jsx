import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Scenarios from './pages/Scenarios'
import Tests from './pages/Tests'
import Results from './pages/Results'
import Compliance from './pages/Compliance'

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </main>
    </div>
  )
}
