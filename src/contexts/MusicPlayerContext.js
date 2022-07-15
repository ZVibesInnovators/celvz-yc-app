import React, { createContext, createRef, useState } from "react";
import MusicPlayer from "../components/music/MusicPlayer";

const _ = require("lodash");

export const MusicPlayerContext = createContext();

export const MusicPlayerContextProvider = (props) => {
    const [showPlayer, togglePlayer] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playing, setPlaying] = useState(false)
    const playerRef = createRef();

    const playNewSong = (song) => {
        setCurrentTrack(song);
        togglePlayer(true)
        playerRef.current?.togglePlayState()
    }

    return <MusicPlayerContext.Provider value={{ 
        showPlayer, 
        togglePlayer,
        currentTrack,
        setCurrentTrack,
        playNewSong,
        playing,
        setPlaying
    }}>
        {props.children}
        <MusicPlayer ref={playerRef} />
    </MusicPlayerContext.Provider>
}