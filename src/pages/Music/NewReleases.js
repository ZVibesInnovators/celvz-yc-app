import { Box, Card, CardActions, CardContent, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from "reactstrap";
import { BoxShimmer, TrackList } from "../../components/styledComponents/musicStyles";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import _ from "lodash";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { MusicPlayerContext } from "../../contexts/MusicPlayerContext";
import { AuthContext } from "../../contexts/AuthContext";

const NewReleases = () => {
    const { showError } = useContext(AlertContext)
    const [isLoading, setLoading] = useState(true);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            setLoading(true)
            const api = new API();
            const _newReleases = await api.request("get", `songs/new?$include=artiste&$page=1&$limit=20&$include=media&$include=songArt`)
            setNewReleases(_.shuffle(_newReleases));
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Box>
            <TrackList style={{ height: "inherit" }}>
                <Row className="mask">
                    <h3>New Releases for You</h3>
                </Row>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: isLoading ? "flex-start" : "center"
                }}>
                    {isLoading ? <Shimmers /> : <>
                        {_.map(newReleases, function (release, i) {
                            return <ReleaseCard key={i} list={newReleases} data={release} index={i} />
                        })}
                    </>
                    }
                </Box>
            </TrackList>
        </Box>
    )
}

export default NewReleases;

const Shimmers = () => {
    return (_.map([1, 2, 3], function (i) {
        return (<BoxShimmer key={i} style={{ margin: 10 }} animation="wave" />)
    }))
}

const ReleaseCard = ({ data, index, list }) => {
    const { authData } = useContext(AuthContext)
    const { playNewSong, currentTrack, playing, setNewPlaylistTrack } = useContext(MusicPlayerContext);

    const currentlyPlaying = useMemo(() => {
        if (!playing) return false;
        return currentTrack && currentTrack?.id === data?.id
    }, [playing, currentTrack, data])

    const [hovered, setHovered] = useState(currentlyPlaying);

    useEffect(() => {
        setHovered(currentlyPlaying || currentTrack?._id === data?._id)
    }, [currentlyPlaying, currentTrack]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(currentlyPlaying)}
            sx={{
                width: 240,
                height: 300,
                margin: "10px",
                bgcolor: 'grey.900',
                display: "flex",
                flexDirection: "column",
                transition: "height .5s ease-out",


                "&:hover": {
                    cursor: "pointer",
                    height: 340,
                    marginTop: -1,
                    animation: "stretch 1s",

                    ".mask": {
                        backdropFilter: "blur(5px)"
                    }
                },

                ".mask": {
                    background: 'rgba(0, 0, 0,0.6)',
                    width: "100%",
                    height: "100%",
                    animation: 'fadeIn 2s',
                    opacity: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }
            }}>
            <CardContent sx={{
                flex: 1,
                backgroundImage: `url(${data?.songArt[0]?.meta?.secure_url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
                bgcolor: 'grey.800',
                padding: 0,
            }}>
                {hovered &&
                    <Box className="mask">
                        <IconButton>
                            <FavoriteBorderIcon sx={{ color: "#FFF", width: 30, height: 30 }} />
                        </IconButton>
                        <IconButton onClick={() => playNewSong({
                            songIndex: index,
                            list,
                        })}>
                            {currentlyPlaying ?
                                <PauseCircleOutlineOutlinedIcon sx={{ color: "#FFF", width: 80, height: 80, margin: "0px 10px" }} /> :
                                <PlayCircleOutlineOutlinedIcon sx={{ color: "#FFF", width: 80, height: 80, margin: "0px 10px" }} />
                            }
                        </IconButton>
                        <IconButton onClick={handleClick}>
                            <MoreHorizOutlinedIcon sx={{ color: "#FFF", width: 30, height: 30 }} />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem disabled={!authData} onClick={() => {
                                handleClose()
                                setNewPlaylistTrack(data);
                            }}>Add to Playlist</MenuItem>
                            <MenuItem onClick={handleClose}>Share</MenuItem>
                        </Menu>
                    </Box>}
            </CardContent>
            <CardActions
                onClick={() => setHovered(!hovered)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }}
            >
                <Typography sx={{
                    fontSize: 16,
                    color: "#d7d7d7",
                    m: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    {data.title}
                </Typography>
                <Typography
                    sx={{
                        color: "#777",
                        margin: "0px",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    style={{ marginLeft: "0px" }}
                >
                    {data.artiste?.firstName}
                </Typography>
            </CardActions>
        </Card>
    )
}