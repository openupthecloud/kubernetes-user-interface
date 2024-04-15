const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromFile('./config.yml');

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    try {
        const readNamespaceRes = await k8sApi.readNamespace('default');
        console.log('Namespace: ', readNamespaceRes.body);
    } catch (err) {
        console.error('err', err);
    }
};

main();