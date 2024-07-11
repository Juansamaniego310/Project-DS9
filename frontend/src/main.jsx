import React from 'react'
import ReactDOM from 'react-dom/client'
//import Login from './modules/auth/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
//import './index.css'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />, //?? element: <App />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
);
