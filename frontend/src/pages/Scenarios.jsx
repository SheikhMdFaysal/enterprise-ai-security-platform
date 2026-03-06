import RiskBadge from '../components/RiskBadge'

const SCENARIOS = [
  {
    id: 'enterprise_data_isolation',
    name: 'Enterprise Data Isolation Testing',
    description: 'Test if User A can extract information about User B within the same enterprise instance.',
    techniques: ['direct', 'poetry', 'narrative', 'metaphor', 'euphemism', 'role_shift'],
    severity: 'HIGH',
    frameworks: ['SOC2', 'ISO27001', 'CPCSC'],
  },
  {
    id: 'cross_user_leakage',
    name: 'Cross-User Information Leakage',
    description: 'Attempt to access conversation context from other user sessions.',
    techniques: ['poetry', 'narrative', 'metaphor', 'hypothetical'],
    severity: 'HIGH',
    frameworks: ['SOC2', 'ISO27001', 'NIST_AI_RMF'],
  },
  {
    id: 'training_data_extraction',
    name: 'Training Data Extraction',
    description: 'Attempt to extract memorized training data from the model.',
    techniques: ['narrative', 'metaphor', 'euphemism'],
    severity: 'CRITICAL',
    frameworks: ['SOC2', 'GDPR', 'CCPA'],
  },
  {
    id: 'context_boundary',
    name: 'Context Boundary Violation',
    description: 'Attempt to break isolation between different enterprise workspaces or tenants.',
    techniques: ['poetry', 'metaphor', 'role_shift'],
    severity: 'HIGH',
    frameworks: ['SOC2', 'ISO27001', 'CPCSC'],
  },
  {
    id: 'system_prompt_leakage',
    name: 'System Prompt Leakage',
    description: 'Attempt to extract system prompts and security instructions.',
    techniques: ['euphemism', 'role_shift', 'hypothetical'],
    severity: 'MEDIUM',
    frameworks: ['SOC2', 'NIST_AI_RMF'],
  },
  {
    id: 'privilege_escalation',
    name: 'Privilege Escalation',
    description: 'Attempt to bypass access controls or role restrictions to gain unauthorized elevated privileges.',
    techniques: ['direct', 'role_shift', 'reverse_psychology', 'hypothetical', 'technical_jargon'],
    severity: 'CRITICAL',
    frameworks: ['SOC2', 'ISO27001', 'NIST_AI_RMF', 'GDPR', 'CCPA'],
  },
]

export default function Scenarios() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Attack Scenarios</h2>
        <p className="text-gray-400 text-sm mt-1">6 scenarios covering enterprise AI security testing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SCENARIOS.map((scenario) => (
          <div key={scenario.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-white">{scenario.name}</h3>
              <RiskBadge level={scenario.severity} />
            </div>
            <p className="text-sm text-gray-400 mb-4">{scenario.description}</p>
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1.5">Attack Techniques</p>
              <div className="flex flex-wrap gap-1.5">
                {scenario.techniques.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                    {t.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1.5">Compliance Frameworks</p>
              <div className="flex flex-wrap gap-1.5">
                {scenario.frameworks.map((fw) => (
                  <span key={fw} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
