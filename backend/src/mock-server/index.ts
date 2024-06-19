import { Request, Response, NextFunction } from 'express';
import express from 'express'

const app = express();
const port = process.env.PORT || 3002;

app.use((_: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const pods = require("./stubs/pods.json");
app.get('/pods/:namespace', async (_: Request, response: Response) => response.json(pods));

const services = require("./stubs/services.json");
app.get('/services/:namespace', async (_: Request, response: Response) => response.json(services));

const nodes = require('./stubs/nodes.json');
app.get('/nodes/:namespace', async (_: Request, response: Response) => response.json(nodes));

const deployments = require('./stubs/deployments.json');
app.get('/deployments/:namespace', async (_: Request, response: Response) => response.json(deployments));

const namespaces = require('./stubs/namespaces.json');
app.get('/namespaces', async (_: Request, response: Response) => response.json(namespaces));

const events = require('./stubs/events.json');
app.get('/events/:namespace', async (_: Request, response: Response) => response.json(events));

app.listen(port, function () {
    console.log("Listening on " + port);
});