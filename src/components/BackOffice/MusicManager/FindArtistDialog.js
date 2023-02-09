import { Avatar, Box, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";
import { Searchables } from '@zheeno/searchables';
import HelpIcon from '@mui/icons-material/Help';

const FindArtistDialog = (props) => {
    const { onClose, selectedValue, open } = props;
    const { authData } = useContext(AuthContext);
    const { showError } = useContext(AlertContext)
    const [artists, setArtists] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        if (authData) {
            const api = new API(authData?.token);
            api.request("get", `artistes?$include=artisteArt&$include=account&$limit=${Math.pow(10, 5)}`).then(({ data }) => {
                setArtists(data);
                setFiltered(data)
            }).catch(error => {
                showError(error.message)
            })
        }
    }, [authData]);

    useEffect(() => {
        handleSearch(keyword)
    }, [keyword])

    const handleSearch = useCallback(async (keyword) => {
        try {
            if (keyword?.trim().length === 0) {
                setFiltered(artists)
            } else {
                const search = new Searchables(artists);
                search.addIndex(["name", "account.name", "bio"]);
                const result = await search.find(keyword);
                setFiltered(result);
            }
        } catch (error) {
            showError(error.message)
        }
    }, [artists])

    const handleClose = () => {
        onClose(selectedValue);
        setKeyword("");
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open} sx={{
            position: "absolute",
            zIndex: 3000,
        }}>
            <DialogTitle>Select an Artist</DialogTitle>
            <BootstrapInput
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search"
                sx={{
                    marginX: 2,
                    '& .MuiInputBase-input': {
                        color: Enums.COLORS.grey_500
                    }
                }} />
            <Box sx={{ minWidth: 200, maxHeight: "70vh", overflowY: "auto" }}>
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
                        {filtered.map((artist, i) => (
                            <ListItem disabled={selectedValue?._id === artist._id} button onClick={() => handleListItemClick(artist)} key={i}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={!_.isEmpty(artist.artisteArt)
                                            && artist.artisteArt[0].meta?.secure_url
                                        }
                                        sx={{ bgcolor: Enums.COLORS.grey_500 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={artist.name} />
                            </ListItem>
                        ))}
                    </List>}
            </Box>
        </Dialog>
    );
}

export default FindArtistDialog;