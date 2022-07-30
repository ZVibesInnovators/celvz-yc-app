import { Avatar, Box, IconButton, Slider } from "@mui/material";
import _ from "lodash";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import { MusicPlayerWrapper } from "../styledComponents/musicStyles";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { styled } from '@mui/material/styles';

const MusicPlayer = forwardRef((props, ref) => {
    const { currentTrack, showPlayer, playing, setPlaying, songList, playNewSong } = useContext(MusicPlayerContext);
    const [playTime, setPlayTime] = useState(0);
    let interval;

    useImperativeHandle(ref, () => ({
        togglePlayState: () => togglePlay(),
        playingState: playing
    }))

    useEffect(() => {
        clearInterval(interval)
        setPlaying(false)
        togglePlay()
        setPlayTime(0)

        return () => {
            clearInterval(interval)
        }
    }, [currentTrack])

    useEffect(() => {
        // queue the next track
        try {
            const duration = currentTrack?.media?.meta?.duration;
            if (playTime === duration) {
                const currIndex = _.findIndex(songList, function (song) {
                    return song?._id === currentTrack?._id
                });
                if (currIndex >= 0 && currIndex < (_.size(songList) - 1)) {
                    setTimeout(() => {
                        playNewSong({
                            list: songList,
                            songIndex: currIndex + 1
                        })
                    }, 3000);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [playTime, currentTrack])

    const onPlay = (e) => {
        setPlaying(true);
        const player = document.getElementById("audio-player");
        interval = setInterval(() => {
            const time = player.currentTime
            setPlayTime(time)
        }, 1000);
    }

    const onPause = (e) => {
        setPlaying(false);
        clearInterval(interval)
    }

    const togglePlay = () => {
        try {
            const player = document.getElementById("audio-player");
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
    }

    const progress = useMemo(() => {
        try {
            if (!currentTrack) return 0
            const duration = currentTrack.media?.meta.duration;
            const result = (playTime / duration) * 100;
            return result
        } catch (error) {
            return 0
        }
    }, [playTime])

    const onSeek = (value) => {
        const duration = currentTrack.media?.meta.duration;
        // calculate the time
        const time = duration * (value / 100)
        const player = document.getElementById("audio-player");
        player.currentTime = time
        setPlayTime(time)
    }


    return (showPlayer &&
        <MusicPlayerWrapper>
            <Seeker progress={progress} playing={playing} duration={currentTrack?.media?.meta?.duration || 0} seek={onSeek} />
            <Box className="player">
                <Avatar
                    src={!_.isEmpty(currentTrack?.songArt) && currentTrack.songArt[0]?.meta?.secure_url}
                    variant="square"
                    sx={{ width: 60, height: 60 }}
                    className="thubnail"
                    style={{ background: "#d7d7d7" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", margin: "0px 10px", justifyContent: "center" }}>
                    <h4>{currentTrack?.title}</h4>
                    <span>{currentTrack?.artiste?.firstName}</span>
                </Box>
                <Box style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>

                    <IconButton onClick={togglePlay}>
                        {playing ?
                            <PauseCircleOutlineOutlinedIcon sx={{ color: "#FFF", width: 40, height: 40 }} />
                            :
                            <PlayCircleOutlineOutlinedIcon sx={{ color: "#FFF", width: 40, height: 40 }} />
                        }
                    </IconButton>
                </Box>
            </Box>
            <audio id="audio-player" onPause={onPause} onPlay={onPlay} src={currentTrack?.media?.meta?.secure_url} />
        </MusicPlayerWrapper>
    )
})

export default MusicPlayer;

const Seeker = ({ playing, progress, seek }) => {
    const PrettoSlider = styled(Slider)({
        color: '#52af77',
        height: 4,
        '& .MuiSlider-track': {
            border: 'none',
            background: "#D3006C",
        },
        '& .MuiSlider-thumb': {
            height: 18,
            width: 18,
            zIndex: 3,
            backgroundColor: '#fff',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
                backgroundColor: "#D3006C"
            },
            '&:before': {
                display: 'none',
            },
        }
    });

    return (
        <Box sx={{
            height: "5px",
            width: "100%",
            marginBottom: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3
        }}>
            <PrettoSlider
                size={"small"}
                value={progress}
                min={0}
                step={1}
                max={100}
                onChange={(_, value) => seek(value)}
            />
        </Box>
    )
}