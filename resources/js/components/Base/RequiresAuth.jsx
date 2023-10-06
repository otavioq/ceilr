import request from "@/services/request";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function RequiresAuth({Page}) {

    const [logged, setLogged] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch()

    const verify = async () => {

        const resp = await request({
            method: 'GET',
            url: '/me'
        })

        if (!resp) {
            return;
        }

        setLogged(true);
        dispatch({user: resp, type: 'user'});
    }

    useEffect(() => {
        verify()
    }, [location.pathname])

    return (
        logged
        ? <Page/>
        : <h1>Authenticating...</h1>
    )
}