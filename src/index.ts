import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Server } from './server';

const port = parseInt(process.env.PORT) || 3000;
const server = new Server();
const app = server.get().build();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});