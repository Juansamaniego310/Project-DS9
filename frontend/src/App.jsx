//import '../../style/App.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/auth/Login.jsx";
import Register from "./modules/auth/register.jsx";
import Home from "./modules/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx"; 
import Profile from "./modules/profile/Profile.jsx";
import Followers from "./modules/followers/Followers.jsx";
import Subscription from "./modules/subscription/Subscription.jsx"
import Posts from "./modules/posts/Posts.jsx";
import { AuthProvider } from "./modules/auth/authContex.jsx";
import { ImOpera } from "react-icons/im";

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
      path: "/home", // Ruta de inicio
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
      path: "/subscription",
      element: <Subscription />
    },
    {
      path: "/posts",
      element: <Posts />
    },
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
