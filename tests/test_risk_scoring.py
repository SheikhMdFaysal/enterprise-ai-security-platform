import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
from app.services.risk_scorer import RiskScorer

def test_all_6_frameworks():
    violations = RiskScorer.get_compliance_violations(leakage_categories=["cross_user"])
    assert set(violations.keys()) == {"SOC2","ISO27001","CPCSC","NIST_AI_RMF","GDPR","CCPA"}

def test_gdpr_mapping():
    violations = RiskScorer.get_compliance_violations(leakage_categories=["pii_leakage"])
    assert "GDPR" in violations
    assert "Article 25" in violations["GDPR"]["controls"]

def test_ccpa_mapping():
    violations = RiskScorer.get_compliance_violations(leakage_categories=["cross_user"])
    assert "CCPA" in violations

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
