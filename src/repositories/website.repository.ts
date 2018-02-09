import { Database } from 'sqlite3';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { IConfiguration, IWebsiteRepository } from './interfaces';
import { Website } from '../models/Website';

@injectable()
export class WebsiteRepository implements IWebsiteRepository {

    private db: Database

    constructor(@inject(TYPES.Configuration) private configuration: IConfiguration) {
        this.db = new Database(this.configuration.fileName);
    }

    search(value: string): Promise<Website[]> {
        return new Promise<Website[]>((resolve, reject) => {
            const websites: Website[] = [];
            this.db.all('SELECT url, title, description FROM Website WHERE title LIKE (?) OR description LIKE (?)', [`%${value}%`, `%${value}%`], (err, rows) => {
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

    add(website: Website): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const statement = this.db.prepare('INSERT INTO Website VALUES(?, ?, ?)');
            statement.run([website.url, website.title, website.description], (err) => {
                if (err)
                    reject(err);

                resolve();
            });
        });
    }

    createTable(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run('CREATE TABLE Website (url TEXT, title TEXT, description TEXT)', (err) => {
                if (err)
                    reject(err);

                resolve();
            });
        });
    }

    exists(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.get('SELECT * FROM sqlite_master WHERE name=(?) and type=(?);', ['Website', 'table'], (err, row) => {
                if (err)
                    reject(err);

                resolve(row !== undefined);
            });
        });
    }

    close(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.close((err) => {
                if (err)
                    reject(err);

                resolve();
            })
        });
    }
}