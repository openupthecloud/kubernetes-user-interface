// https://kubernetes.io/docs/reference/kubernetes-api
// https://github.com/kubernetes-client/javascript
// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/
// https://kubernetes-client.github.io/javascript/classes/V1ServiceList.html

import { KubeConfig, CoreV1Api, AppsV1Api } from '@kubernetes/client-node';

// TODO: Don't hardcode kubeconfig
const kc = new KubeConfig();
kc.loadFromFile('./config.yml');

const k8sApi = kc.makeApiClient(CoreV1Api);
const appsV1Api = kc.makeApiClient(AppsV1Api);

export { k8sApi, appsV1Api }