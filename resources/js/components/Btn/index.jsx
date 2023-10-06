import React from "react";
import { Button } from "react-bootstrap";

export default function Btn(props) {
    return <Button {...props}>{props.children}</Button>
}