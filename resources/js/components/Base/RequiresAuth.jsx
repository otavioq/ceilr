import request from "@/services/request";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "@/components/Loader";

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
        logged ? <Page/> : <Loader/>
    )
}