import {DeviceUUID} from "device-uuid";
import { reject } from "lodash";
import { React, createContext, useState, useEffect, useMemo } from "react";
import API from "../services/api";

const _ = require("lodash");

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [authData, setAuthData] = useState(null);

    const isLoggedIn = useMemo(() => {
        return !_.isNull(authData) && authData["token"]
    }, [authData])

    useEffect(() => {
        try {
            // this initializes the authData if any has been saved to the localStorage
            setAuthData(JSON.parse(localStorage.getItem("authData")))
            // generate a unique id for the device if none exists
            if(!localStorage.getItem("UUID")){
                var uuid = new DeviceUUID().get();
                console.log("UUID", uuid)
                localStorage.setItem("UUID", uuid)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    const login = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const api = new API();
                const response = await api.request("post", `auth/login`, {
                    ...payload,
                });
                setAuthData(response);
                localStorage.setItem("authData", JSON.stringify(response))
                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    const register = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const api = new API();
                const response = await api.request("post", `auth/register`, {
                    ...payload,
                });
                console.log("REGISTER DATA =>", { response });
                const authRes = await login(payload);
                resolve(authRes);
                // submit data to reg endpoint

                // if successful, automatically log the user in
            } catch (error) {
                reject(error)
            }
        })
    }

    const logout = () => {
        localStorage.removeItem("authData");
        setAuthData(null)
    }

    return <AuthContext.Provider value={{
        login,
        logout,
        register,
        isLoggedIn,
        authData
    }}>
        {props.children}
    </AuthContext.Provider>
}