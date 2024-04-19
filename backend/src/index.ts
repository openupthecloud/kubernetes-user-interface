import { Request, Response, NextFunction } from 'express';
import { k8sApi, appsV1Api } from './kubernetes-client'
import express from 'express'

const app = express();
const port = process.env.PORT || 3002;

app.use((_: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/pods/:namespace', async (request: Request, response: Response) => {
    try {
        const namespace = request.params.namespace || "default"
        const readNamespaceRes = await k8sApi.listNamespacedPod(namespace);
        console.log(readNamespaceRes.body.items)
        const result = readNamespaceRes.body.items.map((response: any) => ({
            name: response.metadata.name,
            phase: response.status.phase,
            labels: response.metadata.labels,
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.get('/deployments/:namespace', async (request: Request, response: Response) => {
    try {
        const namespace = request.params.namespace || "default"
        const readNamespaceRes = await appsV1Api.listNamespacedDeployment(namespace);
        const result = readNamespaceRes.body.items.map((response: any) => ({
            name: response.metadata.name,
            conditions: response.status.conditions.map((condition: any) => ({
                message: condition.message
            })),
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.get('/namespaces', async (_: Request, response: Response) => {
    try {
        const readNamespaceRes = await k8sApi.listNamespace("default");
        const result = readNamespaceRes.body.items.map((response: any) => ({
            name: response.metadata.name,
            labels: response.metadata.labels,
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.get('/events/:namespace', async (request: Request, response: Response) => {
    try {
        const namespace = request.params.namespace || "default"
        const readNamespaceRes = await k8sApi.listNamespacedEvent(namespace);
        const result = readNamespaceRes.body.items.map((response: any) => ({
            message: response.message,
            name: response.metadata.name,
            timestamp: response.metadata.creationTimestamp
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.listen(port, function () {
    console.log("Listening on " + port);
});