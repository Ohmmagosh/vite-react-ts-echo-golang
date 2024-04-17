import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { AuthContext } from "./context/AuthContext.tsx";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Home from './pages/home.tsx';
// import Login from './pages/login.tsx';
// import NoPage from './pages/no-page.tsx';
// import Register from './pages/register.tsx';
// import { Toaster } from 'sonner';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "*",
//     element: <NoPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AuthContext.Provider value={{ user, setUser }}> */}
      <App />
    {/* </AuthContext.Provider> */}
  </React.StrictMode>
);
