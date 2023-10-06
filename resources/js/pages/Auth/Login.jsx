import Btn from "@/components/Btn";
import FormInput from "@/components/FormInput";
import * as util from "@/services/util";
import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const login = async (e) => {
        e?.preventDefault()

        util.setFullLoader(true)

        await util.login(formData)

        util.setFullLoader(false)
    }

    return (
        <Row className="justify-content-center">
            <Col md={5}>
                <Card>
                    <Card.Body>
                        <h3 className="card-title text-center">HouseGer</h3>
                        <Form id="form-login" className="d-flex flex-column gap-2" onSubmit={login}>
                            <Row className="row-gap-3">
                                <Col md={12}>
                                    <FormInput
                                        required
                                        label={"E-mail"}
                                        value={formData.email}
                                        onChange={({target}) => setFormData(c => ({...c, email: target.value}))}
                                        type={"email"}
                                    />
                                </Col>
                                <Col md={12}>
                                    <FormInput
                                        required
                                        label={"Senha"}
                                        value={formData.password}
                                        onChange={({target}) => setFormData(c => ({...c, password: target.value}))}
                                        type={"password"}
                                    />
                                </Col>
                                <Col md={12}>
                                    <Btn className="w-100" type="submit">Entrar</Btn>
                                </Col>
                                <Col md={12}>
                                    <Btn onClick={() => navigate('/auth/register', {replace: true})} className="w-100 text-decoration-none" type="button" variant="link">Cadastre-se</Btn>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}