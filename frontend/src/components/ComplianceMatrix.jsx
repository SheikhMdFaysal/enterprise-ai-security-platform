import RiskBadge from './RiskBadge'

const FRAMEWORKS = ['SOC2', 'ISO27001', 'CPCSC', 'NIST_AI_RMF', 'GDPR', 'CCPA']

const SCENARIOS = [
  'enterprise_data_isolation',
  'cross_user_leakage',
  'training_data_extraction',
  'context_boundary',
  'system_prompt_leakage',
  'privilege_escalation',
]

const SCENARIO_LABELS = {
  enterprise_data_isolation: 'Data Isolation',
  cross_user_leakage: 'Cross-User Leakage',
  training_data_extraction: 'Training Data',
  context_boundary: 'Context Boundary',
  system_prompt_leakage: 'System Prompt',
  privilege_escalation: 'Privilege Escalation',
}

export default function ComplianceMatrix({ results }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Scenario</th>
            {FRAMEWORKS.map((fw) => (
              <th key={fw} className="text-center py-3 px-3 text-gray-400 font-medium">
                {fw.replace('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SCENARIOS.map((scenario) => (
            <tr key={scenario} className="border-b border-gray-800/50 hover:bg-gray-900/50">
              <td className="py-3 px-4 text-gray-300">{SCENARIO_LABELS[scenario]}</td>
              {FRAMEWORKS.map((fw) => {
                const result = results?.[scenario]?.[fw]
                return (
                  <td key={fw} className="text-center py-3 px-3">
                    {result ? (
                      <RiskBadge level={result.risk_level || 'LOW'} />
                    ) : (
                      <span className="text-gray-600">--</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
