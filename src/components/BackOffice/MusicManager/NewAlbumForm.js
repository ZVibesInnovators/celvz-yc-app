import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Avatar, Box, Button, Divider, Drawer, FormControl, InputLabel, Switch, Typography } from "@mui/material";
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
import TrackSelectDialog from "./TrackSelectDialog";
import TracksTransferList from "./TracksTransferList";

const tracksRef = createRef();

const NewAlbumForm = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [songs, setSongs] = useState([])
    const [album, setAlbum] = useState({});
    const [showArtisteDialog, toggleArtisteDialog] = useState(false);
    const [showTrackDialog, toggleTrackDialog] = useState(false)
    const fileSelectorRef = createRef();
    const { showError, showAlert } = useContext(AlertContext)
    const { authData } = useContext(AuthContext);

    useEffect(() => {
        if (!show) setAlbum({})
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
            setAlbum((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    const submit = async () => {
        try {
            const tracks = tracksRef.current?.tracks;
            if (!album.title) throw Error("Please provide an Album title")
            if (!album.artiste) throw Error("Kindly add an artist")
            if (!album.hero) throw Error("Kindly upload/select an Album art")
            if (!album.description) throw Error("We'd like to know some details about the Song")
            if(_.size(tracks) <= 1) throw Error("An album must have at least two tracks")
            setLoading(true)
            const payload = {
                title: album.title,
                description: album.description,
                artiste: album.artiste._id,
                songs: tracks.map(track => track._id),
                albumArt: album.hero._id,
                isPublished: album.isPublished
            }
            const api = new API(authData?.token);
            await api.request("post", "albums", payload)
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
                    <h2>New Album</h2>
                    <span>Organize an Artist&apos;s Songs in an Album</span>
                </Box>
                <Divider />
                <Row>
                    <Col md={3} className="mx-auto" style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Album Title
                            </InputLabel>
                            <BootstrapInput onChange={(e) => setAlbum({ ...album, title: e.target.value })} />
                        </FormControl>
                        <Row>
                            <Col md={6}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Artist
                                </InputLabel>
                                <Avatar
                                    onClick={() => toggleArtisteDialog(true)}
                                    variant="square"
                                    src={!_.isEmpty(album?.artiste?.artisteArt) && album?.artiste?.artisteArt[0].meta?.secure_url}
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
                                }}>{album?.artiste?.name}</Typography>
                            </Col>
                        </Row>
                        <Box sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow, fontSize: 20 }}>
                                Publish Album
                            </InputLabel>
                            <Switch checked={album?.isPublished} onClick={() => setAlbum((old) => ({ ...old, isPublished: !album?.isPublished }))} />
                        </Box>
                    </Col>
                    <Col md={3} className="mx-auto">
                        <Row>
                            <Col md={12} className="mx-auto">
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Album Art
                                </InputLabel>
                                <Box sx={{
                                    border: "2px dashed #d7d7d7",
                                    width: "100%",
                                    height: "200px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${album?.hero?.meta?.secure_url})`,
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
                                    <BootstrapInput sx={{ width: "inherit" }} multiline rows={4} onChange={(e) => setAlbum({ ...album, description: e.target.value })} />
                                </FormControl>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} className="mx-auto">
                        {/* music player */}
                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                            Select album tracks
                        </InputLabel>
                        <Box sx={{
                            background: Enums.COLORS.grey_400,
                            marginY: 2,
                            paddingY: 1,
                            borderRadius: "5px"
                        }}>
                            <TracksTransferList ref={tracksRef} artist={album?.artiste} />
                        </Box>
                        {/* action buttons */}
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
                {/* music track select dialog */}
                <TrackSelectDialog
                    selectedValue={album?.media}
                    open={showTrackDialog}
                    onClose={(v) => {
                        toggleTrackDialog(false);
                        if (v) {
                            setAlbum((old) => ({ ...old, media: v }))
                        }
                    }}
                />
                {/* artiste select dialog */}
                <FindArtistDialog
                    selectedValue={album?.artiste}
                    open={showArtisteDialog}
                    onClose={(v) => {
                        toggleArtisteDialog(false);
                        if (v) {
                            setAlbum((old) => ({ ...old, artiste: v }))
                        }
                    }}
                />
                {/* file selector */}
                <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
            </Box>
        </Drawer>
    )
})

export default NewAlbumForm;