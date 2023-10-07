import request from "@/services/request";
import { setFullLoader } from "@/services/util";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const ac = new AbortController
    const [report, setReport] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        setFullLoader(true)
        getStatuses().then(() => setFullLoader(false))

        return () => {
            ac.abort()
        }
    }, [])

    const getStatuses = async () => {
        const resp = await request({
            method: 'GET',
            url: '/property-report',
            signal: ac.signal
        });

        setReport(resp || {});
    }

    const StatusReport = () => {
        const items = []

        for (const status in report) {
            const {labels, properties} = report[status];
            const singular = properties == 1;
            const label = singular ? labels[0] : labels[1]

            items.push({
                status,
                text: `${properties} ${singular ? 'imóvel' : 'imóveis'} ${label.toLocaleLowerCase()}`
            })
        }

        return items.map( (item, i) => (
            <Col key={i} md={4} style={{cursor: 'pointer'}}>
                <Card onClick={() => navigate(`/properties/?status=${item.status}`)}>
                    <Card.Body>
                        <Card.Title className="m-0" style={{userSelect: 'none'}}>{item.text}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }

    return (
        <Row className="row-gap-1">
            <StatusReport/>
        </Row>
    )
}
