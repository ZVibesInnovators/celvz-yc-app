import { Box, Skeleton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from "reactstrap";
import { LargeHeroButton } from "../../components/home/CallToActionButtons";
import { GenreShimmer, GenreTile, GenreTilebody, GenreTitle, HeroWrapper } from "../../components/styledComponents/musicStyles";
import API from "../../services/api";
import TopTracks from "./TopTracks"
import _ from "lodash";
import { AlertContext } from "../../contexts/AlertContextProvider";
import NewReleases from "./NewReleases";

const RecommendedMusic = () => {
    const { showError } = useContext(AlertContext)
    const [isLoading, setLoading] = useState(true);
    const [album, setAlbum] = useState(null);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const api = new API();
            const albums = await api.request("get", `albums?$limit=1&$include=albumArt&$include=artiste`);
            const _genre = await api.request("get", "genre?$limit=4&$include=genreArt");
            const genreObj = {};
            _.forEach(_genre.data, function (entry, i) {
                genreObj[i] = entry
            })
            setAlbum(_.isEmpty(albums?.data) ? null : albums?.data[0]);
            setGenre(_genre.data);
            setLoading(false);
        } catch (error) {
            showError(error.message)
        }
    }
    return (
        <Box sx={{ marginBottom: "200px" }}>
            <HeroWrapper style={{ backgroundImage: `url(${album?.albumArt?.meta?.secure_url})` }}>
                <Row className="mask h-100">
                    <Col md={6} className="p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginTop: "20px" }} >
                        <h1>New Trending Album {album && `from ${album.artiste.firstName}`}</h1>
                        <label>Featured Content</label>
                        <LargeHeroButton style={{ width: "150px", fontSize: "15px", borderRadius: "50px", marginTop: 10 }}>Play All</LargeHeroButton>
                    </Col>
                    <Col md={6} className="p-4">
                        <Row style={{ justifyContent: "flex-end" }}>
                            <GenreTile
                                color={isLoading ? "transparent" : "#d81b60"}
                                bgImage={genre[0]?.genreArt?.meta?.secure_url}
                            >
                                {isLoading ? <GenreShimmer color="#d81b60" />
                                    :
                                    <GenreTilebody>
                                        <GenreTitle>{genre[0]?.name}</GenreTitle>
                                    </GenreTilebody>
                                }
                            </GenreTile>
                            <GenreTile
                                color={isLoading ? "transparent" : "#1d77be"}
                                bgImage={genre[1]?.genreArt?.meta?.secure_url}
                            >
                                {isLoading ? <GenreShimmer color="#1d77be" />
                                    :
                                    <GenreTilebody>
                                        <GenreTitle>{genre[1]?.name}</GenreTitle>
                                    </GenreTilebody>
                                }
                            </GenreTile>
                        </Row>
                        <Row style={{ justifyContent: "flex-end" }}>
                            <GenreTile
                                color={isLoading ? "transparent" : "#179bab"}
                                bgImage={genre[2]?.genreArt?.meta?.secure_url}
                            >
                                {isLoading ? <GenreShimmer color="#179bab" />
                                    :
                                    <GenreTilebody>
                                        <GenreTitle>{genre[2]?.name}</GenreTitle>
                                    </GenreTilebody>
                                }
                            </GenreTile>
                            <GenreTile
                                color={isLoading ? "transparent" : "#b59124"}
                                bgImage={genre[3]?.genreArt?.meta?.secure_url}
                            >
                                {isLoading ? <GenreShimmer color="#b59124" />
                                    :
                                    <GenreTilebody>
                                        <GenreTitle>{genre[3]?.name}</GenreTitle>
                                    </GenreTilebody>
                                }
                            </GenreTile>
                        </Row>
                    </Col>
                </Row>
            </HeroWrapper>
            {/* top tracks */}
            <TopTracks />
            {/* new releases */}
            <NewReleases />
        </Box>
    )
}

export default RecommendedMusic