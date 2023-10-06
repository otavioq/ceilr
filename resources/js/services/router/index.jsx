import React from "react";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "@/components/Base/Dashboard";
import Auth from "@/components/Base/Auth";
import RequiresAuth from "@/components/Base/RequiresAuth";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>,
        children: [
            {
                path: "/",
                element: <RequiresAuth Page={Home}/>
            },
            {
                path: "properties",
                element: <RequiresAuth Page={Properties}/>
            },
        ]
    },
    {
        path: '/auth',
        element: <Auth/>,
        children: [
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "login",
                element: <Login/>
            },
        ]
    }
]);

export default router;
