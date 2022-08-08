import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import Enums from "../../../constants/enums";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import _ from "lodash";

const InlineMusicPlayer = ({ currentTrack, rightComponent }) => {
    const [playing, setPlaying] = useState(false)
    const [playTime, setPlayTime] = useState(0);
    let interval;
    const rand = Math.random(1, 100)

    const togglePlay = useCallback(() => {
        try {
            const player = document.getElementById(`audio-player-${currentTrack?.meta?.asset_id}_${rand}`);
            const playPromise = player[playing ? "pause" : "play"]();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                  // Automatic playback started!
                  // Show playing UI.
                })
                .catch(error => {
                  // Auto-play was prevented
                  // Show paused UI.
                  console.log(error.message);
                });
              }
        } catch (error) {
            console.log(error.message);
        }
    }, [currentTrack, playing, rand])

    useEffect(() => {
        setPlaying(false);
        setPlayTime(0)
    }, [currentTrack])

    const onPlay = useCallback((e) => {
        setPlaying(true);
        const player = document.getElementById(`audio-player-${currentTrack?.meta?.asset_id}_${rand}`);
        interval = setInterval(() => {
            const time = player.currentTime
            setPlayTime(time)
        }, 1000);
    }, [currentTrack, rand])

    const onPause = (e) => {
        setPlaying(false);
        clearInterval(interval)
    }

    return (
        <Box boxShadow={"revert"} sx={{
            padding: 1,
            background: Enums.COLORS.grey_400,
            borderRadius: "5px",
            minHeight: 50,
            minWidth: "250px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <IconButton disabled={!currentTrack} onClick={togglePlay} sx={{ background: Enums.COLORS.yellow }}>
                {playing ?
                    <PauseCircleOutlineOutlinedIcon sx={{ color: Enums.COLORS.grey_500, width: 20, height: 20 }} />
                    :
                    <PlayCircleOutlineOutlinedIcon sx={{ color: Enums.COLORS.grey_500, width: 20, height: 20 }} />
                }
            </IconButton>
            <Box sx={{
                flex: 1,
                marginX: 1
            }}>
                <Typography sx={{
                    color: "#FFF", fontSize: "15px",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>{currentTrack ? currentTrack.filename : "--- ---"}</Typography>
            </Box>
            {rightComponent}
            <audio id={`audio-player-${currentTrack?.meta?.asset_id}_${rand}`} onPause={onPause} onPlay={onPlay} src={currentTrack?.meta?.secure_url} />
        </Box>
    )
}

export default InlineMusicPlayer;