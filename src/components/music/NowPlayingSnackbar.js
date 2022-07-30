import { Avatar, Box, Paper, Slide, Snackbar, Typography } from "@mui/material";
import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import _ from "lodash";

const NowPlayingSnackBar = forwardRef((props, ref) => {
    const { currentTrack, playing, playNewSong } = useContext(MusicPlayerContext);
    const [showSnackbar, toggleSnackBar] = useState(false)

    useImperativeHandle(ref, () => ({
        toggleSnackBar: (v) => toggleSnackBar(v)
    }))

    return (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={() => toggleSnackBar(false)}
            onClick={() => toggleSnackBar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Paper variant="elevation" sx={{
                width: '100%',
                minWidth: "300px",
                maxWidth: "300px",
                background: "#171717",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Avatar
                    src={!_.isEmpty(currentTrack?.songArt) && currentTrack.songArt[0]?.meta?.secure_url}
                    variant="square"
                    sx={{ width: 50, height: 50 }}
                    className="thubnail"
                    style={{ background: "#d7d7d7" }}
                />
                <Box
                    sx={{ flex: 1, padding: "0px 10px", display: "flex", flexDirection: "column" }}>
                    <Typography component={"small"} sx={{
                        color: "#FFF",
                        fontSize: "15px",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>{currentTrack?.artiste?.firstName}</Typography>
                    <Typography component={"small"} sx={{
                        color: "#555",
                        fontSize: "12px",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>{currentTrack?.title}</Typography>
                </Box>
                <GraphicEqOutlinedIcon sx={{ color: "#d3006c", width: 30, height: 30, margin: "0px 5px" }} />
            </Paper>
        </Snackbar>
    )
})

export default NowPlayingSnackBar;