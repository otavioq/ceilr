import React, { useId } from "react";
import { Form } from "react-bootstrap";

export default function Select(props) {
    const id = useId();

    return (
        <Form.Group>
            {props?.label?.length ?
                <Form.Label htmlFor={id}>{props.label}</Form.Label>
                : null
            }
            <Form.Select id={id} {...props}></Form.Select>
        </Form.Group>
    )
}