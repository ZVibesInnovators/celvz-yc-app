import { Avatar, Backdrop, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, IconButton, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import API from "../../services/api";
import { AddPlayListDismissBtn, CreatePlayListBtn, PlaylistItemWrapper, PlaylistThumbnailWrapper } from "../styledComponents/musicStyles";
import _ from "lodash";

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddToPlayList = forwardRef((props, ref) => {
    const [show, toggle] = useState(false);
    const { newPlaylistTrack } = useContext(MusicPlayerContext);

    useImperativeHandle(ref, () => ({
        toggle: (v) => toggle(v)
    }))

    return (
        <Backdrop
            sx={{
                color: '#fff',
                backdropFilter: "blur(8px)",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={show}
        >
            {show && newPlaylistTrack && <PlaylistAddForm />}
        </Backdrop>
    )
})

export default AddToPlayList;

const PlaylistAddForm = () => {
    const { newPlaylistTrack, setNewPlaylistTrack } = useContext(MusicPlayerContext);
    const [playlists, setPlaylists] = useState([]);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext)
    const [showNewPlaylistForm, toggleNewPlaylistForm] = useState(false)

    useEffect(() => {
        getPlaylists()
    }, [])

    const getPlaylists = useCallback(async () => {
        try {
            if (!authData) return;
            const api = new API(authData?.token);
            const { data } = await api.request("get", `playlists/me`);
            setPlaylists(data)
        } catch (error) {
            showError(error.message)
        }
    }, [authData])

    return (<Card sx={{
        width: "40vw",
        maxWidth: "500px",
        minHeight: "400px",
        background: "#060505",
        maxHeight: "600px",
        padding: "0px",
        display: "flex",
        flexDirection: "column",

        "@media only screen and (max-width: 600px)": {
            width: "90vw !important"
        }
    }}>
        <CardContent sx={{ flex: 1 }}>
            <Typography
                component={"h1"}
                sx={{
                    color: "#FFF",
                    fontSize: "30px",
                    textAlign: "center"
                }}
            >Add to Playlist</Typography>
            <Divider sx={{ background: "#D3006C" }} />
            <Box sx={{ width: "80%", margin: "auto" }}>
                <Avatar
                    src={newPlaylistTrack?.songArt[0]?.meta?.secure_url}
                    variant="square"
                    sx={{ width: 80, height: 80, margin: "20px auto" }}
                    style={{ background: "#d7d7d7" }}
                />
                <Typography
                    sx={{
                        color: "#FFF",
                        fontSize: "16px",
                        textAlign: "center"
                    }}
                >{newPlaylistTrack?.title}</Typography>
                <Typography
                    sx={{
                        color: "#777",
                        fontSize: "15px",
                        textAlign: "center"
                    }}
                >{newPlaylistTrack?.artiste?.name}</Typography>
            </Box>
            {
                !authData ?
                    <Box sx={{ margin: "20px 30px" }}>
                        <Typography sx={{ color: Enums.COLORS.orange, textAlign: "center", fontSize: "20px" }}>Please log in to add this song to your playlist</Typography>
                    </Box>
                    :
                    <>
                        <Box sx={{ margin: "20px auto", width: "100%", alignItems: "center", display: "flex" }}>
                            <CreatePlayListBtn onClick={() => toggleNewPlaylistForm(true)}>
                                <Typography sx={{ color: "#111" }}>Create Playlist</Typography>
                            </CreatePlayListBtn>
                        </Box>
                        <Stack spacing={1} style={{ width: "100%", margin: "auto" }}>
                            {playlists.map((item, i) => <PlaylistItem key={i} data={item} refresh={() => getPlaylists()} />)}
                        </Stack>
                        <NewPlayListDialog
                            open={showNewPlaylistForm}
                            refresh={() => getPlaylists()}
                            dismiss={() => toggleNewPlaylistForm(false)}
                        />
                    </>
            }
        </CardContent>
        <AddPlayListDismissBtn onClick={() => setNewPlaylistTrack(false)}>
            DISMISS
        </AddPlayListDismissBtn>
    </Card>
    )
}

const NewPlayListDialog = ({ open, dismiss, refresh }) => {
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext)
    const [isLoading, setLoading] = useState(false)
    const [payload, setPayload] = useState({
        title: "",
        user: authData?.user._id,
        isPublic: false,
    })

    const createPlaylist = async () => {
        try {
            if (!payload.title) throw Error("Please input a title")
            if (!payload.user) throw Error("You must be logged in to create a playlist")
            setLoading(true);
            const api = new API(authData?.token)
            await api.request("post", "playlists", payload)
            showAlert("success", "Playlist created successfully")
            setLoading(false);
            dismiss()
            refresh()
        } catch (error) {
            showError(error.message);
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onClose={dismiss}>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new playlist and organize your music
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Playlist Name"
                    type="text"
                    defaultValue={payload.title}
                    onChange={(e) => setPayload({ ...payload, title: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <FormControlLabel control={<Switch defaultChecked={payload.isPublic} onChange={() => setPayload({ ...payload, isPublic: !payload.isPublic })} />} label={payload.isPublic ? "Public" : "Private"} />
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={dismiss}>Cancel</Button>
                <Button disabled={isLoading} onClick={createPlaylist}>Create Playlist</Button>
            </DialogActions>
        </Dialog>
    )
}

const PlaylistItem = ({ data, refresh }) => {
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext)
    const { newPlaylistTrack } = useContext(MusicPlayerContext);

    const isOnList = useMemo(() => {
        // checks if the selected track to be added to the playlist is already on the list
        return _.find(data?.songs, function (song) {
            return song._id?.toString() === newPlaylistTrack._id
        })
    }, [data, newPlaylistTrack])

    const addTrack = useCallback(async () => {
        try {
            if (!authData || !data) return;
            const api = new API(authData?.token);
            await api.request("post", `playlists/me/add`, {
                playlist: data._id,
                song: newPlaylistTrack._id
            });
            refresh();
            showAlert("success", "Song was successfully added to your playlist")
        } catch (error) {
            showError(error.message);
        }
    }, [data, authData, newPlaylistTrack])

    return (
        <PlaylistItemWrapper>
            <Box sx={{
                width: "40px",
                height: "40px",
                backgroundColor: !_.isEmpty(data?.songs) ? "#333" : "#111",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {_.isEmpty(data?.songs) ?
                    <QueueMusicIcon sx={{ color: Enums.COLORS.white, fontSize: "30px" }} />
                    :
                    <PlaylistThumbnailWrapper size={30}>
                        <Avatar
                            src={!_.isEmpty(data?.songs[0]?.songArt) && data?.songs[0].songArt[0]?.meta?.thumbnail_url}
                            variant="square"
                            sx={{ width: 40, height: 40 }}
                            className="thumbnail"
                            style={{ background: "#d7d7d7" }}
                        />
                    </PlaylistThumbnailWrapper>
                }
            </Box>
            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "0px 10px",

                "h5": {
                    fontSize: "15px",
                    marginBottom: "0px",
                    color: Enums.COLORS.orange,
                }
            }}>
                <h5>{data.title}</h5>
                <small>{`${_.size(data?.songs)} song${_.size(data?.songs) != 1 ? "s" : ""}`}</small>
            </Box>
            <IconButton disabled={isOnList} onClick={addTrack}>
                {isOnList ?
                    <CheckCircleIcon sx={{ color: Enums.COLORS.orange }} />
                    :
                    <AddCircleIcon sx={{ color: Enums.COLORS.white }} />
                }
            </IconButton>
        </PlaylistItemWrapper>
    )
}