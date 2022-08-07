import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React, { createRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Row } from "reactstrap";
import NewArtistForm from "../../components/BackOffice/MusicManager/NewArtistForm";
import NewGenreModal from "../../components/BackOffice/MusicManager/NewGenreModal";
import NewSongForm from "../../components/BackOffice/MusicManager/NewSongForm";
import StatsCard from "../../components/BackOffice/MusicManager/StatsCard";
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import { TabularSongList } from "../Music/TopTracks";

const MusicManager = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const { showError } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [newForm, setShowNewForm] = useState(null)
    const [tracks, setTracks] = useState([])
    const [tracksMeta, setTracksMeta] = useState(null);

    const newArtistFormRef = createRef();
    const newGenreModalRef = createRef();
    const newSongFormRef = createRef();

    useEffect(() => {
        if (authData) fetchStats();
    }, [authData])

    const fetchStats = async () => {
        try {
            const api = new API(authData?.token);
            const songsRes = await api.request("get", "songs");
            const artistesRes = await api.request("get", "artistes");
            const genreRes = await api.request("get", "genre");
            const albumsRes = await api.request("get", "albums");

            await getSongs()

            setStats({
                songs: songsRes.totalDocs,
                artistes: artistesRes.totalDocs,
                genre: genreRes.totalDocs,
                albums: albumsRes.totalDocs,
            })
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    const getSongs = async () => {
        try {
            const api = new API(authData?.token);
            const songs = await api.request("get", `songs?$limit=20&$include=media&$include=artiste&$include=songArt`);
            setTracks(songs.data)
            delete songs.data
            setTracksMeta(songs)
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                    Dashboard
                </Link>
                <Typography sx={{ color: Enums.COLORS.yellow }}>Music Manager</Typography>
            </Breadcrumbs>
            <Row className="mt-5">
                {/* songs */}
                <StatsCard
                    isLoading={isLoading}
                    label="Songs"
                    count={stats?.songs}
                    addNew={() => newSongFormRef.current?.toggle(true)}
                />
                {/* genres */}
                <StatsCard
                    isLoading={isLoading}
                    label="Genre"
                    count={stats?.genre}
                    addNew={() => newGenreModalRef.current?.toggle(true)}
                />
                {/* artists */}
                <StatsCard
                    isLoading={isLoading}
                    label="Artists"
                    count={stats?.artistes}
                    addNew={() => newArtistFormRef.current?.toggle(true)}
                />
                {/* albums */}
                <StatsCard
                    isLoading={isLoading}
                    label="Albums"
                    count={stats?.albums}
                />
            </Row>
            <Box>
                <h3>Songs</h3>
                <TabularSongList tracks={tracks} />
            </Box>
            {/* NEW ARTIST DRAWER */}
            <NewArtistForm ref={newArtistFormRef} refresh={fetchStats} />
            {/* NEW SONG DRAWER */}
            <NewSongForm ref={newSongFormRef} refresh={fetchStats} />
            {/* NEW GENRE MODAL */}
            <NewGenreModal ref={newGenreModalRef} refresh={fetchStats} />
        </Box>
    )
}

export default MusicManager;