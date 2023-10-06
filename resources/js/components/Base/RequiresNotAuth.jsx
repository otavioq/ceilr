import request from "@/services/request";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

export default function RequiresNotAuth({Page}) {

    const [logged, setLogged] = useState(true)

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const verify = async () => {
        const resp = await request({
            method: 'GET',
            url: '/me',
            showError: false
        })

        if (!resp) {
            setLogged(false);
            return;
        }

        dispatch({user: resp, type: 'user'});
        navigate('/', {replace: true})
    }

    useEffect(() => {
        verify()
    }, [location.pathname])

    return (
        !logged ? <Page/> : <Loader/>
    )
}