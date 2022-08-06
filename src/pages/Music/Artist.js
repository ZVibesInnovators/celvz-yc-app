import { Avatar, Box, Paper, styled, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { Loader } from "../../components/Misc";
import { EventDetailPageWrapper } from "../../components/styledComponents/events/EventStyles";
import { HeroWrapper, PlaylistThumbnailWrapper } from "../../components/styledComponents/musicStyles";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import _ from "lodash";
import Enums from "../../constants/enums";
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import { TabularSongList } from "./TopTracks";
import { ArtistesList } from "./MusicGenre";

const Artist = () => {
    const params = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const { showError } = useContext(AlertContext);
    const [isLoading, setLoading] = useState(true);
    const [artiste, setArtiste] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [sponsoredArtistes, setSponsoredArtistes] = useState([]);

    useEffect(() => {
        setLoading(true)
        getArtiste();
    }, [params]);


    const getArtiste = async () => {
        try {
            if (!params.id) throw Error("Please provide a valid artiste ID")
            const api = new API();
            const response = await api.request("get", `artistes/${params.id}?$include=artisteArt&$include=account`);
            const albumRes = await api.request("get", `albums?$or=artiste:${params.id}&$include=albumArt&$include=songs&$limit=100`);
            const songsRes = await api.request("get", `songs?$or=artiste:${params.id}&$include=songArt&$include=media&$include=artiste&$limit=100`);
            const sponsored = await api.request("get", "artistes/sponsored?$limit=10&$include=artisteArt&$include=account");
            console.log("albumRes =>", albumRes)

            setSponsoredArtistes(sponsored)
            setSongs(songsRes.data)
            setAlbums(albumRes.data)
            setArtiste(response)
            setLoading(false)
        } catch (error) {
            showError(error)
        }
    }

    const heroImage = useMemo(() => {
        return !_.isEmpty(artiste?.artisteArt) && artiste?.artisteArt[_.size(artiste?.artisteArt) - 1]
    }, [artiste])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: Enums.COLORS.grey_500,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        margin: "0px 10px 0px 0px",
        minWidth: "200px",
        maxWidth: "200px",
        height: "200px",
        cursor: "pointer",
        overflow: "hidden"
    }));

    return (
        <EventDetailPageWrapper style={{ background: "#000", marginBottom: "200px" }}>
            <Box sx={{ width: '100%' }}>
                {isLoading ?
                    <Loader />
                    :
                    <>
                        <HeroWrapper style={{
                            backgroundImage: `url(${heroImage?.meta?.secure_url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "40vh",
                        }}>
                            <Row className="mask h-100">
                                <Box
                                    className="p-2 col-md-6"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-end",
                                        marginTop: "20px",

                                        [`${theme.breakpoints.down(560)}`]: {
                                            flexDirection: "column",
                                            alignItems: "flex-start",

                                            "& .details": {
                                                marginTop: "10px"
                                            }
                                        }
                                    }}
                                >
                                    <Item sx={{ backgroundImage: `url(${!_.isEmpty(artiste?.artisteArt) && artiste?.artisteArt[0]?.meta?.secure_url})` }} />
                                    <Box className="details" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                                        <label><a onClick={() => navigate("/music")} style={{ color: "#FFF", cursor: "pointer" }}>Music</a>&nbsp;<span style={{ color: "#FFF" }}>/</span>&nbsp;Artist</label>
                                        <h1>{artiste?.name}</h1>
                                        <label style={{ color: "#FFF", textTransform: "none" }}>{artiste?.bio}</label>
                                    </Box>
                                </Box>
                            </Row>
                        </HeroWrapper>
                        {!_.isEmpty(albums) &&
                            <Box className="mx-3 mx-md-5 mt-5">
                                <Typography component={"h3"} className="mb-3" sx={{ color: "#FFF", fontSize: "25px" }}>Albums</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    overflowX: "auto"
                                }}>
                                    {_.map(albums, function (album) {
                                        return (
                                            <Box sx={{
                                                marginRight: "20px",
                                                "h5": {
                                                    color: "#FFF"
                                                }
                                            }}>
                                                <PlaylistThumbnailWrapper size={200}>
                                                    <Avatar
                                                        src={album.albumArt?.meta?.secure_url}
                                                        variant="square"
                                                        sx={{
                                                            width: 195, height: 195,
                                                            marginLeft: "10px",
                                                            marginTop: "10px",
                                                            marginRight: "2px"
                                                        }}
                                                        className="thumbnail"
                                                        style={{ background: "#6e6e6e" }}
                                                    />
                                                </PlaylistThumbnailWrapper>
                                                <Typography component={"h5"}>{album.title}</Typography>
                                            </Box>)
                                    })}
                                </Box>
                            </Box>
                        }

                        <Box className="mx-3 mx-md-5 mt-5">
                            <Typography component={"h3"} className="mb-3" sx={{ color: "#FFF", fontSize: "25px" }}>Songs</Typography>
                            {_.isEmpty(songs) ?
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    margin: "40px 5px 20px 5px",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <LibraryMusicOutlinedIcon sx={{
                                        color: Enums.COLORS.grey_500,
                                        fontSize: "150px"
                                    }} />
                                    <Typography component={"h5"} style={{ color: Enums.COLORS.grey_500, textAlign: "center" }}>We could not find any songs from this artist</Typography>
                                </Box>
                                :
                                <TabularSongList tracks={songs} />
                            }
                        </Box>
                        <Box>
                            {/* artiste list */}
                            <ArtistesList list={sponsoredArtistes} />
                        </Box>
                    </>
                }
            </Box>
        </EventDetailPageWrapper>
    )
}

export default Artist;