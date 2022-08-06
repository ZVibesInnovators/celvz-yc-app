import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Breadcrumbs, ImageList, ImageListItem, Link, Typography } from "@mui/material";
import Enums from "../../constants/enums";
import { useNavigate } from "react-router";
import FileUploader from "../../components/FileUploader";
import { Col, Row } from "reactstrap";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import _ from "lodash";

const FileManager = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [queryData, setQueryData] = useState(null);
    const { showError } = useContext(AlertContext);
    const { authData } = useContext(AuthContext)

    useEffect(() => {
        getFiles()
    }, [])

    const getFiles = async () => {
        try {
            const api = new API(authData?.token);
            const result = await api.request("get", `media`)
            console.log("result", result);
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

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                    Dashboard
                </Link>
                <Typography sx={{ color: Enums.COLORS.yellow }}>File Manager</Typography>
            </Breadcrumbs>
            <FileUploader />
            <Row>
                <Col md={8}>
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
                                    onClick={() => navigate(`/music/genre/${item._id}`)}
                                    sx={{
                                        cursor: "pointer",

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
                                            // background: "rgba(0, 0, 0,0.6)",
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
                                        <Box sx={{
                                            height: "30px",
                                            width: "100%",
                                            background: "#00000075",
                                            backdropFilter: "blur(5px)",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <Typography component={"h5"}>{item.name}</Typography>
                                        </Box>
                                    </Box>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </Col>
                <Col md={3} className="mx-auto"></Col>
            </Row>
        </Box>
    )
}

export default FileManager;
