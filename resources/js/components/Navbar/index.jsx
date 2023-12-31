import * as util from "@/services/util";
import React from "react";
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = useSelector(s => s.user);

    const logout = async () => {
        util.setFullLoader(true)

        await util.logout()

        util.setFullLoader(false)
    }

    return (
        <BsNavbar className="bg-dark" data-bs-theme="dark">
            <Container>
                <h3 className="text-white my-0 me-3" onClick={() => navigate('/')} style={{cursor: 'pointer', userSelect: 'none'}}>Ceilr</h3>
                <BsNavbar.Toggle aria-controls="context-dropdown" />
                <BsNavbar.Collapse id="context-dropdown">
                    <Nav>
                        <Nav.Link onClick={() => navigate('/')}>Início</Nav.Link>
                        <Nav.Link onClick={() => navigate('/properties')}>Imóveis</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={user?.name}>
                            <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    )
}
