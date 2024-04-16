const express = require("express");
const app = express();
const port = process.env.PORT || 3002;

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromFile('./config.yml');
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get('/pods', async (_, response) => {
    try {
        const readNamespaceRes = await k8sApi.listNamespacedPod("default");
        console.log('Namespace: ', readNamespaceRes.body);
        const result = readNamespaceRes.body.items.map(({ metadata }) => ({
            name: metadata.name,
            labels: metadata.labels,
        }))
        response.send(result);
    } catch (err) {
        console.error('err', err);
        response.send("failure");
    }
});

app.get('/namespaces', async (_, response) => {
    try {
        const readNamespaceRes = await k8sApi.listNamespace("default");
        console.log('Namespace: ', readNamespaceRes.body);
        const result = readNamespaceRes.body.items.map(({ metadata }) => ({
            name: metadata.name,
            labels: metadata.labels,
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