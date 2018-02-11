import * as express from 'express';
import { interfaces, controller, queryParam, response, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';

import { TYPES } from '../types';
import { Website } from '../models/Website';
import { IWebsiteRepository } from '../repositories/website.repository';

@controller('/search')
export class SearchController implements interfaces.Controller {
    constructor(@inject(TYPES.WebsiteRepository) private websiteRepository: IWebsiteRepository) {

    }

    @httpGet('/')
    async index(@queryParam('value') value, @response() res: express.Response) {

        if (!value) {
            res.sendStatus(400);
        } else {
            const websites = await this.websiteRepository.search(value);
            res.status(200).send(websites);
        }
    }
}