import { Box, Button, Collapse, Dialog, DialogActions, DialogTitle, Divider, FormControl, IconButton, Input, InputLabel, Typography } from "@mui/material";
import _ from "lodash";
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactPlayer from "react-player";
import { Col, Row } from "reactstrap";
import { OnAir, VideoWrapper } from "../../components/home/livePageStyles";
import { BootstrapInput, Loader } from "../../components/Misc";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import { NoLiveStream } from "../Live";
import TvOffIcon from '@mui/icons-material/TvOff';
import Enums from "../../constants/enums";
import moment from "moment";

const streamTemp = {
    title: "",
    isLive: true,
    description: "",
    stream: {
        url: ""
    }
};

const LiveStreams = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [showConfirmNew, setConfirmNew] = useState(false);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [streams, setStreams] = useState([]);
    const [newStream, setNewStream] = useState(streamTemp)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (authData) getStreams()
    }, [authData]);

    const getStreams = async () => {
        try {
            const api = new API(authData?.token);
            const response = await api.request("get", `stream?$include=event&$limit=${Math.pow(10, 5)}`);
            setStreams(response.data);
            setLoading(false)
        } catch (error) {
            showError(error.message);
            setLoading(false)
        }
    }

    const liveStream = useMemo(() => {
        return _.find(streams, function (s) {
            return s.isLive
        })
    }, [streams])

    const submit = () => {
        try {
            if (!newStream.title) throw Error("Please provide a title");
            if (!newStream.description) throw Error("Kindly input a description");
            if (!Enums.URL_REGEX.test(newStream.stream?.url)) throw Error("A valid video feed url is required")
            setNewStream((old) => ({ ...old, channelId: `CH-${moment().format("DDMMYY")}-${moment().format("HHMMSS")}` }))
            setConfirmNew(true)
        } catch (error) {
            showError(error.message);
        }
    }

    const startLiveStream = async () => {
        try {
            setConfirmNew(false)
            setSubmitting(true)
            const api = new API(authData?.token);
            await api.request("post", "stream", newStream);
            await getStreams();
            setNewStream(streamTemp);
            showAlert("success", "A new stream is now On Air")
            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
            showError(error.message);
        }
    }

    return (
        isLoading ?
            <Loader />
            :
            <Box>
                <Row>
                    <Col md={9} className="mr-auto" style={{ borderRight: "1px solid #333", display: "flex", minHeight: "400px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {!liveStream ?
                            <NoLiveStream style={{ height: "inherit", overflow: "hidden" }} />
                            : <VideoWrapper id={"video-wrapper"} style={{ margin: 0 }}>
                                {liveStream.stream?.url && <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={liveStream.stream?.url} />}
                            </VideoWrapper>}
                    </Col>
                    <Col md={3} className="ml-auto">
                        {liveStream && <Box>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <OnAir style={{ margin: "0px 10px" }}>
                                    <p style={{ fontSize: "18px", margin: "0px", color: "#cc0100" }}>ON-AIR</p>
                                </OnAir>
                                <IconButton color="primary" size="medium">
                                    <TvOffIcon sx={{ color: "#d7d7d7" }} />
                                </IconButton>
                            </Box>
                            <Box sx={{ marginY: 1 }}>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ color: Enums.COLORS.white, fontSize: 20 }}>New Live Stream</Typography>
                                </Box>
                                <Divider sx={{ color: Enums.COLORS.grey_400, marginY: 1 }} />
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Title
                                        </InputLabel>
                                        <BootstrapInput value={newStream.title} onChange={(e) => setNewStream({ ...newStream, title: e.target.value })} />
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Description
                                        </InputLabel>
                                        <BootstrapInput value={newStream.description} onChange={(e) => setNewStream({ ...newStream, description: e.target.value })} />
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Video Feed URL
                                        </InputLabel>
                                        <BootstrapInput value={newStream.stream.url} onChange={(e) => setNewStream({ ...newStream, stream: { ...newStream.stream, url: e.target.value } })} />
                                    </FormControl>
                                    <Button onClick={submit}
                                        disabled={submitting}
                                        sx={{
                                            minHeight: "40px",
                                            padding: "5px 15px",
                                            background: "#eee",

                                            ":hover": {
                                                background: Enums.COLORS.yellow,
                                                "span": {
                                                    color: `${Enums.COLORS.grey_500} !important`
                                                }
                                            },

                                            "span": {
                                                color: "#333 !important",
                                                fontSize: "13px"
                                            }
                                        }}><span>Start Streaming</span></Button>

                                    {/* confirmation dialog */}
                                    <Dialog onClose={() => setConfirmNew(false)} open={showConfirmNew}>
                                        <DialogTitle sx={{ textAlign: "center" }}>
                                            Start new Live Stream
                                            <Typography>Starting a new Live Stream would take any ongoing live stream off air</Typography>
                                            <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Do you want to proceed?</Typography>
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={() => setConfirmNew(false)}>Cancel</Button>
                                            <Button onClick={startLiveStream}>Start Stream</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </Box>
                        </Box>}
                    </Col>
                </Row>
            </Box>
    )
}

export default LiveStreams;