import { Box, ImageList, ImageListItem, Modal, Typography, useTheme } from "@mui/material";
import _ from "lodash";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { Loader } from "../../Misc";
import FileUploader from "./FileUploader";

const FileSelectorModal = forwardRef((props, ref) => {
    const { type, onSelect } = props;
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const { showError } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const theme = useTheme();
    const [index, setIndex] = useState(null)

    useImperativeHandle(ref, () => ({
        toggle: (v) => toggle(v),
        setIndex: (v) => setIndex(v)
    }))

    useEffect(() => {
        if (authData) getFiles()
    }, [authData])

    const onUploadSuccess = async (data) => {
        try {
            const { entry } = data;
            setFiles((old) => [entry, ...old])
        } catch (error) {
            showError(error.message)
        }
    }

    const getFiles = async () => {
        try {
            const api = new API(authData?.token);
            const result = await api.request("get", `media?$limit=${Math.pow(10, 5)}`)
            setFiles(_.filter(result.data, function (entry) {
                return type ? entry.meta?.resource_type === type : entry
            }));
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    const dataList = useMemo(() => {
        const entries = _.map(files, function (entry, i) {
            return {
                ...entry,
                rows: 1,
                cols: 1
            }
        });
        return entries;
    }, [files])

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    return (
        <Modal
            open={show}
            onClose={() => toggle(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                top: 0,
                position: "absolute",
                zIndex: 5000
            }}
        >
            {isLoading ?
                <Loader />
                :
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: Enums.COLORS.grey_500,
                    boxShadow: 24,
                    p: 0,
                    overflow: "none",
                    maxHeight: "70vh",
                    display: "flex",

                    [`${theme.breakpoints.down("sm")}`]: {
                        width: "95% !important"
                    }
                }}>
                    <ImageList
                        sx={{ width: "100%", flex: 1, overflowY: "auto" }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                    >
                        <FileUploader onSuccess={onUploadSuccess} />
                        {dataList.map((item, i) => (
                            <ImageListItem
                                key={item._id}
                                cols={item.cols || 1} rows={item.rows || 1}
                                onClick={() => {
                                    onSelect({ index, item });
                                    toggle(false)
                                }}
                                sx={{
                                    cursor: "pointer",
                                    background: "#222",

                                    "& img.grey": {
                                        WebkitFilter: 'grayscale(100%) !important',
                                        filter: 'grayscale(100%) !important'
                                    }
                                }}
                            >
                                <img
                                    {...srcset(item.meta.secure_url, 121, item.rows, item.cols)}
                                    alt={item.name}
                                    loading="lazy"
                                    className={"normal"}
                                />
                                <Box
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        position: "absolute",
                                        bottom: "0px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",

                                        "h5": {
                                            color: "#FFF",
                                            marginLeft: "10px",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        },

                                        "&.selected": {
                                            "h5": {
                                                color: Enums.COLORS.yellow
                                            }
                                        },

                                        "&:hover": {
                                            backdropFilter: "blur(4px)",

                                            "h5": {
                                                color: Enums.COLORS.orange
                                            }
                                        }
                                    }}>
                                    <Box sx={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "flex-end" }}>
                                        <Box sx={{ padding: "3px 10px", margin: "5px", borderRadius: "20px", background: "#000", position: "absolute" }}><Typography sx={{ color: "#FFF", fontSize: "12px" }}>{item?.meta?.format?.toUpperCase()}</Typography></Box>
                                    </Box>
                                    <Box sx={{
                                        height: "30px",
                                        width: "100%",
                                        background: "#00000075",
                                        backdropFilter: "blur(5px)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                        <Typography component={"h5"} sx={{ maxWidth: "90%" }}>{item.filename}</Typography>
                                    </Box>
                                </Box>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>}
        </Modal>
    )
})

export default FileSelectorModal