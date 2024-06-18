import axios from 'axios';

// TODO: These types should be exposed from the backend, not frontend
type Deployment = {
    name: string,
    conditions: DeploymentConditions[]
}

type DeploymentConditions = {
    message: string
}

type Pod = {
    name: string,
    phase: string,
    created: string,
    labels: string[]
}

type Node = {
    timestamp: Date,
    capacity: NodeCapacity
}

type NodeCapacity = {
    cpu: number,
    pods: number
}

type Event = {
    timestamp: Date,
    name: string,
    object: string,
    message: string,
    conditions: DeploymentConditions[]
}

type Service = {
    name: string,
    status: string,
    port: number
}

type Namespace = {
    name: string,
    labels: string[]
}

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

    async getDeployments(): Promise<Deployment[]> {
        const { data } = await axios.get(`http://localhost:3002/deployments/${this.namespace}`)
        return data;
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

export type { Deployment, Pod, Node, Event, Service, Namespace }
export { dataServiceInstance }