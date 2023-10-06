import Btn from "@/components/Btn";
import FormInput from "@/components/FormInput";
import request from "@/services/request";
import * as util from "@/services/util";
import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const navigate = useNavigate()

    const register = async (e) => {
        e?.preventDefault()

        util.setFullLoader(true)

        await util.register(formData)

        util.setFullLoader(false)
    }

    return (
        <Row className="justify-content-center">
            <Col md={5}>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">Cadastro</Card.Title>
                        <Form id="form-register" className="d-flex flex-column gap-2" onSubmit={register}>
                            <Row className="row-gap-3">
                                <Col md={12}>
                                    <FormInput
                                        required
                                        label={"Nome"}
                                        value={formData.name}
                                        onChange={({target}) => setFormData(c => ({...c, name: target.value}))}
                                    />
                                </Col>
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
                                    <FormInput
                                        required
                                        label={"Confirme a senha"}
                                        value={formData.password_confirmation}
                                        onChange={({target}) => setFormData(c => ({...c, password_confirmation: target.value}))}
                                        type={"password"}
                                    />
                                </Col>
                                <Col md={12}>
                                    <Btn className="w-100" type="submit">Cadastrar</Btn>
                                </Col>
                                <Col md={12}>
                                    <Btn onClick={() => navigate('/auth/login', {replace: true})} className="w-100 text-decoration-none" type="button" variant="link">Voltar ao login</Btn>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}