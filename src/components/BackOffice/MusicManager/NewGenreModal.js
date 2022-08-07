import { Box, Button, Divider, FormControl, InputLabel, Modal, useTheme } from "@mui/material";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileSelectorModal from "../FileManager/FileSelectorModal";
import { Col, Row } from "reactstrap";
import { BootstrapInput } from "../../Misc";
import API from "../../../services/api";

const NewGenreModal = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const [genre, setGenre] = useState({});
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const fileSelectorRef = createRef();
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        toggle: (v) => toggle(v),
    }))

    useEffect(() => {
        if (!show) setGenre({})
    }, [show])

    const selectPhoto = (index) => {
        try {
            fileSelectorRef.current?.toggle(true)
            fileSelectorRef.current?.setIndex(index)
        } catch (error) {
            showError(error.message)
        }
    }

    const handleImageSelect = (data) => {
        try {
            setGenre((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    const submit = async () => {
        try {
            if(!genre?.hero) throw Error("Please select/upload a hero image");
            if(!genre?.name) throw Error("Kindly provide a name for this Genre");
            if(!genre?.description) throw("A breif description is required for the Genre");
            const api = new API(authData?.token);
            await api.request("post", "genre", {
                name: genre.name,
                description: genre.description,
                genreArt: genre.hero?._id
            })
            showAlert("success", "Genre Created Successfully");
            props.refresh();
            toggle(false);
        } catch (error) {
            showError(error.message)
        }
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
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 550,
                bgcolor: Enums.COLORS.grey_500,
                boxShadow: 24,
                p: 2,
                overflow: "auto",

                [`${theme.breakpoints.down("sm")}`]: {
                    width: "95% !important"
                }
            }}>
                <Box sx={{
                    marginBottom: 1,
                    "h2": {
                        color: "#FFF",
                        fontSize: 25,
                        marginBottom: "2px",
                    },
                    "span": {
                        color: "#FFF",
                        fontSize: 15,
                    }
                }}>
                    <h2>New Genre</h2>
                    <span>Create Genres to keep music organized</span>
                </Box>
                <Divider />
                <Row>
                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <InputLabel shrink sx={{ mt: 1, color: Enums.COLORS.yellow }}>
                            Genre Art
                        </InputLabel>
                        <FormControl variant="standard" sx={{ width: "inherit" }}>
                            <Box sx={{
                                border: "2px dashed #d7d7d7",
                                width: "100%",
                                height: "180px",
                                borderRadius: "5px",
                                backgroundImage: `url(${genre?.hero?.meta?.secure_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "top",
                                backgroundRepeat: "no-repeat",
                                ".mask": {
                                    display: "none"
                                },

                                ":hover": {
                                    cursor: "pointer",

                                    ".mask": {
                                        background: 'rgba(0, 0, 0,0.6)',
                                        width: "100%",
                                        height: "100%",
                                        animation: 'fadeIn 2s',
                                        opacity: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }
                                }
                            }}>
                                <Box className="mask" onClick={() => selectPhoto("hero")}>
                                    <AddPhotoAlternateIcon sx={{ color: Enums.COLORS.white, fontSize: 40 }} />
                                </Box>
                            </Box>
                        </FormControl>
                    </Col>
                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Genre
                            </InputLabel>
                            <BootstrapInput onChange={(e) => setGenre({ ...genre, name: e.target.value })} />
                        </FormControl>
                    </Col>
                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Description
                            </InputLabel>
                            <BootstrapInput multiline rows={4} onChange={(e) => setGenre({ ...genre, description: e.target.value })} />
                        </FormControl>
                    </Col>
                </Row>
                <Box sx={{
                    marginY: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    <Button onClick={() => toggle(false)} sx={{
                        minHeight: "40px",
                        padding: "5px 15px",
                        background: "#eee",

                        ":hover": {
                            background: Enums.COLORS.orange,
                            "span": {
                                color: `${Enums.COLORS.white} !important`
                            }
                        },

                        "span": {
                            color: "#333 !important"
                        }
                    }}><span>Cancel</span></Button>

                    <Button onClick={submit} sx={{
                        marginX: "5px",
                        minHeight: "40px",
                        padding: "5px 15px",
                        background: Enums.COLORS.yellow,

                        ":hover": {
                            background: "#eee",
                            "span": {
                                color: "#333 !important"
                            }
                        },

                        "span": {
                            color: `${Enums.COLORS.grey_500} !important`
                        }
                    }}><span>Submit</span></Button>
                </Box>
                <Box>
                </Box>
                <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />

            </Box>
        </Modal>
    )
})

export default NewGenreModal;