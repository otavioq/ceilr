import React from "react";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "@/components/Base/Dashboard";
import Auth from "@/components/Base/Auth";
import RequiresAuth from "@/components/Base/RequiresAuth";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";
import RequiresNotAuth from "@/components/Base/RequiresNotAuth";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>,
        children: [
            {
                path: "/",
                element: <RequiresAuth Page={Properties}/>
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth/>,
        children: [
            {
                path: "register",
                element: <RequiresNotAuth Page={Register}/>
            },
            {
                path: "login",
                element: <RequiresNotAuth Page={Login}/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default router;
