import { Box, ImageList, ImageListItem, Paper, Stack, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { Loader } from "../../components/Misc";
import { EventDetailPageWrapper } from "../../components/styledComponents/events/EventStyles";
import { HeroWrapper } from "../../components/styledComponents/musicStyles";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import { ReleaseCard } from "./NewReleases";
import _ from "lodash";
import { TabularSongList } from "./TopTracks";
import Enums from "../../constants/enums";
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';

const MusicGenre = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const { showError } = useContext(AlertContext);
    const [songs, setSongs] = useState([]);
    const [responseMeta, setResponseMeta] = useState(null);
    const [genre, setGenre] = useState(null);
    const [allGenre, setAllGenre] = useState([]);
    const [sponsoredArtistes, setSponsoredArtistes] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getGenreContent();
    }, [page, params]);

    const getGenreContent = async () => {
        try {
            const { id } = params;
            const api = new API();
            if (!genre || id !== genre?._id) {
                const gResponse = await api.request("get", `genre/${id}?$include=genreArt`)
                const _genre = await api.request("get", "genre?$limit=4&$include=genreArt");
                const sponsored = await api.request("get", "artistes/sponsored?$limit=10&$include=artisteArt&$include=account");
                setGenre(gResponse);
                setAllGenre(_.shuffle(_genre.data));
                setSponsoredArtistes(sponsored)
            }
            const response = await api.request("get", `songs?$or=genre:${id}&$include=media&$include=artiste&$include=songArt&$limit=20&$page=${page}`);
            setSongs(response.data);
            setResponseMeta(response);
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <EventDetailPageWrapper style={{ background: "#000", marginBottom: "200px" }}>
            <Box sx={{ width: '100%' }}>
                {isLoading ?
                    <Loader />
                    :
                    <>
                        <HeroWrapper style={{
                            backgroundImage: `url(${genre?.genreArt?.meta?.secure_url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "40vh",
                        }}>
                            <Row className="mask h-100">
                                <Col md={6} className="p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginTop: "20px" }} >
                                    <label><a onClick={() => navigate("/music")} style={{ color: "#FFF", cursor: "pointer" }}>Music</a>&nbsp;<span style={{ color: "#FFF" }}>/</span>&nbsp;Genre</label>
                                    <h1>{genre?.name}</h1>
                                    <label style={{ color: "#FFF", textTransform: "none" }}>{genre?.description}</label>
                                </Col>
                            </Row>
                        </HeroWrapper>
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
                                <Typography component={"h5"} style={{ color: Enums.COLORS.grey_500, textAlign: "center" }}>There are currently no songs in this genre.<br />Please check back at a future time as we are always updating our music collection</Typography>
                            </Box>
                            :
                            <>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: isLoading ? "flex-start" : "center",
                                    margin: "30px auto"
                                }}>
                                    {_.map(_.slice(_.shuffle(songs), 0, 4), function (song, i) {
                                        return <ReleaseCard key={i} list={songs} data={song} index={i} />
                                    })}
                                </Box>
                                <Box className="mx-3 mx-md-5">
                                    <TabularSongList tracks={songs} />
                                </Box>
                            </>
                        }
                        {/* genres grid */}
                        <GenreGrid genres={allGenre} selected={params?.id} />
                        {/* artiste list */}
                        <ArtistesList list={sponsoredArtistes} />
                    </>
                }
            </Box>
        </EventDetailPageWrapper>)
}

export default MusicGenre;


export const GenreGrid = ({ genres, selected }) => {
    const navigate = useNavigate();
    const dataList = useMemo(() => {
        const entries = _.map(genres, function (entry, i) {
            return {
                ...entry,
                rows: i == 0 ? 2 : 1,
                cols: (i == 0 || i == 3) ? 2 : 1
            }
        });
        return entries;
    }, [genres])

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <Box className="mx-3 mx-md-5 mt-5">
            <Typography component={"h3"} className="mb-3" sx={{ color: "#FFF", fontSize: "25px" }}>Music Genre</Typography>
            <ImageList
                sx={{ width: "100%", }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
                {dataList.map((item) => (
                    <ImageListItem
                        key={item._id}
                        cols={item.cols || 1} rows={item.rows || 1}
                        onClick={() => navigate(`/music/genre/${item._id}`)}
                        sx={{
                            cursor: "pointer",

                            "& img.grey": {
                                WebkitFilter: 'grayscale(100%) !important',
                                filter: 'grayscale(100%) !important'
                            }
                        }}
                    >
                        <img
                            {...srcset(item.genreArt?.meta.secure_url, 121, item.rows, item.cols)}
                            alt={item.name}
                            loading="lazy"
                            className={selected === item._id ? "grey" : "normal"}
                        />
                        <Box
                            className={selected === item._id && "selected"}
                            sx={{
                                height: "100%",
                                background: "rgba(0, 0, 0,0.6)",
                                width: "100%",
                                position: "absolute",
                                bottom: "0px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",

                                "h5": {
                                    color: "#FFF",
                                    marginLeft: "10px",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },

                                "&.selected": {
                                    "h5": {
                                        color: Enums.COLORS.yellow
                                    }
                                },

                                "&:hover": {
                                    backdropFilter: "blur(4px)",

                                    "h5": {
                                        color: Enums.COLORS.orange
                                    }
                                }
                            }}>
                            <Box sx={{
                                height: "30px",
                                width: "100%",
                                background: "#00000075",
                                backdropFilter: "blur(5px)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <Typography component={"h5"}>{item.name}</Typography>
                            </Box>
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}

export const ArtistesList = ({ list }) => {
    const navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: Enums.COLORS.grey_500,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        margin: "10px",
        minWidth: "200px",
        maxWidth: "200px",
        height: "200px",
        cursor: "pointer",
        overflow: "hidden"
    }));

    return (
        !_.isEmpty(list) &&
        <Box className="mx-3 mx-md-5 mt-5">
            <Typography component={"h3"} className="mb-3" sx={{ color: "#FFF", fontSize: "25px" }}>Sponsored Artists</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto"
            }}>
                {_.map(list, function (artiste) {
                    return (
                        <Item
                            onClick={() => navigate(`/music/artists/${artiste._id}`)}
                            key={artiste._id}
                            sx={{
                                backgroundImage: `url(${artiste?.artisteArt[0].meta?.secure_url})`
                            }}>
                            <Box sx={{
                                padding: "5px",
                                height: "25px",
                                background: "rgba(0,0,0,0.7)",
                                width: "fit-content",
                                maxWidth: "80%",
                                padding: "0px 10px",
                                backdropFilter: "blur(5px)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",

                                "& p": {
                                    color: "#FFF",
                                    margin: "0px",
                                }
                            }}>
                                <Typography component={"p"}
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>{artiste.name}</Typography>
                            </Box>
                        </Item>
                    )
                })}
            </Box>
        </Box>
    )
}