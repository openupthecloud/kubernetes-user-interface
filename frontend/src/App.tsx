import axios from 'axios';
import 'axios';
import { useState, useEffect } from 'react';
import { Square2StackIcon } from '@heroicons/react/24/solid'
import { StopCircleIcon } from '@heroicons/react/24/solid'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


function App() {

  const [pods, setPods] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [events, setEvents] = useState([]);
  const [namespace, setNamespace] = useState("default");
  const [namespaces, setNamespaces] = useState([{ name: "default", labels: [] }]);

  useEffect(() => {
    axios.get(`http://localhost:3002/pods/${namespace}`)
      .then((data) => {
        setPods(data.data)
      })
  }, [namespace])

  useEffect(() => {
    axios.get("http://localhost:3002/namespaces")
      .then((data) => {
        setNamespaces(data.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3002/deployments/${namespace}`)
      .then((data) => {
        setDeployments(data.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3002/events/${namespace}`)
      .then((data) => {
        // TODO: Reverse on server
        setEvents(data.data.reverse())
      })
  }, [namespace])

  return (
    <div>
      <div className="p-4 container mx-auto px-24">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-5"><h1 className="text-1xl text-white font-bold uppercase">Kubernetes Dashboard</h1></div>
          <div>
            <select onChange={(e) => setNamespace(e.currentTarget.value)} className="w-full text-center rounded-lg float-right">
              {
                namespaces.map((namespace: any) => {
                  return <option value={namespace.name}>{namespace.name}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-36 py-24 h-full bg-gray-600">

        <h2 className="text-2xl text-white font-bold bg-gray-700 p-2 mb-4">
          <StopCircleIcon className="h-8 w-8 inline pr-2" />
          Deployments ({deployments.length || 0})
        </h2>
        <table className="text-white table-fixed w-full">
          <thead>
            <th className="text-left">deployment</th>
            <th className="text-left">conditions</th>
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

        <h2 className="text-2xl text-white font-bold bg-gray-700 p-2 mb-4">
          <StopCircleIcon className="h-8 w-8 inline pr-2" />
          Pods ({pods.length || 0})
        </h2>
        <table className="text-white table-fixed w-full">
          <thead>
            <th className="text-left">pod</th>
            <th className="text-left">phase</th>
            <th className="text-left">labels</th>
          </thead>
          {
            pods.map((pod: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2 font-bold">{pod.name}</td>
                <td className="p-2 font-bold">{pod.phase}</td>
                <td className="p-2">
                  {
                    Object.keys(pod.labels).map((key) => (
                      <div><span>{key}</span><br /></div>)
                    )
                  }
                </td>
              </tr>
            })
          }
        </table>

        <br />

        <h2 className="text-2xl text-white font-bold bg-gray-700 p-2 mb-4">
          <Square2StackIcon className="h-8 w-8 inline pr-2" />
          Events ({events.length || 0})
        </h2>
        <table className="text-white table-fixed w-full">
          <thead>
            <th className="text-left">name</th>
            <th className="text-left">message</th>
            <th className="text-left">timestamp</th>
          </thead>
          {
            events.map((event: any) => {
              return <tr className="border-2 border-slate-700">
                <td className="p-2 font-bold">{event.name}</td>
                <td className="p-2 font-bold">{event.message}</td>
                <td className="p-2 font-bold">{format(event.timestamp, 'p - PPP')}
                </td>
              </tr>
            })
          }
        </table>

      </div>
    </div>
  );
}

export default App;
