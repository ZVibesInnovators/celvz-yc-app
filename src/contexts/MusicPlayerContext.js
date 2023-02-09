import { Alert, Paper, Snackbar } from "@mui/material";
import React, { createContext, createRef, useEffect, useState } from "react";
import AddToPlayList from "../components/music/AddToPlayList";
import MusicPlayer from "../components/music/MusicPlayer";
import NowPlayingSnackBar from "../components/music/NowPlayingSnackbar";

const _ = require("lodash");

export const MusicPlayerContext = createContext();

export const MusicPlayerContextProvider = (props) => {
    const [showPlayer, togglePlayer] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [prevTrack, setPrevTrack] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [songList, setSongList] = useState([]);
    const [newPlaylistTrack, setNewPlaylistTrack] = useState(false)
    const playerRef = createRef();
    const addPlaylistRef = createRef();
    const nowPlayingRef = createRef();

    const playNewSong = ({list, songIndex}) => {
        try {
            setPrevTrack(currentTrack);
            setCurrentTrack(list[songIndex]);
            setSongList(list)
            togglePlayer(true)
            playerRef.current?.togglePlayState()
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        addPlaylistRef.current?.toggle(!_.isEmpty(newPlaylistTrack))
    }, [newPlaylistTrack])

    useEffect(() => {
        nowPlayingRef.current?.toggleSnackBar((currentTrack?._id !== prevTrack?._id))
    }, [currentTrack, prevTrack])

    return <MusicPlayerContext.Provider value={{
        showPlayer,
        togglePlayer,
        currentTrack,
        setCurrentTrack,
        playNewSong,
        playing,
        setPlaying,
        newPlaylistTrack,
        setNewPlaylistTrack,
        songList
    }}>
        {props.children}
        {/* add to playlist modal */}
        <AddToPlayList ref={addPlaylistRef} />
        {/* music player component */}
        <MusicPlayer ref={playerRef} />
        {/* now playing snackbar notifier */}
        <NowPlayingSnackBar ref={nowPlayingRef} />
    </MusicPlayerContext.Provider>
}