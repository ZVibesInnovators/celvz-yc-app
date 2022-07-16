import { Avatar, Backdrop, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from 'react';
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import API from "../../services/api";
import { AddPlayListDismissBtn, CreatePlayListBtn } from "../styledComponents/musicStyles";

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
            const api = new API(authData?.token);
            const { data } = await api.request("get", `playlists?$or=user:${authData?.user?._id}`);
            console.log("DATA =>", {authData, data});
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
                        color: "#333",
                        fontSize: "14px",
                        textAlign: "center"
                    }}
                >{newPlaylistTrack?.artiste?.firstName}</Typography>
            </Box>
            {
                !authData ?
                    <Box sx={{ margin: "20px 30px" }}>
                        <Typography sx={{ color: Enums.COLORS.orange, textAlign: "center", fontSize: "20px" }}>Please log in to add this song to your playlist</Typography>
                    </Box>
                    :
                    <>
                        <Box sx={{ width: "100%", alignItems: "center", display: "flex" }}>
                            <CreatePlayListBtn onClick={() => toggleNewPlaylistForm(true)}>
                                <Typography sx={{ color: "#111" }}>Create Playlist</Typography>
                            </CreatePlayListBtn>
                        </Box>
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