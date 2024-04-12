## back_test
# File containing all the tests for the back-end of B4UAgree using pytest
## TO ADD NEW TEST:
# if adding tests for new module, import that module in the IMPORTS section
# if adding tests for new function, create a class starting with Test
# if adding test to existing class, add new def starting with test_
# if a test suite is not yet stable, keep in WIP TESTS, maintain COMPLETE TESTS as fully functional


## SECTION: IMPORTS

import pytest

# import privacysummarizer


## SECTION: SAMPLE TEST SUITE
def useless():
    raise SystemExit(1)

class TestSample:
    def test_1(self):
        assert 3 + 1 == 4

    def test_2(self):
        with pytest.raises(SystemExit):
            useless()

    def test_3(self):
        x = "this"
        assert "h" in x

## SECTION: COMPLETED TESTS

## SECTION: WIP TESTS

# tests for the get_Summary procedure in privacysummarizer.py
#class TestSummarizer:
#    #get text
#    f_g=open(testtexts/grinell_privacy.txt,'r')
#    rawText_grinnell=f_g.read()
#    summTest_grinnell=privacysummarizer.get_Summary(rawText_grinnell,4)
#
#    def test_match(self):
#        s_g=open(testtexts/grinnell_privacy_summ.txt, 'txt')
#        rawText_grinnellSumm=s_g.read()
#        assert summTest_grinnell == rawText_grinnellSumm
