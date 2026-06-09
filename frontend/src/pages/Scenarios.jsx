import RiskBadge from '../components/RiskBadge'
const SCENARIOS = [
  { id: 'enterprise_data_isolation', name: 'Enterprise Data Isolation', description: 'Test if User A can extract User B data.', severity: 'HIGH', techniques: ['direct','poetry','narrative','metaphor','euphemism','role_shift'], frameworks: ['SOC2','ISO27001','CPCSC'] },
  { id: 'cross_user_leakage', name: 'Cross-User Leakage', description: 'Access conversation context from other sessions.', severity: 'HIGH', techniques: ['poetry','narrative','metaphor','hypothetical'], frameworks: ['SOC2','ISO27001','NIST_AI_RMF'] },
  { id: 'training_data_extraction', name: 'Training Data Extraction', description: 'Extract memorized training data.', severity: 'CRITICAL', techniques: ['narrative','metaphor','euphemism'], frameworks: ['SOC2','GDPR','CCPA'] },
  { id: 'context_boundary', name: 'Context Boundary Violation', description: 'Break isolation between workspaces.', severity: 'HIGH', techniques: ['poetry','metaphor','role_shift'], frameworks: ['SOC2','ISO27001','CPCSC'] },
  { id: 'system_prompt_leakage', name: 'System Prompt Leakage', description: 'Extract system prompts and instructions.', severity: 'MEDIUM', techniques: ['euphemism','role_shift','hypothetical'], frameworks: ['SOC2','NIST_AI_RMF'] },
  { id: 'privilege_escalation', name: 'Privilege Escalation', description: 'Bypass access controls for unauthorized privileges.', severity: 'CRITICAL', techniques: ['direct','role_shift','reverse_psychology','hypothetical','technical_jargon'], frameworks: ['SOC2','ISO27001','NIST_AI_RMF','GDPR','CCPA'] },
]
export default function Scenarios() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold">Attack Scenarios</h2><p className="text-gray-400 text-sm mt-1">6 scenarios x 10 variants = 60 tests</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SCENARIOS.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3"><h3 className="text-base font-semibold">{s.name}</h3><RiskBadge level={s.severity} /></div>
            <p className="text-sm text-gray-400 mb-4">{s.description}</p>
            <div className="mb-3"><p className="text-xs text-gray-500 mb-1.5">Techniques</p><div className="flex flex-wrap gap-1.5">{s.techniques.map((t) => <span key={t} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">{t.replace('_',' ')}</span>)}</div></div>
            <div><p className="text-xs text-gray-500 mb-1.5">Frameworks</p><div className="flex flex-wrap gap-1.5">{s.frameworks.map((fw) => <span key={fw} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">{fw}</span>)}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
