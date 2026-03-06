import { useState } from 'react'
import RiskBadge from '../components/RiskBadge'

const ALL_TECHNIQUES = [
  'direct', 'poetry', 'narrative', 'metaphor', 'euphemism',
  'role_shift', 'reverse_psychology', 'hypothetical', 'academic', 'technical_jargon',
]

const SCENARIOS = [
  { id: 'enterprise_data_isolation', name: 'Enterprise Data Isolation' },
  { id: 'cross_user_leakage', name: 'Cross-User Leakage' },
  { id: 'training_data_extraction', name: 'Training Data Extraction' },
  { id: 'context_boundary', name: 'Context Boundary' },
  { id: 'system_prompt_leakage', name: 'System Prompt Leakage' },
  { id: 'privilege_escalation', name: 'Privilege Escalation' },
]

const DEMO_TESTS = [
  { id: 1, name: 'Full Enterprise Audit', scenario: 'enterprise_data_isolation', status: 'completed', risk: 'HIGH', variants: 20, runs: 60, date: '2026-03-06' },
  { id: 2, name: 'Cross-User Scan', scenario: 'cross_user_leakage', status: 'completed', risk: 'CRITICAL', variants: 16, runs: 48, date: '2026-03-05' },
  { id: 3, name: 'Privilege Escalation Audit', scenario: 'privilege_escalation', status: 'running', risk: 'MEDIUM', variants: 10, runs: 30, date: '2026-03-05' },
]

export default function Tests() {
  const [selectedScenario, setSelectedScenario] = useState('')
  const [selectedTechniques, setSelectedTechniques] = useState([])
  const [testName, setTestName] = useState('')

  const toggleTechnique = (t) => {
    setSelectedTechniques((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Test "${testName}" would be submitted with scenario=${selectedScenario}, techniques=${selectedTechniques.join(',')}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Tests</h2>
        <p className="text-gray-400 text-sm mt-1">Run and manage security assessments</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">New Security Test</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Test Name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              placeholder="e.g. Q1 Enterprise Security Audit"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Attack Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            >
              <option value="">Select scenario...</option>
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Variant Techniques ({selectedTechniques.length}/10)</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TECHNIQUES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTechnique(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    selectedTechniques.includes(t)
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Run Security Test
          </button>
        </form>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">Test History</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Name</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Scenario</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Status</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Risk</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Variants</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Runs</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_TESTS.map((test) => (
              <tr key={test.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-2.5 px-3 text-gray-300 font-medium">{test.name}</td>
                <td className="py-2.5 px-3 text-gray-400">{test.scenario.replace(/_/g, ' ')}</td>
                <td className="py-2.5 px-3">
                  <span className={`text-xs font-medium ${test.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {test.status}
                  </span>
                </td>
                <td className="py-2.5 px-3"><RiskBadge level={test.risk} /></td>
                <td className="py-2.5 px-3 text-gray-400">{test.variants}</td>
                <td className="py-2.5 px-3 text-gray-400">{test.runs}</td>
                <td className="py-2.5 px-3 text-gray-500">{test.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
