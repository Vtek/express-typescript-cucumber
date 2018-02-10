import * as express from 'express';
import { interfaces, controller, queryParam, response, httpGet } from 'inversify-express-utils';
import { IWebsiteRepository } from '../repositories/interfaces';
import { inject } from 'inversify';
import { TYPES } from '../types';

@controller('/search')
export class SearchController implements interfaces.Controller {
    constructor(@inject(TYPES.WebsiteRepository) private websiteRepository: IWebsiteRepository) {

    }

    @httpGet('/')
    async index(@queryParam('value') value, @response() res: express.Response) {
        const websites = await this.websiteRepository.search(value);
        res.status(200).send(websites);
    }
}