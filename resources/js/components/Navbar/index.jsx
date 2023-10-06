import { logout } from "@/services/util";
import React from "react";
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(s => s.user);

    return (
        <BsNavbar className="bg-dark" data-bs-theme="dark">
            <Container>
                <BsNavbar.Brand onClick={() => navigate('/')}>HouseGer</BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Início</Nav.Link>
                        <Nav.Link onClick={() => navigate('/properties')}>Imóveis</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user?.name}>
                            <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}
