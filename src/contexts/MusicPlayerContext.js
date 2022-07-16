import React, { createContext, createRef, useEffect, useState } from "react";
import AddToPlayList from "../components/music/AddToPlayList";
import MusicPlayer from "../components/music/MusicPlayer";

const _ = require("lodash");

export const MusicPlayerContext = createContext();

export const MusicPlayerContextProvider = (props) => {
    const [showPlayer, togglePlayer] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playing, setPlaying] = useState(false)
    const [newPlaylistTrack, setNewPlaylistTrack] = useState(false)
    const playerRef = createRef();
    const addPlaylistRef = createRef();

    const playNewSong = (song) => {
        setCurrentTrack(song);
        togglePlayer(true)
        playerRef.current?.togglePlayState()
    }

    useEffect(() => {
        addPlaylistRef.current?.toggle(!_.isEmpty(newPlaylistTrack))
    }, [newPlaylistTrack])

    return <MusicPlayerContext.Provider value={{ 
        showPlayer, 
        togglePlayer,
        currentTrack,
        setCurrentTrack,
        playNewSong,
        playing,
        setPlaying,
        newPlaylistTrack,
        setNewPlaylistTrack
    }}>
        {props.children}
        <AddToPlayList ref={addPlaylistRef} />
        <MusicPlayer ref={playerRef} />
    </MusicPlayerContext.Provider>
}