import { setWorldConstructor, TableDefinition, World } from 'cucumber';
import { Database } from 'sqlite3';

import { Server } from '../../../src/server';
import { Website } from '../../../src/models/Website';
import { TYPES } from '../../../src/types';

declare module 'cucumber' {
    interface World {
        readonly server: Server;
        actual: {
            statusCode: number;
            websites: Website[]
        }
        convert: (table: TableDefinition) => Website[];
        add: (website: Website) => Promise<void>;
    }
}

export class SearchWorld implements World {
    readonly server: Server;
    actual: {
        statusCode: number;
        websites: Website[];
    };

    constructor() {
        this.server = new Server();
        this.server.container
            .rebind<Database>(TYPES.Database)
            .toDynamicValue(() => new Database(':memory:'))
            .inSingletonScope();

    }

    convert(table: TableDefinition): Website[] {
        const websites: Website[] = [];
        const rows = table.rows();
        for (let i = 0, l = rows.length; i < l; i++) {
            websites.push({
                url: rows[i][0],
                title: rows[i][1],
                description: rows[i][2]
            });
        }
        return websites;
    }
    add(website: Website): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const database = this.server.container.get<Database>(TYPES.Database);
            database.serialize(() => {
                const statement = database.prepare('INSERT INTO Website VALUES(?, ?, ?)');
                statement.run([website.url, website.title, website.description], (err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    statement.finalize();
                    resolve();
                });
            });
        });
    }
}

setWorldConstructor(SearchWorld);