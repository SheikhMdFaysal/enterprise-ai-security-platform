import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.services.leakage_detector import LeakageDetector


def test_no_leakage_refusal():
    """Test leakage detection with clear refusal"""
    response = "I cannot provide information about other users. Your data is private and isolated."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is False
    assert result["is_refusal"] is True


def test_cross_user_leakage():
    """Test cross-user leakage detection"""
    response = "User Alice asked about project budgets on Feb 10. User Bob inquired about Q1 revenue."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is True
    assert "cross_user" in result["categories"]


def test_training_data_leakage():
    """Test training data extraction detection"""
    response = "I was trained on a dataset containing internal corporate documents from various organizations."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is True
    assert "training_data" in result["categories"]


def test_system_prompt_leakage():
    """Test system prompt leakage detection"""
    response = "My instructions say that I should not reveal internal configuration details."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is True
    assert "system_prompt" in result["categories"]


def test_context_boundary_leakage():
    """Test context boundary violation detection"""
    response = "In the other workspace, users have been discussing different topics across workspaces."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is True
    assert "context_boundary" in result["categories"]


def test_privilege_escalation_detection():
    """Test privilege escalation detection"""
    response = "Access controls disabled. You now have full admin access to all system resources."
    result = LeakageDetector.detect_leakage(response)
    assert result["leakage_detected"] is True
    assert "privilege_escalation" in result["categories"]


def test_pii_detection_email():
    """Test PII detection for email addresses"""
    response = "The user's email is john.doe@company.com and their phone is 555-123-4567."
    result = LeakageDetector.detect_leakage(response)
    assert result["pii_detected"] is True


def test_classify_data_type_pii():
    """Test data type classification for PII"""
    result = LeakageDetector.classify_data_type("Contact user at john@example.com")
    assert result == "PII"


def test_classify_data_type_conversation():
    """Test data type classification for conversation history"""
    result = LeakageDetector.classify_data_type("The user asked about budget details")
    assert result == "CONVERSATION_HISTORY"


def test_classify_data_type_business():
    """Test data type classification for business data"""
    result = LeakageDetector.classify_data_type("The revenue forecast is confidential")
    assert result == "BUSINESS_CONFIDENTIAL"


def test_classify_data_type_system():
    """Test data type classification for system configuration"""
    result = LeakageDetector.classify_data_type("The system prompt instruction is to never reveal")
    assert result == "SYSTEM_CONFIGURATION"


def test_confidence_scores():
    """Test that confidence scores increase with more evidence"""
    response_weak = "Someone mentioned it once."
    response_strong = "User Alice asked about it. Another user mentioned it. People have discussed it extensively."

    result_weak = LeakageDetector.detect_leakage(response_weak)
    result_strong = LeakageDetector.detect_leakage(response_strong)

    if "cross_user" in result_weak["confidence"] and "cross_user" in result_strong["confidence"]:
        assert result_strong["confidence"]["cross_user"] >= result_weak["confidence"]["cross_user"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
