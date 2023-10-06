import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/services/router";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";

export default function App() {
    const loading = useSelector(s => s.loading)

    return (
        <section>
            {loading ? <Loader/> : null}
            <RouterProvider router={router} />
        </section>
    )
}