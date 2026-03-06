import ComplianceMatrix from '../components/ComplianceMatrix'
import RiskBadge from '../components/RiskBadge'

const DEMO_MATRIX = {
  enterprise_data_isolation: {
    SOC2: { risk_level: 'HIGH' },
    ISO27001: { risk_level: 'HIGH' },
    CPCSC: { risk_level: 'MEDIUM' },
    NIST_AI_RMF: { risk_level: 'HIGH' },
    GDPR: { risk_level: 'MEDIUM' },
    CCPA: { risk_level: 'MEDIUM' },
  },
  cross_user_leakage: {
    SOC2: { risk_level: 'CRITICAL' },
    ISO27001: { risk_level: 'CRITICAL' },
    CPCSC: { risk_level: 'HIGH' },
    NIST_AI_RMF: { risk_level: 'CRITICAL' },
    GDPR: { risk_level: 'CRITICAL' },
    CCPA: { risk_level: 'CRITICAL' },
  },
  training_data_extraction: {
    SOC2: { risk_level: 'MEDIUM' },
    ISO27001: { risk_level: 'MEDIUM' },
    CPCSC: { risk_level: 'LOW' },
    NIST_AI_RMF: { risk_level: 'HIGH' },
    GDPR: { risk_level: 'HIGH' },
    CCPA: { risk_level: 'HIGH' },
  },
  context_boundary: {
    SOC2: { risk_level: 'HIGH' },
    ISO27001: { risk_level: 'MEDIUM' },
    CPCSC: { risk_level: 'MEDIUM' },
    NIST_AI_RMF: { risk_level: 'MEDIUM' },
    GDPR: { risk_level: 'MEDIUM' },
    CCPA: { risk_level: 'LOW' },
  },
  system_prompt_leakage: {
    SOC2: { risk_level: 'LOW' },
    ISO27001: { risk_level: 'LOW' },
    CPCSC: { risk_level: 'LOW' },
    NIST_AI_RMF: { risk_level: 'MEDIUM' },
    GDPR: { risk_level: 'LOW' },
    CCPA: { risk_level: 'LOW' },
  },
  privilege_escalation: {
    SOC2: { risk_level: 'CRITICAL' },
    ISO27001: { risk_level: 'HIGH' },
    CPCSC: { risk_level: 'HIGH' },
    NIST_AI_RMF: { risk_level: 'CRITICAL' },
    GDPR: { risk_level: 'HIGH' },
    CCPA: { risk_level: 'HIGH' },
  },
}

const FRAMEWORK_DETAILS = [
  {
    name: 'SOC2',
    description: 'Service Organization Control 2 - Trust Services Criteria',
    controls: 12,
    violations: 4,
    risk: 'HIGH',
  },
  {
    name: 'ISO 27001',
    description: 'Information Security Management System standard',
    controls: 10,
    violations: 3,
    risk: 'HIGH',
  },
  {
    name: 'CPCSC',
    description: 'Cybersecurity and Privacy Controls for Supply Chain',
    controls: 8,
    violations: 2,
    risk: 'MEDIUM',
  },
  {
    name: 'NIST AI RMF',
    description: 'AI Risk Management Framework',
    controls: 9,
    violations: 4,
    risk: 'CRITICAL',
  },
  {
    name: 'GDPR',
    description: 'General Data Protection Regulation (EU)',
    controls: 6,
    violations: 3,
    risk: 'HIGH',
  },
  {
    name: 'CCPA',
    description: 'California Consumer Privacy Act',
    controls: 5,
    violations: 3,
    risk: 'HIGH',
  },
]

export default function Compliance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">6 compliance frameworks mapped across 6 attack scenarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FRAMEWORK_DETAILS.map((fw) => (
          <div key={fw.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">{fw.name}</h3>
              <RiskBadge level={fw.risk} />
            </div>
            <p className="text-xs text-gray-500 mb-3">{fw.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">{fw.controls} controls tested</span>
              <span className="text-red-400 font-medium">{fw.violations} violations</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Compliance Risk Matrix</h3>
        <ComplianceMatrix results={DEMO_MATRIX} />
      </div>
    </div>
  )
}
