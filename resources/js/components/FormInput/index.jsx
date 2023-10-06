import React, { useId } from "react";
import { Form } from "react-bootstrap";

export default function FormInput(props) {
    const id = useId();

    return (
        <Form.Group>
            {props?.label?.length ?
                <Form.Label htmlFor={id}>{props.label}</Form.Label>
                : null
            }
            <Form.Control id={id} {...props}/>
        </Form.Group>
    )
}