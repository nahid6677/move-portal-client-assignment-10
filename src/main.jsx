import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Main from './components/Main.jsx';
import AuthProvider from './components/authprovider/AuthProvider.jsx';
import AddMove from './components/AddMove.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/private-route/PrivateRoute.jsx';
import Forget from './components/Forget.jsx';
import Error from './components/Error.jsx';
// import SignLoding from './components/SignLoding.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/addmovie",
        element: <PrivateRoute><AddMove></AddMove></PrivateRoute>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/forgat",
        element: <Forget></Forget>
      },
      {
        path: "*",
        element: <Error></Error>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
