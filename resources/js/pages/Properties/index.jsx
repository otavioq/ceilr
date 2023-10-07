import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { DatatableWrapper, Filter, Pagination, PaginationOptions, TableBody, TableHeader } from 'react-bs-datatable';
import { alert, formatCurrency, setFullLoader } from "@/services/util";
import request from "@/services/request";
import Btn from "@/components/Btn";
import Select from "@/components/Select";
import PropertyModal from "./PropertyModal";

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
    const [statuses, setStatuses] = useState({b:2})
    const [property, setProperty] = useState(propertyData)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFullLoader(true)
        getInfo().then(() => setFullLoader(false))

        return () => {
            ac.abort();
        }
    }, [])

    useEffect(() => {
        setFullLoader(true)
        listProperties().then(() => setFullLoader(false))
    }, [searchParams])

    const getInfo = async () => {
        await Promise.all([
            getTypes(),
            getStatuses()
        ]);
    }

    const getAllInfo = async () => {
        await Promise.all([
            getInfo(),
            listProperties()
        ]);
    }

    const getTypes = async () => {
        const resp = await request({
            method: 'GET',
            url: '/property-types',
            signal: ac.signal
        });

        setTypes(resp || {});
    }

    const getStatuses = async () => {
        const resp = await request({
            method: 'GET',
            url: '/property-statuses',
            signal: ac.signal
        });

        setStatuses(resp || {a:1});
    }

    const listProperties = async (filters = {}) => {
        const status = searchParams.get('status') || ''
        
        if (status.length) {
            filters.status = status
        }

        const query = new URLSearchParams(filters)
        const resp = await request({
            method: 'GET',
            url: `/properties/?${query}`,
            signal: ac.signal
        })

        setProperties(resp || [])
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
                onClick: () => promptUpdate(item.id, 'available'),
                shown: item.status != 'available'
            },
            {
                label: 'Imóvel locado',
                onClick: () => promptUpdate(item.id, 'rented'),
                shown: item.status == 'available'
            },
            {
                label: 'Imóvel vendido',
                onClick: () => promptUpdate(item.id, 'sold'),
                shown: item.status == 'available'
            },
            {
                label: 'Deletar imóvel',
                onClick: () => promptUpdate(item.id, 'deleted'),
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

    const headers = [
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
    ];

    const promptUpdate = (id, status) => {
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
            onConfirm: () => updateStatus(id, status)
        })
    }

    const updateStatus = async (id, status) => {
        setFullLoader(true);

        const resp = await request({
            method: 'PUT',
            url: `/properties/status/${id}`,
            data: {status}
        })

        if (!resp) {
            return setFullLoader(false);
        }

        getAllInfo().then(() => {
            setFullLoader(false);
        })
    }

    const save = async () => {
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

        getAllInfo().then(() => {
            onHide();
            setFullLoader(false);
        })
    }

    const onHide = () => {
        setModalOpen(false)
        setProperty(propertyData)
    }

    const onChange = (value, field) => {
        const obj = {...property};
        obj[field] = value;
        setProperty(obj);
    }

    const StatusOptions = () => {
        const options = [];

        for (const status in statuses) {
            const label = statuses[status][0]
            options.push(
                <option key={status} value={status}>{label}</option>
            );
        }

        options.unshift(
            <option key={0} value={''}>Todos</option>
        )
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
                        <Row className="align-items-end justify-content-between mb-2 row-gap-1">
                            <Col md={2}>
                                <Select
                                    label="Status"
                                    value={searchParams.get('status') || ''}
                                    onChange={({target}) => setSearchParams(c => {
                                        if (target.value?.length) {
                                            c.set('status', target.value)
                                        } else {
                                            c.delete('status')
                                        }
                                        return c
                                    })}
                                    className={'form-select-sm'}
                                >
                                    <StatusOptions/>
                                </Select>
                            </Col>
                            <Col md={2}>
                                <Filter
                                    classes={{ inputGroup: 'w-unset input-group-sm' }}
                                    placeholder="Buscar"
                                />
                            </Col>
                        </Row>


                        <Table striped hover responsive="sm" size="sm" className="align-middle">
                            <TableHeader />
                            <TableBody labels={{ noResults: 'Nenhum registro encontrado' }}/>
                        </Table>

                        <div className="d-flex align-items-end justify-content-end gap-3">
                            <PaginationOptions
                                alwaysShowPagination={false}
                                labels={{ beforeSelect: 'Linhas por página' }}
                                classes={{ formControl: "form-select-sm" }}
                            />
                            <Pagination
                                alwaysShowPagination={false}
                                labels={{ prevPage: '<', firstPage: 'Primeira', nextPage: '>', lastPage: 'Última'}}
                                classes={{ button: "btn-sm" }}
                            />
                        </div>
                    </DatatableWrapper>
                </Card.Body>
            </Card>

            <PropertyModal
                property={property}
                types={types}
                isOpen={modalOpen}
                onHide={onHide}
                onSave={save}
                onChangeField={onChange}
            />
        </section>
    )
}