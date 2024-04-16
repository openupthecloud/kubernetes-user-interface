import axios from 'axios';
import './App.css';
import 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [pods, setPods] = useState([]);
  const [namespaces, setNamespaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/pods")
      .then((data) => {
        setPods(data.data)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:3002/namespaces")
      .then((data) => {
        setNamespaces(data.data)
      })
  }, [])

  return (
    <div className="App container mx-auto px-24 py-24 h-full bg-gray-600">
      <h1 className="text-3xl text-white font-bold uppercase">Kubernetes Dashboard</h1>
      <br />
      <hr />
      <h2 className="text-2xl text-white font-bold uppercase">Pods</h2>
      <table className="text-white table-fixed">
        <thead>
          <th>name</th>
          <th>labels</th>
        </thead>
        {
          pods.map((pod: any) => {
            return <tr>
              <td>{pod.name}</td>
              <td>{pod.labels.toString()}</td>
            </tr>
          })
        }
      </table>
      <h2 className="text-2xl text-white font-bold uppercase">Namespaces</h2>
      <table className="text-white table-fixed">
        <thead>
          <th>name</th>
          <th>labels</th>
        </thead>
        {
          namespaces.map((pod: any) => {
            return <tr>
              <td>{pod.name}</td>
              <td>{pod.labels.toString()}</td>
            </tr>
          })
        }
      </table>
    </div>
  );
}

export default App;
