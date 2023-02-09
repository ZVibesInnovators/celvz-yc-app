import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Avatar, Box, Button, Divider, Drawer, FormControl, FormControlLabel, IconButton, InputLabel, Radio, RadioGroup, Switch, Typography } from "@mui/material";
import _ from "lodash";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from "reactstrap";
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";
import FileSelectorModal from "../FileManager/FileSelectorModal";
import FindArtistDialog from "./FindArtistDialog";
import InlineMusicPlayer from "./InlineMusicPlayer";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TrackSelectDialog from "./TrackSelectDialog";

const NewSongForm = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [genre, setGenre] = useState([])
    const [song, setSong] = useState({});
    const [showArtisteDialog, toggleArtisteDialog] = useState(false);
    const [showTrackDialog, toggleTrackDialog] = useState(false)
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
                setGenre(data)
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
            if (!song.title) throw Error("Please provide a song title")
            if (!song.artiste) throw Error("Kindly add an artist")
            if (!song.media) throw Error("Kindly select a track");
            if (!song.thumbnail) throw Error("Kindly upload/select a thumbnail photo")
            if (!song.description) throw Error("We'd like to know some details about the Song")
            setLoading(true)
            const songArt = [song.thumbnail._id]
            if (song.hero) songArt.push(song.hero._id)
            const payload = {
                title: song.title,
                description: song.description,
                artiste: song.artiste._id,
                media: song.media._id,
                genre: song.genre,
                songArt,
                isPublished: song.isPublished
            }
            const api = new API(authData?.token);
            await api.request("post", "songs", payload)
            showAlert("success", "Song Created Successfully");
            setLoading(false)
            props.refresh();
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
                        <Row>
                            <Col md={6}>
                                <FormControl variant="standard" sx={{ marginY: 2 }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                        Genre (Optional)
                                    </InputLabel>
                                    <RadioGroup
                                        onChange={(e) => setSong((old) => ({ ...old, genre: e.target.value }))}
                                        sx={{
                                            marginY: 2,

                                            "span": {
                                                color: "#FFF"
                                            },

                                            "span:hover": {
                                                color: `${Enums.COLORS.yellow} !important`
                                            },
                                        }}
                                    >
                                        {genre.map((entry, i) => (<FormControlLabel key={i} value={entry._id} control={<Radio />} label={entry.name} />))}
                                    </RadioGroup>
                                </FormControl>
                            </Col>
                            <Col md={6}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Artist
                                </InputLabel>
                                <Avatar
                                    onClick={() => toggleArtisteDialog(true)}
                                    variant="square"
                                    src={!_.isEmpty(song?.artiste?.artisteArt) && song?.artiste?.artisteArt[0].meta?.secure_url}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        cursor: 'pointer'
                                    }} />
                                <Typography sx={{
                                    color: Enums.COLORS.white,
                                    background: "#000",
                                    maxWidth: 150,
                                    paddingX: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>{song?.artiste?.name}</Typography>
                            </Col>
                        </Row>
                        {/* music player */}
                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                            Select a Track
                        </InputLabel>
                        <InlineMusicPlayer currentTrack={song?.media}
                            rightComponent={
                                <Button onClick={() => toggleTrackDialog(true)} size="small" sx={{ color: Enums.COLORS.yellow, textTransform: "capitalize" }}>
                                    <MusicNoteIcon />
                                    &nbsp;Add Track
                                </Button>
                            } />
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
                                    Hero Art (Optional)
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
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormControl variant="standard" sx={{ marginY: 2, width: "inherit" }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                        Description
                                    </InputLabel>
                                    <BootstrapInput sx={{ width: "inherit" }} multiline rows={4} onChange={(e) => setSong({ ...song, description: e.target.value })} />
                                </FormControl>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow, fontSize: 20 }}>
                                        Publish Song
                                    </InputLabel>
                                    <Switch checked={song?.isPublished} onClick={() => setSong((old) => ({ ...old, isPublished: !song?.isPublished }))} />
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
                {/* music track select dialog */}
                <TrackSelectDialog
                    selectedValue={song?.media}
                    open={showTrackDialog}
                    onClose={(v) => {
                        toggleTrackDialog(false);
                        if (v) {
                            setSong((old) => ({ ...old, media: v }))
                        }
                    }}
                />
                {/* artiste select dialog */}
                <FindArtistDialog
                    selectedValue={song?.artiste}
                    open={showArtisteDialog}
                    onClose={(v) => {
                        toggleArtisteDialog(false);
                        if (v) {
                            setSong((old) => ({ ...old, artiste: v }))
                        }
                    }}
                />
                {/* file selector */}
                <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
            </Box>
        </Drawer>
    )
})

export default NewSongForm;