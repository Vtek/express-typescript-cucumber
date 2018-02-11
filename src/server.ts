import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { IWebsiteRepository, WebsiteRepository } from './repositories/website.repository'
import * as bodyParser from 'body-parser';

import './controllers/search.controller';
import { TYPES } from './types';
import { Database } from 'sqlite3';
import { Website } from './models/Website';

export class Server {
    readonly container: Container;

    constructor() {
        this.container = new Container();
        this.container
            .bind<IWebsiteRepository>(TYPES.WebsiteRepository)
            .to(WebsiteRepository);

        this.container
            .bind<Database>(TYPES.Database)
            .toDynamicValue(() => new Database('db.sqlite3'));
    }

    get(): InversifyExpressServer {
        const server = new InversifyExpressServer(this.container);
        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
        });
        return server;
    }
}