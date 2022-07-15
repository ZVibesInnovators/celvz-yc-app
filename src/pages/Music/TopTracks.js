import { Box, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useState } from 'react';
import { Row } from "reactstrap";
import { Loader } from "../../components/Misc";
import { StyledTableCell, StyledTableRow, TrackList } from "../../components/styledComponents/musicStyles";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import API from "../../services/api";

import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const RecommendedMusic = () => {
    const { showError } = useContext(AlertContext)
    const { playNewSong, currentTrack, playing } = useContext(MusicPlayerContext);
    const [isLoading, setLoading] = useState(true);
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        getTopTracks();
    }, [])

    const getTopTracks = async () => {
        try {
            const api = new API();
            const songs = await api.request("get", `songs?$limit=20&$include=media&$include=artiste&$include=songArt`);
            const results = _.filter(songs.data, function (song) {
                return song.media && song.artiste && song.songArt
            })
            setLoading(false)
            setTopTracks(results);
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        isLoading ?
            <Loader />
            :
            !_.isEmpty(topTracks) &&
            <Box>
                <TrackList>
                    <Row className="mask">
                        <h3>Top Tracks</h3>
                        <TableContainer component={Box} style={{ marginTop: "20px" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell>SONG</StyledTableCell>
                                        <StyledTableCell align="right">ARTIST</StyledTableCell>
                                        <StyledTableCell align="right">TIME</StyledTableCell>
                                        <StyledTableCell align="right">OPTIONS</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {_.map(topTracks, function (song, i) {
                                        const index = i + 1
                                        return (
                                            <StyledTableRow key={i}>
                                                <StyledTableCell onClick={() => playNewSong(song)}>
                                                    {currentTrack?._id === song._id ?
                                                        <IconButton sx={{ padding: "0px" }}>
                                                            {playing ?
                                                                <PauseCircleOutlineOutlinedIcon sx={{ color: "#FFF" }} />
                                                                :
                                                                <PlayCircleOutlineOutlinedIcon sx={{ color: "#FFF" }} />
                                                            }
                                                        </IconButton>
                                                        :
                                                        <Typography sx={{ color: "#4e4c4c", fontWeight: "600" }}>{`${index < 10 ? "0" : ""}${index}`}</Typography>}
                                                </StyledTableCell>
                                                <StyledTableCell onClick={() => playNewSong(song)}></StyledTableCell>
                                                <StyledTableCell onClick={() => playNewSong(song)} component="th" scope="row">
                                                    {song.title}
                                                </StyledTableCell>
                                                <StyledTableCell onClick={() => playNewSong(song)} align="right">{`${song.artiste?.firstName || "Unknown Artist"}`}</StyledTableCell>
                                                <StyledTableCell onClick={() => playNewSong(song)} align="right">{Number(song.media?.meta?.duration / 60).toFixed(2).replace(".", ":")}</StyledTableCell>
                                                <StyledTableCell align="right" className="action-cell">
                                                    <IconButton sx={{ padding: "0px" }}>
                                                        <ShareOutlinedIcon sx={{ color: "#FFF" }} />
                                                    </IconButton>
                                                    <IconButton sx={{ padding: "0px", margin: "0px 15px" }}>
                                                        <PlaylistAddOutlinedIcon sx={{ color: "#FFF" }} />
                                                    </IconButton>
                                                    <IconButton sx={{ padding: "0px" }}>
                                                        <FavoriteBorderOutlinedIcon sx={{ color: "#FFF" }} />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Row>
                </TrackList>
            </Box>
    )
}

export default RecommendedMusic