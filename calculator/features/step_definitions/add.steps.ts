import { expect } from 'chai';
import { Given, When, Then, World, setWorldConstructor } from 'cucumber'
import { Calculator } from '../../src/calculator';

declare module 'cucumber' {
    interface World {
        calculator: Calculator;
        actual: number;
        log(message: string): void;
    }
}

setWorldConstructor(({ attach, parameters }) => {
    this.attach = attach;
    this.parameters = parameters;
    this.log = (message: string): void => console.log(`\n${message}`); //just an example in order to add capabilities in world
});

Given('a calculator', () => {
    const world = this as World;
    world.log('Given a calculator');

    world.calculator = new Calculator();
});

When('I add {int} and {int}', (number1: number, number2: number) => {
    const world = this as World;
    world.log(`When I add ${number1} and ${number2}`);

    world.actual = world.calculator.Add(<number>number1, <number>number2);
});

Then("the result is {int}", (expected: number) => {
    const world = this as World;
    world.log(`Then the result is ${expected}`);

    expect(world.actual).be.equal(expected);
    return;
});
