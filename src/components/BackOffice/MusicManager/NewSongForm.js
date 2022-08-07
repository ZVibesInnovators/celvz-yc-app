import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Divider, Drawer, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from "reactstrap";
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";
import FileSelectorModal from "../FileManager/FileSelectorModal";

const NewSongForm = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [genre, setGenre] = useState([])
    const [song, setSong] = useState({});
    const fileSelectorRef = createRef();
    const { showError, showAlert } = useContext(AlertContext)
    const { authData } = useContext(AuthContext);

    useEffect(() => {
        if (!show) setSong({})
    }, [show])

    useEffect(() => {
        if (authData) {
            const api = new API(authData?.token);
            api.request("get", `genre?$limit=${Math.pow(10, 5)}`).then(({ data }) => {
                console.log("GEN", data);
            }).catch(error => {
                showError(error.message)
            })
        }
    }, [authData])

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
            setSong((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    const submit = async () => {
        try {
            console.log("DATA =>", song)
            if (!song.name) throw Error("Please provide a song title")
            if (!song.description) throw Error("We'd like to know some details about the Song")
            if (!song.thumbnail) throw Error("Kindly upload/select a thumbnail photo")
            if (!song.hero) throw Error("Kindly upload/select a hero photo");
            const api = new API(authData?.token);
            await api.request("post", "songs", {
                title: song.name,
                description: song.description,
                artisteArt: [song.thumbnail?._id, song.hero?._id]
            })
            showAlert("success", "Song Created Successfully");
            props.refresh();
            toggle(false);
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Drawer
            anchor={"bottom"}
            open={show}
            onClose={() => toggle(false)}
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
                    <h2>New Song</h2>
                    <span>Add new Songs to the Music Collection</span>
                </Box>
                <Divider />
                <Row>
                    <Col md={4} className="mx-auto" style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Song Title
                            </InputLabel>
                            <BootstrapInput onChange={(e) => setSong({ ...song, title: e.target.value })} />
                        </FormControl>

                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Description
                            </InputLabel>
                            <BootstrapInput multiline rows={4} onChange={(e) => setSong({ ...song, description: e.target.value })} />
                        </FormControl>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel id="demo-simple-select-label">Genre (Optional)</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={song?.genre}
                                label="genre"
                                // onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md={7} className="mx-auto">
                        <Row>
                            <Col md={5}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Song Art Thumbnail
                                </InputLabel>
                                <Box sx={{
                                    border: "2px dashed #d7d7d7",
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${song?.thumbnail?.meta?.secure_url})`,
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
                                    backgroundImage: `url(${song?.hero?.meta?.secure_url})`,
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
            </Box>
        </Drawer>
    )
})

export default NewSongForm;