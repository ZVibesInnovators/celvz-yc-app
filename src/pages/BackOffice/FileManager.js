import { Box, Breadcrumbs, Drawer, ImageList, ImageListItem, Link, Typography, useTheme } from "@mui/material";
import _ from "lodash";
import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import FilePreview from "../../components/BackOffice/FileManager/FilePreview";
import FileUploader from "../../components/BackOffice/FileManager/FileUploader";
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import TheatersIcon from '@mui/icons-material/Theaters';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileManager = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [queryData, setQueryData] = useState(null);
    const [selected, setSelected] = useState(null);
    const { showError } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const filePreviewRef = createRef()

    useEffect(() => {
        if (authData) getFiles()
    }, [authData])

    const getFiles = async () => {
        try {
            const api = new API(authData?.token);
            const result = await api.request("get", `media?$limit=${Math.pow(10, 5)}`)
            // console.log("result", result);
            setFiles(result.data);
            delete result.data;
            setQueryData(result)
        } catch (error) {
            showError(error.message)
        }
    }

    const dataList = useMemo(() => {
        const entries = _.map(files, function (entry, i) {
            return {
                ...entry,
                rows: i == 0 ? 2 : 1,
                cols: (i == 0 || i == 3) ? 2 : 1
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

    const onUploadSuccess = (data) => {
        try {
            const { entry } = data;
            setFiles((old) => [entry, ...old])
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                    Dashboard
                </Link>
                <Typography sx={{ color: Enums.COLORS.yellow }}>File Manager</Typography>
            </Breadcrumbs>
            <FileUploader onSuccess={onUploadSuccess} />
            <Box>
                <ImageList
                    sx={{ width: "100%", }}
                    variant="quilted"
                    cols={4}
                    rowHeight={121}
                >
                    {dataList.map((item, i) => (
                        <ImageListItem
                            key={item._id}
                            cols={item.cols || 1} rows={item.rows || 1}
                            onClick={() => {
                                setSelected(item);
                                filePreviewRef.current?.setFile(item)
                            }}
                            sx={{
                                cursor: "pointer",
                                background: "#222",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",

                                "& img.grey": {
                                    WebkitFilter: 'grayscale(100%) !important',
                                    filter: 'grayscale(100%) !important'
                                }
                            }}
                        >
                            {item.meta?.resource_type === "image" ? <img
                                {...srcset(item.meta.secure_url, 121, item.rows, item.cols)}
                                alt={item.name}
                                loading="lazy"
                                className={selected?._id === item._id ? "grey" : "normal"}
                            />
                                :
                                (item.meta?.resource_type === "audio" || ["mp3", "wav", "m4a"].includes(item.meta?.format.toLowerCase())) ?
                                    <LibraryMusicIcon sx={{ color: Enums.COLORS.orange, width: 50, height: 50, marginTop: "-20px" }} />
                                    :
                                    item.meta?.resource_type === "video" ? <TheatersIcon sx={{ color: Enums.COLORS.orange, width: 50, height: 50, marginTop: "-20px" }} />
                                        :
                                        <InsertDriveFileIcon sx={{ color: Enums.COLORS.white, width: 50, height: 50, marginTop: "-20px" }} />
                            }
                            <Box
                                className={selected?._id === item._id && "selected"}
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
            </Box>

            <FilePreview ref={filePreviewRef} file={selected} />

        </Box>
    )
}

export default FileManager;
