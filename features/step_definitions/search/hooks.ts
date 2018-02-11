import { Before, HookScenarioResult, CallbackStepDefinition } from 'cucumber';
import { Database } from 'sqlite3';
import { TYPES } from '../../../src/types';

Before(function (scenario: HookScenarioResult, done: CallbackStepDefinition) {
    const database = this.server.container.get<Database>(TYPES.Database);
    database.serialize(() => {
        database.run('CREATE TABLE Website (url TEXT, title TEXT, description TEXT)', (err) => {
            done();
        });
    });
});
