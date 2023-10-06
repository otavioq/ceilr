const ac = new AbortController
declare type Config = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: object,
    showError?: boolean,
    throwError?: boolean,
    auth?: boolean,
    redirect?: boolean,
    signal?: typeof ac.signal
}

export default async function request(config: Config)