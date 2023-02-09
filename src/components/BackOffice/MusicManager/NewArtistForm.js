import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Divider, Drawer, FormControl, InputLabel } from "@mui/material";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from "reactstrap";
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";
import FileSelectorModal from "../FileManager/FileSelectorModal";

const NewArtistForm = forwardRef((props, ref) => {
    const [isLoading, setLoading] = useState(false)
    const [show, toggle] = useState(false)
    const [artist, setArtist] = useState({});
    const fileSelectorRef = createRef();
    const { showError, showAlert } = useContext(AlertContext)
    const { authData } = useContext(AuthContext);

    useEffect(() => {
        if (!show) setArtist({})
    }, [show])

    useImperativeHandle(ref, () => ({
        toggle: (v) => toggle(v)
    }))

    const selectPhoto = (index) => {
        try {
            fileSelectorRef.current.toggle(true)
            fileSelectorRef.current.setIndex(index)
        } catch (error) {
            showError(error.message)
        }
    }

    const handleImageSelect = (data) => {
        try {
            setArtist((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    const submit = async () => {
        try {
            if (!artist.name) throw Error("Please provide a name")
            if (!artist.bio) throw Error("We'd like to know some details about the Artist")
            if (!artist.thumbnail) throw Error("Kindly upload/select a thumbnail photo")
            if (!artist.hero) throw Error("Kindly upload/select a hero photo");
            setLoading(true)
            const api = new API(authData?.token);
            await api.request("post", "artistes", {
                name: artist.name,
                bio: artist.bio,
                artisteArt: [artist.thumbnail?._id, artist.hero?._id]
            })
            showAlert("success", "Artist Created Successfully");
            props.refresh();
            setLoading(false)
            toggle(false);
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    return (
        <Drawer
            anchor={"bottom"}
            open={show}
            onClose={() => !isLoading && toggle(false)}
            sx={{
                position: "absolute",
                zIndex: 2000
            }}
            PaperProps={{
                sx: {
                    background: "transparent",
                }
            }}
        >
            <Box
                sx={{
                    background: Enums.COLORS.grey_500,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "20px",
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
                    <h2>New Artist</h2>
                    <span>Add new Artists to the Music Collection</span>
                </Box>
                <Divider />
                <Row>
                    <Col md={4} className="mx-auto" style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Artist Name
                            </InputLabel>
                            <BootstrapInput onChange={(e) => setArtist({ ...artist, name: e.target.value })} />
                        </FormControl>

                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Bio
                            </InputLabel>
                            <BootstrapInput multiline rows={4} onChange={(e) => setArtist({ ...artist, bio: e.target.value })} />
                        </FormControl>
                    </Col>
                    <Col md={7} className="mx-auto">
                        <Row>
                            <Col md={5}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Thumbnail / Avatar
                                </InputLabel>
                                <Box sx={{
                                    border: "2px dashed #d7d7d7",
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${artist?.thumbnail?.meta?.secure_url})`,
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
                                    <Box className="mask" onClick={() => selectPhoto("thumbnail")}>
                                        <AddPhotoAlternateIcon sx={{ color: Enums.COLORS.white, fontSize: 40 }} />
                                    </Box>
                                </Box>
                            </Col>
                            <Col md={7} className="mx-auto">
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Hero Art
                                </InputLabel>
                                <Box sx={{
                                    border: "2px dashed #d7d7d7",
                                    width: "100%",
                                    height: "200px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${artist?.hero?.meta?.secure_url})`,
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
                                <Box sx={{
                                    marginY: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}>
                                    <Button
                                        disabled={isLoading}
                                        onClick={() => toggle(false)}
                                        sx={{
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

                                    <Button
                                        disabled={isLoading}
                                        onClick={submit} sx={{
                                            marginX: "5px",
                                            minHeight: "40px",
                                            padding: "5px 15px",
                                            background: isLoading ? Enums.COLORS.grey_400 : Enums.COLORS.yellow,

                                            ":hover": {
                                                background: "#eee",
                                                "span": {
                                                    color: "#333 !important"
                                                }
                                            },

                                            "span": {
                                                color: `${Enums.COLORS.grey_500} !important`
                                            }
                                        }}><span>{isLoading ? "Please Wait..." : "Submit"}</span></Button>
                                </Box>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
            </Box>
        </Drawer>
    )
})

export default NewArtistForm;