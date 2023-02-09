import { Button, Fab } from "@mui/material";
import React, { useContext, useState } from 'react';
import { AlertContext } from "../../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../../contexts/AuthContext";
import API from "../../../../services/api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const FileUploader = ({ onSuccess, inline }) => {
    const { authData } = useContext(AuthContext);
    const { showError, showAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false)

    const openUploader = async () => {
        try {
            setLoading(true)
            const api = new API(authData?.token);
            const data = await api.request("get", "media/getSignature")
            setTimeout(() => setLoading(false), 3000)
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
                    onSuccess(media)
                } else if (error) {
                    setLoading(false);
                    showError(error?.message || "We encountered an error while uploading")
                }
            }
            const myWidget = window.cloudinary.createUploadWidget(options, processResults)
            myWidget.open()
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    return (
        inline ? <Button disabled={loading} id="upload_widget" color={"warning"} onClick={openUploader} className="cloudinary-button">Upload</Button>
            :
            <Fab disabled={loading} id="upload_widget" color={"warning"} onClick={openUploader} className="cloudinary-button" sx={{
                position: "fixed",
                bottom: 30,
                right: 30,
                zIndex: 5
            }}>
                {loading ? <AutorenewIcon className="fa-spin" sx={{ color: "#FFF" }} /> : <CloudUploadIcon />}
            </Fab>
    )
}

export default FileUploader;