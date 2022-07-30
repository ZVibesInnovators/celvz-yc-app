import React, { useContext, useState } from 'react';
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";

const FileUploader = () => {
    const { authData } = useContext(AuthContext);
    const { showError, showAlert } = useContext(AlertContext);
    const [codec, setCodec] = useState(null)

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
        codec === "!@#$%^&*()_+" && <button id="upload_widget" onClick={openUploader} className="cloudinary-button">Upload files</button>
    )
}

export default FileUploader;