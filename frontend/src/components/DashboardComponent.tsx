import { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { dataServiceInstance } from '../services/DataService'
import { TableComponent, TableHeaderComponent, TableRowComponent, TableCellComponent } from '../components/TableComponents'
import { StatusComponent } from '../components/StatusComponent'
import { HeaderComponent } from '../components/HeaderComponent'
import { EmptyComponent } from '../components/EmptyComponent'
import { MessageIcon } from '../components/MessageIcon'

import { Deployment } from '../services/DataService'
import { Pod } from '../services/DataService'
import { Event } from '../services/DataService'
import { Service } from '../services/DataService'

const DashboardComponent = () => {
  const [pods, setPods] = useState<Pod[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dataServiceInstance
      .getPods()
      .then(setPods)
  }, [pods])

  useEffect(() => {
    dataServiceInstance
      .getServices()
      .then(setServices)
  }, [services])

  useEffect(() => {
    dataServiceInstance
      .getDeployments()
      .then(setDeployments)
  }, [deployments])

  useEffect(() => {
    dataServiceInstance
      .getEvents()
      .then(setEvents)
  }, [events])

  return <><HeaderComponent
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
            deployments.map((deployment, index) => {
              return <TableRowComponent index={index}>
                <TableCellComponent bold>{deployment.name}</TableCellComponent>
                <TableCellComponent>
                  {
                    deployment.conditions.map((condition, index: number) => (
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
            services.map((services, index) => {
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
            pods.map((pod, index) => {
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
    <EmptyComponent condition={() => events.length > 0}><TableComponent>
      <TableHeaderComponent headers={[
        "event",
        "object",
        "icon",
        "message"
      ]} />
      <tbody>
        {
          events.map((event, index) => {
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
  </>
}

export { DashboardComponent }

