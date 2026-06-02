import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'

const RISK_DIST = [
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'High', value: 4, color: '#f97316' },
  { name: 'Medium', value: 8, color: '#eab308' },
  { name: 'Low', value: 9, color: '#22c55e' },
]
const SCENARIO_SCORES = [
  { scenario: 'Data Isolation', score: 7.2 },
  { scenario: 'Cross-User', score: 8.5 },
  { scenario: 'Training Data', score: 5.4 },
  { scenario: 'Context Boundary', score: 6.8 },
  { scenario: 'System Prompt', score: 3.2 },
  { scenario: 'Priv Escalation', score: 7.9 },
]
const RECENT = [
  { id: 1, name: 'Enterprise Isolation Audit', status: 'completed', risk: 'HIGH', date: '2026-06-01' },
  { id: 2, name: 'Cross-User Leakage Scan', status: 'completed', risk: 'CRITICAL', date: '2026-05-31' },
  { id: 3, name: 'Privilege Escalation Test', status: 'running', risk: 'MEDIUM', date: '2026-05-31' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold">Security Dashboard</h2><p className="text-gray-400 text-sm mt-1">Enterprise AI security posture overview</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tests" value={24} subtitle="Last 30 days" />
        <StatCard title="Vulnerabilities" value={7} color="text-red-400" subtitle="Active findings" />
        <StatCard title="Avg Risk Score" value={6.8} color="text-orange-400" subtitle="Out of 10.0" />
        <StatCard title="Models Scanned" value={5} subtitle="Across 4 vendors" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Risk by Attack Scenario</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={SCENARIO_SCORES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="scenario" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
              <Bar dataKey="score" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={RISK_DIST} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {RISK_DIST.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Recent Tests</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-800"><th className="text-left py-2 px-3 text-gray-500">Test Name</th><th className="text-left py-2 px-3 text-gray-500">Status</th><th className="text-left py-2 px-3 text-gray-500">Risk</th><th className="text-left py-2 px-3 text-gray-500">Date</th></tr></thead>
          <tbody>{RECENT.map((t) => (
            <tr key={t.id} className="border-b border-gray-800/50"><td className="py-2.5 px-3 text-gray-300">{t.name}</td><td className="py-2.5 px-3"><span className={`text-xs font-medium ${t.status==='completed'?'text-green-400':'text-yellow-400'}`}>{t.status}</span></td><td className="py-2.5 px-3"><RiskBadge level={t.risk} /></td><td className="py-2.5 px-3 text-gray-500">{t.date}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
