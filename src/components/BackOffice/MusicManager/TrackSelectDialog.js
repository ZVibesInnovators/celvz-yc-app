import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";
import { Searchables } from '@zheeno/searchables';
import HelpIcon from '@mui/icons-material/Help';
import InlineMusicPlayer from "./InlineMusicPlayer";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FileUploader from "../FileManager/FileUploader";

const TrackSelectDialog = (props) => {
    const { onClose, selectedValue, open } = props;
    const { authData } = useContext(AuthContext);
    const { showError } = useContext(AlertContext)
    const [songs, setSongs] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        if (authData) {
            const api = new API(authData?.token);
            api.request("get", `media?$limit=${Math.pow(10, 5)}`).then(({ data }) => {
                const musicFiles = _.filter(data, function (entry) {
                    return (entry.meta?.resource_type === "audio") || (entry.meta?.resource_type === "video")
                })
                setSongs(musicFiles);
                setFiltered(musicFiles)
            }).catch(error => {
                showError(error.message)
            })
        }
    }, [authData]);

    const onUploadSuccess = async (data) => {
        try {
            const { entry } = data;
            setSongs((old) => [entry, ...old])
        } catch (error) {
            showError(error.message)
        }
    }

    useEffect(() => {
        handleSearch(keyword)
    }, [keyword])

    const handleSearch = useCallback(async (keyword) => {
        try {
            if (keyword?.trim().length === 0) {
                setFiltered(songs)
            } else {
                const search = new Searchables(songs);
                search.addIndex(["name", "account.name", "bio"]);
                const result = await search.find(keyword);
                setFiltered(result);
            }
        } catch (error) {
            showError(error.message)
        }
    }, [songs])

    const handleClose = () => {
        onClose(selectedValue);
        setKeyword("");
    };

    const handleTrackSelect = (track) => {
        onClose(track);
    };

    return (
        <Dialog onClose={handleClose} open={open}
            scroll={"paper"}
            sx={{
                position: "absolute",
                zIndex: 3000,
            }}>
            <DialogTitle>Select an audio file</DialogTitle>
            <DialogContent dividers={true} sx={{ minWidth: 300, p: 1, background: Enums.COLORS.grey_500 }}>
                <FileUploader onSuccess={onUploadSuccess} />
                <BootstrapInput
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search"
                    sx={{
                        width: "100%",
                        '& .MuiInputBase-input': {
                            color: Enums.COLORS.white
                        }
                    }} />
                {_.isEmpty(filtered) ?
                    <Box sx={{
                        display: "flex",
                        margin: 2,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <HelpIcon sx={{
                            color: Enums.COLORS.grey_400,
                            fontSize: 100
                        }} />
                        <Typography sx={{ color: Enums.COLORS.grey_400 }}>No results found</Typography>
                    </Box>
                    :
                    <List sx={{ pt: 0 }}>
                        {filtered.map((track, i) => (
                            <Box
                                disabled={selectedValue?._id === track._id}
                                button
                                // onClick={() => handleListItemClick(artist)}
                                key={i}
                                sx={{ width: "inherit", margin: 1 }}
                            >
                                <InlineMusicPlayer
                                    currentTrack={track}
                                    rightComponent={<IconButton onClick={() => handleTrackSelect(track)}>
                                        <ArrowCircleRightIcon sx={{ color: Enums.COLORS.white }} />
                                    </IconButton>}
                                />
                            </Box>
                        ))}
                    </List>}
            </DialogContent>
        </Dialog>
    );
}

export default TrackSelectDialog;