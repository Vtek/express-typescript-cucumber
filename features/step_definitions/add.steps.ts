import { expect } from "chai";
import { defineSupportCode, World } from "cucumber";
import { Calculator } from "../../src/calculator";

defineSupportCode(({ When, Then }) => {

    const context = {
        result: 0
    }

    When("I add {int} and {int}", (number1, number2) => {
        context.result = Calculator.Add(<number>number1, <number>number2);
        return;
    });

    Then("the result is {int}", (result) => {
        const actual = context.result;
        expect(actual).be.equal(result);
        return;
    });
});
