import { expect } from "chai";
import { Given, When, Then } from 'cucumber'
import { Calculator } from "../../src/calculator";

const context = {
    calculator: null,
    result: 0
};

Given("a calculator", () => {
    context.calculator = new Calculator();
    return;
});

When("I add {int} and {int}", (number1, number2) => {
    const calculator = context.calculator as Calculator;
    context.result = calculator.Add(<number>number1, <number>number2);
    return;
});

Then("the result is {int}", (result) => {
    const actual = context.result;
    expect(actual).be.equal(result);
    return;
});
