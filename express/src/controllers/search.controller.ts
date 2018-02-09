import * as express from 'express';
import { interfaces, controller, queryParam, response, httpGet } from "inversify-express-utils";

@controller('/search')
export class SearchController implements interfaces.Controller {
    constructor() {

    }

    @httpGet('/')
    index(@queryParam('value') value, @response() res: express.Response) {
        res.status(200).send([]);
    }
}