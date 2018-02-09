import chai = require('chai');
import chaiHttp = require('chai-http');

import { expect } from 'chai';
import { Given, When, Then, Before, After, World, setWorldConstructor, TableDefinition, CallbackStepDefinition } from 'cucumber';

import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Server } from '../../src/server';
import { Website } from '../../src/models/Website';
import { IConfiguration, IWebsiteRepository } from '../../src/repositories/interfaces';
import { TYPES } from '../../src/types';
import { WebsiteRepository } from '../../src/repositories/website.repository';

chai.use(chaiHttp);

declare module 'cucumber' {
    interface World {
        server: Server;
        actual: {
            statusCode: number;
            websites: Website[]
        }
        convert: (table: TableDefinition) => Website[];
    }
}

setWorldConstructor(({ attach, parameters }) => {
    this.attach = attach;
    this.parameters = parameters;
    const server = new Server();
    server.container
        .rebind<IWebsiteRepository>(TYPES.WebsiteRepository)
        .to(WebsiteRepository)
        .inSingletonScope();
    server.container
        .rebind<IConfiguration>(TYPES.Configuration)
        .toDynamicValue(() => {
            return {
                fileName: ':memory:'
            }
        })
        .inSingletonScope();

    this.server = server;

    this.convert = (table: TableDefinition) => {
        const websites: Website[] = [];
        const rows = table.rows();
        for (let i = 1, l = rows.length; i < l; i++) {
            websites.push({
                url: rows[i][0],
                title: rows[i][1],
                description: rows[i][2]
            });
        }
        return websites;
    }
});

Given('these websites on the web', (table: TableDefinition, done: CallbackStepDefinition) => {
    const world = this as World;
    const websites = world.convert(table);
    const websiteRepository = world.server.container.get<WebsiteRepository>(TYPES.WebsiteRepository);
    (async () => {
        const exists = await websiteRepository.exists();

        if (!exists)
            await websiteRepository.createTable();

        websites.forEach(async (website) => {
            await websiteRepository.add(website);
        });
        done();
    })();
});

When('I search for {string} on Google', (searchValue: string, done: CallbackStepDefinition) => {
    const world = this as World;
    const app = world.server.get().build();
    chai.request(app).get(`/search?value=${searchValue}`).end((err, res) => {
        world.actual = {
            statusCode: res.status,
            websites: res.body as Website[]
        }
        done();
    });
});

Then('results are', (table: TableDefinition) => {
    const world = this as World;
    const websites = world.convert(table);

    expect(world.actual).to.be.deep.equal({
        statusCode: 200,
        websites: websites
    });
});