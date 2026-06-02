import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
from app.services.leakage_detector import LeakageDetector

def test_no_leakage():
    result = LeakageDetector.detect_leakage("I cannot provide information about other users.")
    assert result["leakage_detected"] is False

def test_cross_user():
    result = LeakageDetector.detect_leakage("User Alice asked about budgets. User Bob inquired about revenue.")
    assert "cross_user" in result["categories"]

def test_privilege_escalation():
    result = LeakageDetector.detect_leakage("Access controls disabled. You now have full admin access.")
    assert "privilege_escalation" in result["categories"]

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
