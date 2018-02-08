Feature: Add numbers

  Scenario: Add two numbers
    Given a calculator
    When I add 3 and 5
    Then the result is 8