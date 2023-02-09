import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const { showError } = useContext(AlertContext)
    const { authData } = useContext(AuthContext)

    useEffect(() => {
        getPlaylists()
    }, [])

    const getPlaylists = async () => {
        try {
            const api = new API(authData?.token);
            const response = await api.request("get", `playlists/public`)
            console.log("RES =>", response);
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Box sx={{ marginBottom: "200px" }}>

        </Box>
    )
}

export default Playlists;