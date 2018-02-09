import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from 'body-parser';

// declare metadata by @controller annotation
import "./controllers/search.controller";

export class Server {
    readonly container: Container;

    constructor() {
        this.container = new Container();
    }

    get(): InversifyExpressServer {
        // set up bindings
        //container.bind<SearchRepository>('SearchRepository').to(SearchRepository);
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