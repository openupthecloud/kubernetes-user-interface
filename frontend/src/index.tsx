import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DashboardComponent } from './components/DashboardComponent';
import { PageHeaderComponent } from './components/PageHeaderComponent'
import { AdminComponent } from './components/AdminComponent'

// TODO: Add wrapping component
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <PageHeaderComponent />
      <div className="container mx-auto px-12 py-12 h-full bg-gray-600">
        <DashboardComponent />
      </div>
    </div >
  },
  {
    path: "/admin",
    element: <div>
      <PageHeaderComponent />
      <div className="container mx-auto px-12 py-12 h-full bg-gray-600">
        <AdminComponent />
      </div>
    </div >
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
