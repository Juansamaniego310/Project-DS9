//import '../../style/App.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/auth/Login.jsx";
import Register from "./modules/auth/register.jsx";
import Home from "./modules/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx"; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />, 
    },
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/home", // Ruta de inicio
      element: <Home />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
