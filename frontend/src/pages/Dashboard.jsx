import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'

const RISK_COLORS_CHART = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#22c55e',
}

const DEMO_STATS = {
  totalTests: 24,
  vulnerabilities: 7,
  avgRiskScore: 6.8,
  modelsScanned: 5,
}

const DEMO_RISK_DISTRIBUTION = [
  { name: 'Critical', value: 3, color: RISK_COLORS_CHART.CRITICAL },
  { name: 'High', value: 4, color: RISK_COLORS_CHART.HIGH },
  { name: 'Medium', value: 8, color: RISK_COLORS_CHART.MEDIUM },
  { name: 'Low', value: 9, color: RISK_COLORS_CHART.LOW },
]

const DEMO_SCENARIO_SCORES = [
  { scenario: 'Data Isolation', score: 7.2 },
  { scenario: 'Cross-User', score: 8.5 },
  { scenario: 'Training Data', score: 5.4 },
  { scenario: 'Context Boundary', score: 6.8 },
  { scenario: 'System Prompt', score: 3.2 },
  { scenario: 'Privilege Escalation', score: 7.9 },
]

const DEMO_RECENT = [
  { id: 1, name: 'Enterprise Isolation Audit', status: 'completed', risk: 'HIGH', date: '2026-03-06' },
  { id: 2, name: 'Cross-User Leakage Scan', status: 'completed', risk: 'CRITICAL', date: '2026-03-05' },
  { id: 3, name: 'Privilege Escalation Test', status: 'running', risk: 'MEDIUM', date: '2026-03-05' },
  { id: 4, name: 'Training Data Extraction', status: 'completed', risk: 'HIGH', date: '2026-03-04' },
]

export default function Dashboard() {
  const [stats] = useState(DEMO_STATS)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">Enterprise AI security posture overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tests" value={stats.totalTests} subtitle="Last 30 days" />
        <StatCard title="Vulnerabilities" value={stats.vulnerabilities} color="text-red-400" subtitle="Active findings" />
        <StatCard title="Avg Risk Score" value={stats.avgRiskScore} color="text-orange-400" subtitle="Out of 10.0" />
        <StatCard title="Models Scanned" value={stats.modelsScanned} subtitle="Across 4 vendors" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Risk by Attack Scenario</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={DEMO_SCENARIO_SCORES}>
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
            <PieChart>
              <Pie data={DEMO_RISK_DISTRIBUTION} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {DEMO_RISK_DISTRIBUTION.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Recent Tests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Test Name</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Status</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Risk Level</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_RECENT.map((test) => (
                <tr key={test.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 text-gray-300">{test.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-medium ${test.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3"><RiskBadge level={test.risk} /></td>
                  <td className="py-2.5 px-3 text-gray-500">{test.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
