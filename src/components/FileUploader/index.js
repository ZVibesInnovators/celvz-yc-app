import { Fab } from "@mui/material";
import React, { useContext, useState } from 'react';
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = () => {
    const { authData } = useContext(AuthContext);
    const { showError, showAlert } = useContext(AlertContext);

    const openUploader = async () => {
        try {
            const api = new API(authData?.token);
            const data = await api.request("get", "media/getSignature")
            const options = {
                cloudName: data.cloud_name,
                apiKey: data.api_key,
                uploadSignatureTimestamp: data.timestamp,
                uploadSignature: data.signature,
                cropping: false,
                folder: 'signed_upload_demo_uw'
            }
            const processResults = async (error, result) => {
                if (!error && result && result.event === 'success') {
                    const { info } = result;
                    // create media record on database
                    const media = await api.request("post", "media", {
                        filename: info.original_filename,
                        meta: info
                    })
                    showAlert("success", "Media upload successful")
                } else if (error) {
                    showError(error?.message || "We encountered an error while uploading")
                }
            }
            const myWidget = window.cloudinary.createUploadWidget(options, processResults)
            myWidget.open()
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Fab id="upload_widget" color={"warning"} onClick={openUploader} className="cloudinary-button" sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 5
        }}>
            <CloudUploadIcon />
        </Fab>
    )
}

export default FileUploader;