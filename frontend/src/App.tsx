import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { dataServiceInstance } from './services/DataService'
import { StatusComponent } from './components/StatusComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { MessageIcon } from './components/MessageIcon'

function App() {

  const [pods, setPods] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [namespace, setNamespace] = useState("default");
  const [namespaces, setNamespaces] = useState([{ name: "default", labels: [] }]);

  // TODO: Think of better name for function
  const updateNamespaces = (value: string) => {
    dataServiceInstance.setNamespace(value)
    setNamespace(dataServiceInstance.namespace)
  }

  useEffect(() => {
    dataServiceInstance
      .getPods()
      .then(setPods)
  }, [namespace])

  useEffect(() => {
    dataServiceInstance
      .getServices()
      .then(setServices)
  }, [namespace])

  useEffect(() => {
    dataServiceInstance
      .getNamespaces()
      .then(setNamespaces)
  }, [])

  useEffect(() => {
    dataServiceInstance
      .getDeployments()
      .then(setDeployments)
  }, [namespace])

  useEffect(() => {
    dataServiceInstance
      .getEvents()
      .then(setEvents)
  }, [namespace])

  return (
    <div>
      <div className="border-b-2 border-gray-500 border-solid">
        <div className="p-6 container mx-auto px-12">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-5"><h1 className="text-1xl text-white font-bold uppercase">Kubernetes Dashboard</h1></div>
            <div className="col-span-0">
              <select onChange={(e) => updateNamespaces(e.currentTarget.value)} className="w-full text-center rounded-lg float-right">
                {
                  namespaces.map((namespace: any) => {
                    return <option value={namespace.name}>{namespace.name}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-12 py-12 h-full bg-gray-600">
        <HeaderComponent
          text="Deployments"
          icon="StopCircleIcon"
          refresh={() => { dataServiceInstance.getDeployments().then(setDeployments) }}
          count={deployments.length}
        />
        <table className="text-white w-full">
          <thead>
            <tr>
              <th className="text-left">deployment</th>
              <th className="text-left">conditions</th>
            </tr>
          </thead>
          {
            deployments.map((deployment: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2 font-bold">{deployment.name}</td>
                <td className="p-2">
                  {
                    deployment.conditions.map((condition: any) => (
                      <div><span>{condition.message}</span><br /></div>)
                    )
                  }
                </td>
              </tr>
            })
          }
        </table>

        <br />

        <HeaderComponent
          text="Services"
          icon="ArrowDownOnSquareStackIcon"
          refresh={() => { dataServiceInstance.getServices().then(setServices) }}
          count={services.length}
        />
        <p></p>
        <table className="text-white w-full">
          <thead>
            <tr>
              <th className="text-left">name</th>
              <th className="text-left">URL</th>
            </tr>
          </thead>
          {
            services.map((services: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2 font-bold">{services.name}</td>
                <td className="p-2">
                  <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={`http://${services.status}:${services.port}`}>
                    {`http://${services.status}:${services.port}`}
                  </a>
                </td>
              </tr>
            })
          }
        </table>

        <br />

        <HeaderComponent
          text="Pods"
          icon="CubeIcon"
          refresh={() => { dataServiceInstance.getPods().then(setPods) }}
          count={pods.length}
        />
        <table className="text-white table-fixed w-full">
          <thead>
            <th className="text-left">pod</th>
            <th className="text-left">phase</th>
            <th className="text-left">labels</th>
            <th className="text-left">created</th>
          </thead>
          {
            pods.map((pod: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2 font-bold">{pod.name}</td>
                <td className="p-2 font-bold">
                  <StatusComponent status={pod.phase} />
                  {pod.phase}
                </td>
                <td className="p-2">
                  {
                    Object.keys(pod.labels).map((key) => (
                      <div><span>{key}</span><br /></div>)
                    )
                  }
                </td>
                <td className="p-2">
                  <p>{format(pod.created, 'p - PPP')}</p>
                </td>
              </tr>
            })
          }
        </table>

        <br />
        <HeaderComponent
          text="Events"
          icon="Square2StackIcon"
          refresh={() => { dataServiceInstance.getEvents().then(setEvents) }}
          count={events.length}
        />
        <table className="text-white w-full">
          <thead>
            <th className="text-left">name</th>
            <th className="text-left">object</th>
            <th className="text-left">icon</th>
            <th className="text-left">message</th>
          </thead>
          {
            events.map((event: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2">
                  <p>
                    <span className="font-bold">{event.name.split('-')[0]}</span>-
                    <span>{event.name.split('-')[1]}</span>
                  </p>
                  <p>{format(event.timestamp, 'p - PPP')}</p>
                </td>
                <td className="p-2 font-bold">{event.object}</td>
                <td className="p-2 font-bold"><MessageIcon message={event.message} /></td>
                <td className="p-2 font-bold">
                  {event.message}
                </td>
              </tr>
            })
          }
        </table>

      </div>
    </div >
  );
}

export default App;
