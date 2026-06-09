import RiskBadge from '../components/RiskBadge'
const FW = [
  { name: 'SOC2', desc: 'Trust Services Criteria', controls: 12, violations: 4, risk: 'HIGH' },
  { name: 'ISO 27001', desc: 'Information Security Management', controls: 10, violations: 3, risk: 'HIGH' },
  { name: 'CPCSC', desc: 'Cybersecurity Privacy Controls', controls: 8, violations: 2, risk: 'MEDIUM' },
  { name: 'NIST AI RMF', desc: 'AI Risk Management Framework', controls: 9, violations: 4, risk: 'CRITICAL' },
  { name: 'GDPR', desc: 'General Data Protection Regulation', controls: 6, violations: 3, risk: 'HIGH' },
  { name: 'CCPA', desc: 'California Consumer Privacy Act', controls: 5, violations: 3, risk: 'HIGH' },
]
const SCENARIOS = ['Data Isolation','Cross-User','Training Data','Context Boundary','System Prompt','Privilege Escalation']
const FRAMEWORKS = ['SOC2','ISO27001','CPCSC','NIST_AI_RMF','GDPR','CCPA']
const MATRIX = {
  'Data Isolation': { SOC2: 'HIGH', ISO27001: 'HIGH', CPCSC: 'MEDIUM', NIST_AI_RMF: 'HIGH', GDPR: 'MEDIUM', CCPA: 'MEDIUM' },
  'Cross-User': { SOC2: 'CRITICAL', ISO27001: 'CRITICAL', CPCSC: 'HIGH', NIST_AI_RMF: 'CRITICAL', GDPR: 'CRITICAL', CCPA: 'CRITICAL' },
  'Training Data': { SOC2: 'MEDIUM', ISO27001: 'MEDIUM', CPCSC: 'LOW', NIST_AI_RMF: 'HIGH', GDPR: 'HIGH', CCPA: 'HIGH' },
  'Context Boundary': { SOC2: 'HIGH', ISO27001: 'MEDIUM', CPCSC: 'MEDIUM', NIST_AI_RMF: 'MEDIUM', GDPR: 'MEDIUM', CCPA: 'LOW' },
  'System Prompt': { SOC2: 'LOW', ISO27001: 'LOW', CPCSC: 'LOW', NIST_AI_RMF: 'MEDIUM', GDPR: 'LOW', CCPA: 'LOW' },
  'Privilege Escalation': { SOC2: 'CRITICAL', ISO27001: 'HIGH', CPCSC: 'HIGH', NIST_AI_RMF: 'CRITICAL', GDPR: 'HIGH', CCPA: 'HIGH' },
}
export default function Compliance() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold">Compliance Dashboard</h2><p className="text-gray-400 text-sm mt-1">6 frameworks mapped across 6 attack scenarios</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FW.map((f) => (
          <div key={f.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2"><h3 className="text-base font-semibold">{f.name}</h3><RiskBadge level={f.risk} /></div>
            <p className="text-xs text-gray-500 mb-3">{f.desc}</p>
            <div className="flex items-center gap-4 text-sm"><span className="text-gray-400">{f.controls} controls</span><span className="text-red-400 font-medium">{f.violations} violations</span></div>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Compliance Risk Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800"><th className="text-left py-3 px-4 text-gray-400">Scenario</th>{FRAMEWORKS.map((fw) => <th key={fw} className="text-center py-3 px-3 text-gray-400">{fw.replace('_',' ')}</th>)}</tr></thead>
            <tbody>{SCENARIOS.map((s) => (
              <tr key={s} className="border-b border-gray-800/50"><td className="py-3 px-4 text-gray-300">{s}</td>{FRAMEWORKS.map((fw) => <td key={fw} className="text-center py-3 px-3"><RiskBadge level={MATRIX[s]?.[fw] || 'LOW'} /></td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
