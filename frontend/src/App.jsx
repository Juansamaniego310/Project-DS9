//import '../../style/App.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/auth/Login.jsx";
import Register from "./modules/auth/register.jsx";
import Home from "./modules/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx"; 
import Profile from "./modules/profile/Profile.jsx";
import Followers from "./modules/followers/Followers.jsx";
import { AuthProvider } from "./modules/auth/authContex.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />, 
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/", // Ruta de inicio
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/follow",
      element: <Followers />
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
