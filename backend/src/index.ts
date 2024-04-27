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
            created: response.metadata.creationTimestamp,
            phase: response.status.phase,
            labels: response.metadata.labels,
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.get('/services/:namespace', async (request: Request, response: Response) => {
    try {
        const namespace = request.params.namespace || "default"
        const readNamespaceRes = await k8sApi.listNamespacedService(namespace);
        console.log(readNamespaceRes.body.items)
        const result = readNamespaceRes.body.items
            .filter((response: any) => response.status.loadBalancer.ingress)
            .map((response: any) => ({
                name: response.metadata.name,
                type: response.spec.type,
                port: response.spec.ports[0].port,
                status: response.status.loadBalancer.ingress[0]?.hostname
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
        console.log(readNamespaceRes.body.items)
        const result = readNamespaceRes.body.items.map((response: any) => ({
            message: response.message,
            object: response.involvedObject.kind,
            name: response.metadata.name,
            timestamp: response.metadata.creationTimestamp
        }))
        // Request array as sorted from API
        response.send(result.sort((a: any, b: any) => b.timestamp - a.timestamp));
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.listen(port, function () {
    console.log("Listening on " + port);
});