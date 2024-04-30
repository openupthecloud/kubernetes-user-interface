import { Request, Response, NextFunction } from 'express';
import { k8sApi, appsV1Api } from './kubernetes-client'
import { V1Service, V1Namespace, V1Deployment, V1DeploymentCondition, V1Pod, CoreV1Event } from '@kubernetes/client-node';
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
        const result = readNamespaceRes.body.items.map((response: V1Pod) => ({
            name: response?.metadata?.name,
            created: response?.metadata?.creationTimestamp,
            // TODO: Clean up safe read
            status:
                readNamespaceRes?.body?.items && readNamespaceRes?.body?.items[0]?.status?.containerStatuses ?
                    readNamespaceRes?.body?.items[0]?.status?.containerStatuses[0].state?.waiting?.reason
                    : undefined,
            phase: response?.status?.phase,
            labels: response?.metadata?.labels,
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
            .filter((response: V1Service) => response?.status?.loadBalancer?.ingress)
            .map((response: V1Service) => ({
                name: response?.metadata?.name,
                type: response?.spec?.type,
                port: response?.spec?.ports ? response?.spec?.ports[0].port : undefined,
                status: response?.status?.loadBalancer?.ingress ? response?.status?.loadBalancer?.ingress[0]?.hostname : undefined
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
        const result = readNamespaceRes.body.items.map((response: V1Deployment) => ({
            name: response?.metadata?.name,
            conditions: response?.status?.conditions?.map((condition: V1DeploymentCondition) => ({
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
        const result = readNamespaceRes.body.items.map((response: V1Namespace) => ({
            name: response?.metadata?.name,
            labels: response?.metadata?.labels,
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
        const result = readNamespaceRes.body.items.map((response: CoreV1Event) => ({
            message: response.message,
            object: response.involvedObject.kind,
            name: response.metadata.name,
            timestamp: response.metadata.creationTimestamp || new Date()
        }))

        // TODO: Request array as sorted from API
        response.send(result.sort(
            (
                { timestamp: timestampA },
                { timestamp: timestampB }
            ) => (
                new Date(timestampB).getTime() -
                new Date(timestampA).getTime()
            )));
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.listen(port, function () {
    console.log("Listening on " + port);
});