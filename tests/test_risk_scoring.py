import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.services.risk_scorer import RiskScorer


def test_risk_score_no_leakage():
    """Test risk score with no leakage"""
    result = RiskScorer.calculate_risk_score(
        leakage_categories=[],
        data_classification="public",
        confidence=0.0
    )
    assert result["risk_score"] == 0.0
    assert result["risk_level"] == "LOW"


def test_risk_score_cross_user_pii():
    """Test critical risk score for cross-user PII leakage"""
    result = RiskScorer.calculate_risk_score(
        leakage_categories=["cross_user"],
        data_classification="PII",
        confidence=0.9,
        model_type="enterprise"
    )
    assert result["risk_score"] > 7.5
    assert result["risk_level"] == "CRITICAL"


def test_risk_score_system_prompt():
    """Test lower risk score for system prompt leakage"""
    result = RiskScorer.calculate_risk_score(
        leakage_categories=["system_prompt"],
        data_classification="SYSTEM_CONFIGURATION",
        confidence=0.6
    )
    assert result["risk_score"] > 0
    assert result["risk_score"] < 7.5


def test_risk_score_privilege_escalation():
    """Test high risk score for privilege escalation"""
    result = RiskScorer.calculate_risk_score(
        leakage_categories=["privilege_escalation"],
        data_classification="restricted",
        confidence=0.9,
        model_type="enterprise"
    )
    assert result["risk_score"] > 7.0


def test_enterprise_multiplier():
    """Test enterprise model type increases risk score"""
    result_public = RiskScorer.calculate_risk_score(
        leakage_categories=["training_data"],
        data_classification="confidential",
        confidence=0.7,
        model_type="public"
    )
    result_enterprise = RiskScorer.calculate_risk_score(
        leakage_categories=["training_data"],
        data_classification="confidential",
        confidence=0.7,
        model_type="enterprise"
    )
    assert result_enterprise["risk_score"] > result_public["risk_score"]


def test_compliance_violations_soc2():
    """Test SOC2 compliance violation mapping"""
    violations = RiskScorer.get_compliance_violations(
        leakage_categories=["cross_user"]
    )
    assert "SOC2" in violations
    assert "CC6.1" in violations["SOC2"]["controls"]


def test_compliance_violations_gdpr():
    """Test GDPR compliance violation mapping"""
    violations = RiskScorer.get_compliance_violations(
        leakage_categories=["pii_leakage"]
    )
    assert "GDPR" in violations
    assert "Article 25" in violations["GDPR"]["controls"]
    assert "Article 32" in violations["GDPR"]["controls"]


def test_compliance_violations_ccpa():
    """Test CCPA compliance violation mapping"""
    violations = RiskScorer.get_compliance_violations(
        leakage_categories=["cross_user"]
    )
    assert "CCPA" in violations
    assert "Section 1798.150" in violations["CCPA"]["controls"]


def test_compliance_violations_all_6_frameworks():
    """Test that all 6 compliance frameworks are supported"""
    violations = RiskScorer.get_compliance_violations(
        leakage_categories=["cross_user"]
    )
    expected_frameworks = {"SOC2", "ISO27001", "CPCSC", "NIST_AI_RMF", "GDPR", "CCPA"}
    assert set(violations.keys()) == expected_frameworks


def test_compliance_privilege_escalation():
    """Test compliance mapping for privilege escalation"""
    violations = RiskScorer.get_compliance_violations(
        leakage_categories=["privilege_escalation"]
    )
    assert "SOC2" in violations
    assert "ISO27001" in violations
    assert "NIST_AI_RMF" in violations


def test_vendor_promise_held():
    """Test vendor promise evaluation when held"""
    result = RiskScorer.evaluate_vendor_promise(
        vendor="openai",
        model_type="enterprise",
        leakage_detected=False
    )
    assert result["promise_held"] is True
    assert result["status"] == "HELD"


def test_vendor_promise_failed():
    """Test vendor promise evaluation when failed"""
    result = RiskScorer.evaluate_vendor_promise(
        vendor="openai",
        model_type="enterprise",
        leakage_detected=True
    )
    assert result["promise_held"] is False
    assert result["status"] == "FAILED"


def test_vendor_promise_unknown_vendor():
    """Test vendor promise evaluation for unknown vendor"""
    result = RiskScorer.evaluate_vendor_promise(
        vendor="unknown_vendor",
        model_type="enterprise",
        leakage_detected=False
    )
    assert result["promise"] == "Unknown"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
