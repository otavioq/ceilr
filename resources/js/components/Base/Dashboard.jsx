import React from "react";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Dashboard() {

    return (
        <section className="bg-light" style={{minHeight: '100vh'}}>
            <Navbar/>
            <Container className="pt-5">
                <Outlet/>
            </Container>
        </section>
    )
}