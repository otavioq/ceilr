import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown, Form, Modal, Row, Table } from "react-bootstrap";
import request from "@/services/request";
import Btn from "@/components/Btn";
import FormInput from "@/components/FormInput";
import { alert, formatCurrency, setFullLoader, unmaskCurrency } from "@/services/util";
import {
    DatatableWrapper,
    EmptyTablePlaceholder,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
} from 'react-bs-datatable';
import Select from "@/components/Select";

export default function Properties() {

    const ac = new AbortController
    const propertyData = {
        type: 'house',
        price: 0,
        state: '',
        city: '',
        district: '',
        street: '',
        number: '',
    }

    const [properties, setProperties] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [types, setTypes] = useState({})
    const [paging, setPaging] = useState({})
    const [property, setProperty] = useState(propertyData)

    useEffect(() => {
        setFullLoader(true)
        getInfo().then(() => setFullLoader(false))

        return () => {
            ac.abort();
        }
    }, [])

    const getInfo = async () => {
        await Promise.all([
            getTypes(),
            listProperties()
        ]);
    }

    const getTypes = async () => {
        const resp = await request({
            method: 'GET',
            url: '/property-types',
            signal: ac.signal
        });

        setTypes(resp);
    }

    const renderActions = (item) => {

        const actions = [
            {
                label: 'Editar',
                onClick: () => {
                    setProperty(item)
                    setModalOpen(true)
                },
                variant: 'primary'
            },
            {
                label: 'Imóvel disponível',
                onClick: () => updateStatus(item.id, 'available'),
                shown: item.status != 'available'
            },
            {
                label: 'Imóvel locado',
                onClick: () => updateStatus(item.id, 'rented'),
                shown: item.status == 'available'
            },
            {
                label: 'Imóvel vendido',
                onClick: () => updateStatus(item.id, 'sold'),
                shown: item.status == 'available'
            },
            {
                label: 'Deletar imóvel',
                onClick: () => updateStatus(item.id, 'deleted'),
                shown: item.status == 'available',
                variant: 'danger'
            },
        ];

        return (
            <Dropdown>
                <Dropdown.Toggle className="py-1" />
                <Dropdown.Menu>
                    {actions.filter(btn => btn.shown !== false).map((btn, i) => (
                        <Dropdown.Item
                            key={i}
                            className={`text-${btn.variant}`}
                            onClick={() => btn.onClick && btn.onClick()}
                        >{btn.label}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    const headers = useMemo(() => ([
        {
            title: 'Endereço',
            prop: 'address',
            isFilterable: true,
            isSortable: true,
            cellProps: { style: {width: '65%'} }
        },
        {
            title: 'Tipo',
            prop: 'type_text',
            isFilterable: true,
            isSortable: true
        },
        {
            title: 'Preço',
            prop: 'price',
            cell: ({price}) => `R$ ${formatCurrency(price)}`,
            isFilterable: true,
            isSortable: true
        },
        {
            title: 'Status',
            prop: 'status_text',
            isFilterable: true,
            isSortable: true
        },
        {
            title: '',
            prop: 'actions',
            cell: renderActions
        },
    ]), []);

    const listProperties = async () => {
        try {
            const resp = await request({
                method: 'GET',
                url: '/properties',
                throwError: true,
                signal: ac.signal
            })

            setProperties(resp)
        } catch (e) {}
    }

    const updateStatus = async (id, status) => {
        const prompts = {
            'available': 'Marcar este imóvel como disponível?',
            'rented': 'Marcar este imóvel como alugado?',
            'sold': 'Marcar este imóvel como vendido?',
            'deleted': 'Deseja exluir este imóvel?'
        }

        alert({
            icon: undefined,
            title: undefined,
            html: `<h4>${prompts[status]}</h4>`,
            showCancelButton: true,
            cancelButtonText: 'Não',
            onConfirm: async () => {
                setFullLoader(true);

                const resp = await request({
                    method: 'PUT',
                    url: `/properties/status/${id}`,
                    data: {status}
                })

                if (!resp) {
                    return setFullLoader(false);
                }

                await getInfo();
                setFullLoader(false);
            }
        })
    }

    const save = async (e) => {
        e.preventDefault()
        setFullLoader(true)

        const resp = await request({
            method: property.id ? 'PUT' : 'POST',
            url: `/properties/${property.id || ''}`,
            data: property
        })

        if (!resp) {
            return setFullLoader(false);
        }

        alert({
            icon: 'success',
            confirmButtonText: 'Ok',
            title: `Registro ${property.id ? 'editado' : 'criado'} com sucesso`
        })

        await getInfo();
        onHide();
        setFullLoader(false);
    }

    const onHide = () => {
        setModalOpen(false)
        setProperty(propertyData)
    }

    const onChange = ({target}, field) => {
        const obj = {...property};
        obj[field] = target.value;
        setProperty(obj);
    }

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
        <section>
            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title className="m-0">Imóveis</Card.Title>

                        <Btn
                            onClick={() => {
                                setProperty(propertyData)
                                setModalOpen(true)
                            }}
                            className="float-right"
                            variant="primary"
                        >Adicionar</Btn>
                    </div>
                </Card.Header>
                <Card.Body>
                    <DatatableWrapper
                        body={properties}
                        headers={headers}
                        paginationOptionsProps={{
                            initialState: {
                                options: [10,25,50,100,200],
                                rowsPerPage: 10
                            }
                        }}
                        sortProps={{
                            sortValueObj: {
                                price: col => parseFloat(col.replace(/\./i, '').replace(',', '.').replace(/\D/i, ''))
                            }
                        }}
                    >
                        <div className="d-flex align-items-end justify-content-end mb-2">
                            <Filter
                                classes={{inputGroup: 'w-auto input-group-sm'}}
                                placeholder="Buscar"
                            />
                        </div>


                        <Table striped hover size="sm" className="align-middle">
                            <TableHeader />
                            <TableBody labels={{noResults: 'Nenhum registro encontrado'}}/>
                        </Table>

                        <div className="d-flex align-items-end justify-content-end gap-3">
                            <PaginationOptions
                                alwaysShowPagination={false}
                                labels={{beforeSelect: 'Linhas por página'}}
                                classes={{formControl: "form-select-sm"}}
                            />
                            <Pagination
                                alwaysShowPagination={false}
                                labels={{prevPage: '<', firstPage: 'Primeira', nextPage: '>', lastPage: 'Última'}}
                                classes={{button: "btn-sm"}}
                            />
                        </div>
                    </DatatableWrapper>
                </Card.Body>
            </Card>

            <Modal centered size="lg" show={modalOpen} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{property.id ? 'Editar' : 'Novo'} imóvel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="form-property" onSubmit={save}>
                        <Row className="row-gap-3">
                            <Col md={'3'}>
                                <Select
                                    required
                                    label="Tipo"
                                    value={property.type}
                                    onChange={e => onChange(e, 'type')}
                                >
                                    <RenderTypes/>
                                </Select>
                            </Col>
                            <Col md={'3'}>
                                <FormInput
                                    required
                                    label="Preço"
                                    value={property.price}
                                    onChange={e => onChange(e, 'price')}
                                    currency
                                />
                            </Col>
                            <Col md={'6'}>
                                <FormInput
                                    required
                                    label="Estado"
                                    value={property.state}
                                    onChange={e => onChange(e, 'state')}
                                />
                            </Col>
                            <Col md={'6'}>
                                <FormInput
                                    required
                                    label="Cidade"
                                    value={property.city}
                                    onChange={e => onChange(e, 'city')}
                                />
                            </Col>
                            <Col md={'6'}>
                                <FormInput
                                    required
                                    label="Bairro"
                                    value={property.district}
                                    onChange={e => onChange(e, 'district')}
                                />
                            </Col>
                            <Col md={'10'}>
                                <FormInput
                                    required
                                    label="Logradouro"
                                    value={property.street}
                                    onChange={e => onChange(e, 'street')}
                                />
                            </Col>
                            <Col md={'2'}>
                                <FormInput
                                    required
                                    label="Nº"
                                    value={property.number}
                                    onChange={e => onChange(e, 'number')}
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
        </section>
    )
}