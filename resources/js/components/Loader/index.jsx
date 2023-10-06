import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {

    return (
        <div id="loader-backdrop">
            <Spinner variant="light" animation="grow"/>
        </div>
    )
}