import { formatCurrency, unmaskCurrency } from "@/services/util";
import React, { useId } from "react";
import { Form } from "react-bootstrap";
import CurrencyInput from "react-currency-masked-input";

export default function FormInput({currency = false, ...props}) {
    const id = useId();
    return (
        <Form.Group>
            {props?.label?.length ?
                <Form.Label htmlFor={props?.id || id}>{props.label}</Form.Label>
                : null
            }
            {currency ?
                <Form.Control
                    id={id}
                    {...props}
                    as={CurrencyInput}
                    type="text"
                    separator=","
                    pattern={undefined}
                    value={formatCurrency(props.value)}
                    onChange={(e, v) => props.onChange && props.onChange({target: {...e.target, value: unmaskCurrency(v)}})}
                />
                : <Form.Control id={id} {...props}/>
            }
        </Form.Group>
    )
}