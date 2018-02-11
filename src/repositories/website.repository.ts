import { Database } from 'sqlite3';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { Website } from '../models/Website';

export interface IWebsiteRepository {
    search(value: string): Promise<Website[]>;
}

@injectable()
export class WebsiteRepository implements IWebsiteRepository {


    constructor(@inject(TYPES.Database) private database: Database) {
    }

    search(value: string): Promise<Website[]> {
        return new Promise<Website[]>((resolve, reject) => {
            const websites: Website[] = [];
            this.database.all('SELECT url, title, description FROM Website WHERE title LIKE (?) OR description LIKE (?)', [`%${value}%`, `%${value}%`], (err, rows) => {
                if (err)
                    reject(err);

                rows.forEach((row) => {
                    websites.push({
                        description: row.description,
                        title: row.title,
                        url: row.url
                    });
                });
                resolve(websites);
            });
        });
    }
}