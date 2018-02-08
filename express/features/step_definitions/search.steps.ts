import { expect } from 'chai';
import { Given, When, Then, World, setWorldConstructor } from 'cucumber';

declare module 'cucumber' {
    interface World {
    }
}

setWorldConstructor(({ attach, parameters }) => {
    this.attach = attach;
    this.parameters = parameters;
});
