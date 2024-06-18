import { KubeConfig, CoreV1Api, AppsV1Api } from '@kubernetes/client-node';

// TODO: Don't hardcode kubeconfig
const kc = new KubeConfig();
kc.loadFromFile('./config.yml');

const k8sApi = kc.makeApiClient(CoreV1Api);
const appsV1Api = kc.makeApiClient(AppsV1Api);

export { k8sApi, appsV1Api }