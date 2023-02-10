import {DeviceUUID} from "device-uuid";
import { React, createContext, useState, useEffect, useMemo } from "react";
import API from "../services/api";

const _ = require("lodash");

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [authData, setAuthData] = useState(null);

    const isLoggedIn = useMemo(() => {
        return !_.isNull(authData) && authData["token"]
    }, [authData])

    const permissions = useMemo(() => {
        return authData?.permissions || []
    }, [authData])

    useEffect(() => {
        try {
            // this initializes the authData if any has been saved to the localStorage
            setAuthData(JSON.parse(localStorage.getItem("authData")))
            // generate a unique id for the device if none exists
            if(!localStorage.getItem("UUID")){
                const randID = OTP_GEN(10)
                var uuid = new DeviceUUID().get();
                localStorage.setItem("UUID", `${uuid}-${randID}`)
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

    const OTP_GEN = (len) => {
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < len; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }

    return <AuthContext.Provider value={{
        login,
        logout,
        register,
        isLoggedIn,
        authData,
        permissions
    }}>
        {props.children}
    </AuthContext.Provider>
}