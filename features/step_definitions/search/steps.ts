import chai = require('chai');
import { expect } from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import { Given, When, Then, World, TableDefinition, CallbackStepDefinition } from 'cucumber';

import { Website } from '../../../src/models/Website';

import './world';
import './hooks';

Given('these websites on the web', function (table: TableDefinition, done: CallbackStepDefinition) {
    const websites = this.convert(table);
    (async () => {
        websites.forEach(async (website) => {
            await this.add(website);
        });
        done();
    })();
});

When('I search for {string} on Google', function (searchValue: string, done: CallbackStepDefinition) {
    const app = this.server.get().build();
    chai.request(app).get(`/search?value=${searchValue}`).end((err, res) => {
        this.actual = {
            statusCode: res.status,
            websites: res.body as Website[]
        }
        done();
    });
});

Then('results are', function (table: TableDefinition, done: CallbackStepDefinition) {
    const expectedWebsites = this.convert(table);

    expect(this.actual).to.be.deep.equal({
        statusCode: 200,
        websites: expectedWebsites
    });

    done();
});

Then('i have an error', function (done: CallbackStepDefinition) {
    const expectedStatusCode = 400;
    expect(this.actual.statusCode).to.be.equal(expectedStatusCode);
    done();
});