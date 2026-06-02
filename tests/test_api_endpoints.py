import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

def test_placeholder():
    assert True

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
