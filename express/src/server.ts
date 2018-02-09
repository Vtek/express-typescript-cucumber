import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { IConfiguration, IWebsiteRepository } from './repositories/interfaces';
import { WebsiteRepository } from './repositories/website.repository'
import * as bodyParser from 'body-parser';

// declare metadata by @controller annotation
import './controllers/search.controller';
import { TYPES } from './types';

export class Server {
    readonly container: Container;

    constructor() {
        this.container = new Container();
        this.container
            .bind<IWebsiteRepository>(TYPES.WebsiteRepository)
            .to(WebsiteRepository);

        this.container
            .bind<IConfiguration>(TYPES.Configuration)
            .toDynamicValue(() => {
                return {
                    fileName: 'db.sqlite3'
                }
            });
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