import router from "@/services/router";
import request from "@/services/request";
import store from "@/services/store";
import Swal from "sweetalert2";
import { DateTime } from "luxon";

const login = async (data) => {
    const resp = await request({
        method: 'POST',
        url: '/auth/login',
        data: data,
        auth: false
    });

    if (!resp) {
        return;
    }

    localStorage.setItem('auth-token', resp.token);

    store.dispatch({user: resp, type: 'user'});
    router.navigate('/', {replace: true});
}

const logout = async () => {
    await request({
        method: 'POST',
        url: '/logout',
    });

    localStorage.removeItem('auth-token');

    store.dispatch({user: {}, type: 'user'});
    router.navigate('/auth/login', {replace: true});
}

const register = async (data) => {
    const resp = await request({
        method: 'POST',
        url: '/auth/register',
        data: data
    });

    if (!resp) {
        return false;
    }

    Swal.fire({
        icon: 'success',
        title: 'Cadastrado com sucesso'
    });

    router.navigate('/auth/login', {replace: true});
}

const setFullLoader = (loading) => {
    store.dispatch({type: 'loader', loading});
}

const formatDate = (str = '', time = false) => {
    if (!str?.length) {
        return '';
    }

    const format = time ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD';
    return DateTime.fromISO(str).toFormat(format);
}

const formatCurrency = (val = '0') => {
    return parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

const alert = async (opt) => {
    const options = {
        title: 'Tem certeza?',
        icon: 'warning',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        ...opt
    }

    if (typeof options.onCancel === 'function') {
        options.showCancelButton = true
    }
    
    delete options.onConfirm;
    delete options.onCancel;
    const {isConfirmed, isDenied} = await Swal.fire(options);

    (isConfirmed && opt.onConfirm) && opt.onConfirm();
    (isDenied && opt.onCancel) && opt.onCancel();
}

export {
    login,
    logout,
    register,
    setFullLoader,
    formatDate,
    formatCurrency,
    alert
};
