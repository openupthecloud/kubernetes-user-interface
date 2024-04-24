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
        const { data } = await axios.get(`http://localhost:3002/deployments/${this.namespace}`)
        return data;
    }

    async getEvents() {
        const { data } = await axios.get(`http://localhost:3002/events/${this.namespace}`)
        // TODO: Reverse on server
        return data.reverse();
    }
}

const dataServiceInstance = new DataService();

export { dataServiceInstance }