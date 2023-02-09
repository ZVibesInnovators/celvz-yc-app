import Axios from 'axios';
import Enums from "../constants/enums";

class API {
    constructor(token, host) {
        this.token = token;
        this.host = host || Enums.BASE_URL;
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    addHost(host) {
        this.host = host
    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    request(method, path, payload = null) {
        const { token, host } = this;
        const allowedMethods = ["post", "put", "patch", "delete", "get"];
        return new Promise((resolve, reject) => {
            try {
                let config = { headers: this.headers }
                if (token) config["headers"]["Authorization"] = `Bearer ${token}`;
                if (payload) config['data'] = payload
                let op = allowedMethods.splice(0, 3).includes(method) ?
                    Axios[method](`${host}/${path}`, config.data, config)
                    :
                    Axios[method](`${host}/${path}`, config)
                // make the request
                op.then(res => {
                    resolve(res?.data);
                }).catch(error => {
                    reject(new Error(this.NetworkErrorHandler(error)));
                });
            } catch (error) {
                reject(new Error(this.NetworkErrorHandler(error)))
            }
        })
    }

    NetworkErrorHandler = (error) => {
        if (error.response) return (error.response.data.message)
        if (error.request) return (error.request.statusText)
        return (error.message)
    }
}

export default API