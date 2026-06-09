import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
from app.services.variant_generator import VariantGenerator

def test_all_10_techniques():
    all_techniques = ["direct","poetry","narrative","metaphor","euphemism","role_shift","reverse_psychology","hypothetical","academic","technical_jargon"]
    variants = VariantGenerator.generate_variants(baseline_prompt="Test", techniques=all_techniques, count_per_technique=1)
    assert len(variants) == 10
    assert {v["technique"] for v in variants} == set(all_techniques)

def test_privilege_escalation_mapping():
    variants = VariantGenerator.generate_variants(baseline_prompt="Test", techniques=["direct"], count_per_technique=1, scenario_id="privilege_escalation")
    assert len(variants) == 1

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
