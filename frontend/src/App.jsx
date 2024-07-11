//import './App.css'
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/auth/Login.jsx";
import Register from "./modules/auth/Register.jsx";
import Home from "./modules/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx"; 

function App() {

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };


  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: (
    //     <ProtectedRoute>
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: "/",
    //       element: <Home />,
    //     }
    //   ],
    // },
    // {
    //   path:"/",
    //   element: <Home />,
    //   errorElement: <ErrorPage />, //Manejo de errores
    // },
    {
      path: "/login",
      element: <Login />, 
    },
    {
      path: "/register",
      element: <Register />,
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
