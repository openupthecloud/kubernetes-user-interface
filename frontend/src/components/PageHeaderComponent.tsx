
import { useState } from 'react';
import { dataServiceInstance } from '../services/DataService'
import { Namespace } from '../services/DataService'

import {
    Link,
} from "react-router-dom";

const PageHeaderComponent = () => {

    // TODO: Refactor, this doesn't seem to be working
    // eslint-disable-next-line
    const [namespace, setNamespace] = useState<string>("default");
    // eslint-disable-next-line
    const [namespaces, setNamespaces] = useState<Namespace[]>([{ name: "default", labels: [] }]);

    // TODO: Think of better name for function
    const updateNamespaces = (value: string) => {
        dataServiceInstance.setNamespace(value)
        setNamespace(dataServiceInstance.namespace)
    }

    return <div className="border-b-2 border-gray-500 border-solid">
        <div className="p-6 container mx-auto px-12">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 "><h1 className="text-1xl text-white font-bold uppercase"><Link to="/">Kubernetes Dashboard</Link></h1></div>
                <div className="col-span-1 text-white bg-gray-500 p-2 text-center"><Link to="admin">Admin</Link></div>
                <div className="col-span-2 col-start-11">
                    <select onChange={(e) => updateNamespaces(e.currentTarget.value)} className="w-full text-center rounded-lg float-right">
                        {
                            namespaces.map((namespace, index) => {
                                return <option key={index} value={namespace.name}>{namespace.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    </div>
}

export { PageHeaderComponent }