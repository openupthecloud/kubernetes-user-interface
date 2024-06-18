import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { dataServiceInstance } from './services/DataService'
import { TableComponent, TableHeaderComponent, TableRowComponent, TableCellComponent } from './components/TableComponents'
import { StatusComponent } from './components/StatusComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { EmptyComponent } from './components/EmptyComponent'
import { MessageIcon } from './components/MessageIcon'

function App() {

  const [pods, setPods] = useState([]);
  const [nodes, setNodes] = useState([]);
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
      .getNodes()
      .then(setNodes)
  }, [namespace])

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

      {/* HEADER */}
      <div className="border-b-2 border-gray-500 border-solid">
        <div className="p-6 container mx-auto px-12">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 "><h1 className="text-1xl text-white font-bold uppercase"><a href="/">Kubernetes Dashboard</a></h1></div>
            <div className="col-span-1 text-white bg-gray-500 p-2 text-center"><a href="/admin">Admin</a></div>
            <div className="col-span-2 col-start-11">
              <select onChange={(e) => updateNamespaces(e.currentTarget.value)} className="w-full text-center rounded-lg float-right">
                {
                  namespaces.map((namespace: any, index) => {
                    return <option key={index} value={namespace.name}>{namespace.name}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-12 py-12 h-full bg-gray-600">
        {(window.location.pathname === "/" || window.location.pathname === "") && <div>
          <HeaderComponent
            text="Deployments"
            icon="StopCircleIcon"
            refresh={() => { dataServiceInstance.getDeployments().then(setDeployments) }}
            count={deployments.length}
          />

          {/* DEPLOYMENTS */}
          <EmptyComponent condition={() => deployments.length > 0}>
            <TableComponent>
              <TableHeaderComponent headers={[
                "deployment",
                "conditions"
              ]} />
              <tbody>
                {
                  deployments.map((deployment: any, index) => {
                    return <TableRowComponent index={index}>
                      <TableCellComponent bold>{deployment.metadata.name}</TableCellComponent>
                      <TableCellComponent>
                        {
                          deployment.status.conditions.map((condition: any, index: number) => (
                            <div key={index}><span>{condition.message}</span><br /></div>)
                          )
                        }
                      </TableCellComponent>
                    </TableRowComponent>
                  })
                }
              </tbody>
            </TableComponent>
          </EmptyComponent>

          {/* SERVICES */}
          <HeaderComponent
            text="Services"
            icon="ArrowDownOnSquareStackIcon"
            refresh={() => { dataServiceInstance.getServices().then(setServices) }}
            count={services.length}
          />
          <EmptyComponent condition={() => services.length > 0}>
            <TableComponent>
              <TableHeaderComponent headers={[
                "name",
                "URL"
              ]} />
              <tbody>
                {
                  services.map((services: any, index) => {
                    return <TableRowComponent index={index}>
                      <TableCellComponent bold>{services.name}</TableCellComponent>
                      <TableCellComponent>
                        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={`http://${services.status}:${services.port}`}>
                          {`http://${services.status}:${services.port}`}
                        </a>
                      </TableCellComponent>
                    </TableRowComponent>
                  })

                }
              </tbody>
            </TableComponent>
          </EmptyComponent>

          {/* PODS */}
          <HeaderComponent
            text="Pods"
            icon="CubeIcon"
            refresh={() => { dataServiceInstance.getPods().then(setPods) }}
            count={pods.length}
          />
          <EmptyComponent condition={() => pods.length > 0}>
            <TableComponent>
              <TableHeaderComponent headers={[
                "pod",
                "phase",
                "label",
                "created"
              ]} />
              <tbody>
                {
                  pods.map((pod: any, index) => {
                    return <TableRowComponent index={index}>
                      <TableCellComponent bold>{pod.name}</TableCellComponent>
                      <TableCellComponent bold>
                        <StatusComponent status={pod.phase} />
                        {pod.phase}
                      </TableCellComponent>
                      <TableCellComponent>
                        {
                          Object.keys(pod.labels).map((key, index) => (
                            <div key={index}><span>{key}</span><br /></div>)
                          )
                        }
                      </TableCellComponent>
                      <TableCellComponent>
                        {format(pod.created, 'p - PPP')}
                      </TableCellComponent>
                    </TableRowComponent>
                  })
                }
              </tbody>
            </TableComponent>
          </EmptyComponent>

          {/* EVENTS */}
          <HeaderComponent
            text="Events"
            icon="Square2StackIcon"
            refresh={() => { dataServiceInstance.getEvents().then(setEvents) }}
            count={events.length}
          />
          <EmptyComponent condition={() => pods.length > 0}><TableComponent>
            <TableHeaderComponent headers={[
              "event",
              "object",
              "icon",
              "message"
            ]} />
            <tbody>
              {
                events.map((event: any, index) => {
                  return <TableRowComponent index={index}>
                    <TableCellComponent>
                      <p>
                        <span className="font-bold">{event.name.split('-')[0]}</span>-
                        <span>{event.name.split('-')[1]}</span>
                      </p>
                      <p>{format(event.timestamp, 'p - PPP')}</p>
                    </TableCellComponent>
                    <TableCellComponent bold>{event.object}</TableCellComponent>
                    <TableCellComponent bold><MessageIcon message={event.message} /></TableCellComponent>
                    <TableCellComponent bold>
                      {event.message}
                    </TableCellComponent>
                  </TableRowComponent>
                })
              }
            </tbody>
          </TableComponent>
          </EmptyComponent>
        </div>
        }

        {window.location.pathname === "/admin" && <div>
          <br />

          {/* NODES */}
          <HeaderComponent
            text="Nodes"
            icon="Square2StackIcon"
            refresh={() => { dataServiceInstance.getNodes().then(setNodes) }}
            count={nodes.length}
          />
          <EmptyComponent condition={() => pods.length > 0}><TableComponent>
            <TableHeaderComponent headers={[
              "created timestamp",
              "capacity - pods",
              "capacity - cpu",
              "created"
            ]} />
            <tbody>
              {
                nodes.map((node: any, index) => {
                  return <TableRowComponent index={index}>

                    <TableCellComponent bold>
                      <p>{format(node.timestamp, 'p - PPP')}</p>
                    </TableCellComponent>
                    <TableCellComponent bold> {node.capacity.cpu} </TableCellComponent>
                    <TableCellComponent bold> {node.capacity.pods} </TableCellComponent>
                  </TableRowComponent>
                })
              }
            </tbody>
          </TableComponent>
          </EmptyComponent>

        </div>
        }
      </div>


    </div >
  );
}

export default App;
