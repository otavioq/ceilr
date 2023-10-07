import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import Btn from "@/components/Btn";
import FormInput from "@/components/FormInput";
import Select from "@/components/Select";

export default function PropertyModal({property, types, isOpen, onHide, onSave, onChangeField}) {

    const RenderTypes = () => {
        const options = [];

        for (const type in types) {
            options.push(
                <option key={type} value={type}>{types[type]}</option>
            );
        }

        return options;
    }

    return (
        <Modal centered size="lg" show={isOpen} onHide={() => onHide && onHide()}>
            <Modal.Header closeButton>
                <Modal.Title>{property.id ? 'Editar' : 'Novo'} imóvel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    id="form-property"
                    onSubmit={e => {
                        e.preventDefault()
                        onSave && onSave()
                    }}
                >
                    <Row className="row-gap-3">
                        <Col md={'3'}>
                            <Select
                                required
                                label="Tipo"
                                value={property.type}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'type')}
                            >
                                <RenderTypes/>
                            </Select>
                        </Col>
                        <Col md={'3'}>
                            <FormInput
                                required
                                label="Preço"
                                value={property.price}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'price')}
                                currency
                            />
                        </Col>
                        <Col md={'6'}>
                            <FormInput
                                required
                                label="Estado"
                                value={property.state}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'state')}
                            />
                        </Col>
                        <Col md={'6'}>
                            <FormInput
                                required
                                label="Cidade"
                                value={property.city}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'city')}
                            />
                        </Col>
                        <Col md={'6'}>
                            <FormInput
                                required
                                label="Bairro"
                                value={property.district}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'district')}
                            />
                        </Col>
                        <Col md={'10'}>
                            <FormInput
                                required
                                label="Logradouro"
                                value={property.street}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'street')}
                            />
                        </Col>
                        <Col md={'2'}>
                            <FormInput
                                required
                                label="Nº"
                                value={property.number}
                                onChange={({target}) => onChangeField && onChangeField(target.value, 'number')}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Btn onClick={onHide} variant="secondary">Fechar</Btn>
                <Btn type="submit" form="form-property" variant="success">Salvar</Btn>
            </Modal.Footer>
        </Modal>
    )
}