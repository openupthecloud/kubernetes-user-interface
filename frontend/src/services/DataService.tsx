import axios from 'axios';

class DataService {
    namespace: string;

    constructor() {
        this.namespace = "default"
    }

    setNamespace(namespace: string) {
        this.namespace = namespace;
    }

    async getPods() {
        const { data } = await axios.get(`http://localhost:3002/pods/${this.namespace}`)
        return data;
    }

    async getNamespaces() {
        const { data } = await axios.get("http://localhost:3002/namespaces");
        return data;
    }

    async getDeployments() {
        const result = await axios.get(`http://localhost:3002/apis/apps/v1/namespaces/${this.namespace}/deployments`)
        return result.data.response.body.items;
    }

    async getEvents() {
        const { data } = await axios.get(`http://localhost:3002/events/${this.namespace}`)
        return data;
    }

    async getServices() {
        const { data } = await axios.get(`http://localhost:3002/services/${this.namespace}`)
        return data;
    }

    async getNodes() {
        const { data } = await axios.get(`http://localhost:3002/nodes/${this.namespace}`)
        return data;
    }
}

const dataServiceInstance = new DataService();

export { dataServiceInstance }