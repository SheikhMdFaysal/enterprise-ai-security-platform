import { useState } from 'react'
import RiskBadge from '../components/RiskBadge'
const ALL_TECHNIQUES = ['direct','poetry','narrative','metaphor','euphemism','role_shift','reverse_psychology','hypothetical','academic','technical_jargon']
const SCENARIOS = [
  { id: 'enterprise_data_isolation', name: 'Enterprise Data Isolation' },
  { id: 'cross_user_leakage', name: 'Cross-User Leakage' },
  { id: 'training_data_extraction', name: 'Training Data Extraction' },
  { id: 'context_boundary', name: 'Context Boundary' },
  { id: 'system_prompt_leakage', name: 'System Prompt Leakage' },
  { id: 'privilege_escalation', name: 'Privilege Escalation' },
]
const DEMO = [
  { id: 1, name: 'Full Enterprise Audit', scenario: 'enterprise_data_isolation', status: 'completed', risk: 'HIGH', runs: 60, date: '2026-06-01' },
  { id: 2, name: 'Cross-User Scan', scenario: 'cross_user_leakage', status: 'completed', risk: 'CRITICAL', runs: 48, date: '2026-05-31' },
  { id: 3, name: 'Privilege Escalation', scenario: 'privilege_escalation', status: 'running', risk: 'MEDIUM', runs: 30, date: '2026-05-31' },
]
export default function Tests() {
  const [scenario, setScenario] = useState('')
  const [techniques, setTechniques] = useState([])
  const [name, setName] = useState('')
  const toggle = (t) => setTechniques((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t])
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold">Security Tests</h2></div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">New Security Test</h3>
        <div className="space-y-4">
          <div><label className="block text-sm text-gray-400 mb-1">Test Name</label><input value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" placeholder="e.g. Q1 Security Audit" /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Attack Scenario</label><select value={scenario} onChange={(e)=>setScenario(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"><option value="">Select...</option>{SCENARIOS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
          <div><label className="block text-sm text-gray-400 mb-2">Techniques ({techniques.length}/10)</label><div className="flex flex-wrap gap-2">{ALL_TECHNIQUES.map((t) => <button key={t} type="button" onClick={()=>toggle(t)} className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${techniques.includes(t)?'bg-red-500/20 text-red-400 border-red-500/30':'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'}`}>{t.replace('_',' ')}</button>)}</div></div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Run Security Test</button>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">Test History</h3>
        <table className="w-full text-sm"><thead><tr className="border-b border-gray-800"><th className="text-left py-2 px-3 text-gray-500">Name</th><th className="text-left py-2 px-3 text-gray-500">Scenario</th><th className="text-left py-2 px-3 text-gray-500">Status</th><th className="text-left py-2 px-3 text-gray-500">Risk</th><th className="text-left py-2 px-3 text-gray-500">Date</th></tr></thead>
        <tbody>{DEMO.map((t) => <tr key={t.id} className="border-b border-gray-800/50"><td className="py-2.5 px-3 text-gray-300">{t.name}</td><td className="py-2.5 px-3 text-gray-400">{t.scenario.replace(/_/g,' ')}</td><td className="py-2.5 px-3"><span className={`text-xs ${t.status==='completed'?'text-green-400':'text-yellow-400'}`}>{t.status}</span></td><td className="py-2.5 px-3"><RiskBadge level={t.risk} /></td><td className="py-2.5 px-3 text-gray-500">{t.date}</td></tr>)}</tbody></table>
      </div>
    </div>
  )
}
