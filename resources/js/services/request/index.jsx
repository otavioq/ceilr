import axios, { CanceledError } from "axios";
import router from "@/services/router";
import Swal from 'sweetalert2';

function getError(e) {
    if (typeof e === 'string') {
        return e;
    }

    if (typeof e === 'object' && e.length) {
        const assembleMessages = (arr) => {
            return arr.map(i => `${arr.length > 1 ? `-` : ''} ${typeof i === 'string' ? i : i.message}`)
        }

        return e.map(i => {
            if (typeof i === 'object' && i.length) {
                return assembleMessages(i)
            }
            return assembleMessages(e)
        }).join('<br>');
    }

    if (typeof e === 'object') {
        let str = ''
        for( const key in e){
            if ( typeof e[key] == 'string'){
                str += `- ${e[key]}<br>`
            } else if ( typeof e[key] == 'object' && typeof e[key][0] == 'string' ){
                str += `- ${e[key][0]}<br>`
            }
        }
        return str
    }

    return 'Houve algum erro';
}

export default async function request(config) {
    const opt = {
        redirect: true,
        showError: true,
        auth: true,
        throwError: false,
        headers: {},
        ...config
    }
    
    try {
        const token = localStorage.getItem('auth-token')
        if (opt?.auth && !!token?.length) {
            opt.headers = { ...opt.headers, Authorization: `Bearer ${token}` }
        } else if (opt?.auth) {
            opt.redirect && router.navigate('/auth/login')
            throw 'Não autorizado';
        }
        
        const client = axios.create({
            baseURL: '/api',
            headers: opt.headers,
            signal: opt.signal
        })
        const req = client[opt.method.toLowerCase()];
        const resp = await req(opt.url, opt.data, opt.headers);

        if (!resp?.data?.success) {
            throw resp.data?.messages;
        }

        return resp.data?.data;
    } catch (e) {
        if (e instanceof CanceledError) {
            return;
        }

        opt.showError && Swal.fire({
            icon: 'error',
            title: 'Erro',
            html: getError(e?.response?.data?.messages || e )
        });

        if (opt.redirect && [401, 403].includes(e?.status || e?.response?.status)) {
            router.navigate('/auth/login')
        }

        if (opt.throwError) {
            throw e;
        }
    }
}
