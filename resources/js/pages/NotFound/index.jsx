import Btn from "@/components/Btn";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column gap-3 align-items-center justify-content-center w-100" style={{minHeight: '100vh'}}>
            <h1 className="display-1">404</h1>
            <h4>Página não encontrada</h4>
            <Btn onClick={() => navigate('/', {replace: true})}>Voltar oa início</Btn>
        </Container>
    );
}