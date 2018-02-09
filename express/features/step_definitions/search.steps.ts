import { expect } from 'chai';
import { Given, When, Then, World, setWorldConstructor, TableDefinition } from 'cucumber';

declare module 'cucumber' {
    interface World {
    }
}

setWorldConstructor(({ attach, parameters }) => {
    this.attach = attach;
    this.parameters = parameters;
});

Given('these websites on the web', (table: TableDefinition) => {
    throw new Error('Not implemented');
});

When('I search for {string} on Google', (searchValue: string) => {
    throw new Error('Not implemented');
});

Then('results are', (table: TableDefinition) => {
    throw new Error('Not implemented');
});