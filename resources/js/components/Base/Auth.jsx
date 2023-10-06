import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Auth() {
    return (
        <section className="bg-light">
            <Container className="d-flex flex-column justify-content-center" style={{minHeight: '100vh'}}>
                <Outlet/>
            </Container>
        </section>
    )
}