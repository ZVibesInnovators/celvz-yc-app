import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Backdrop, Box, Card, CardContent, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import _ from 'lodash';
import moment from "moment";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";

import socketIOClient from "socket.io-client";
import { ChatBubble, ChatDisabledWrapper, Flicker, LiveChatWrapper, LiveShow, LiveShowActions, OnAir, VideoWrapper } from '../components/home/livePageStyles';
import { Loader } from '../components/Misc';
import { EventDetailPageWrapper, NoLiveStreamWrapper } from '../components/styledComponents/events/EventStyles';
import { AddPlayListDismissBtn } from "../components/styledComponents/musicStyles";
import Enums from '../constants/enums';
import { AlertContext } from '../contexts/AlertContextProvider';
import { AuthContext } from '../contexts/AuthContext';
import { LiveChatContext } from "../contexts/LiveChatContext";
import API from '../services/api';
import { scrollToElm } from "../services/scrollTo";

const Live = (props) => {
    const navigate = useNavigate()
    const { isLoggedIn, authData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [showViewerModal, setshowViewerModal] = useState(false);
    const { showError } = useContext(AlertContext);
    const [connected, setConnected] = useState(false)
    const {
        fetchMessages,
        sendMessage,
        handleNewMessage,
        liveStream,
        setLiveStream,
        chatMessages,
        population,
        setPopulation,
        sendingMessage,
        message,
        setMessage
    } = useContext(LiveChatContext)

    const [socket, setSocket] = useState()

    useEffect(() => {
        const footer = document.getElementById("site-footer");
        // hide and show footer
        footer.style.display = loading ? "none" : "block"
        return () => {
            footer.style.display = "block"
        }
    }, [loading])

    useEffect(() => {
        const loader = async () => {
            if (liveStream) {
                const UUID = localStorage.getItem("UUID")
                if (!isLoggedIn && !authData?.user) {
                    // check if the device has been registered for the live stream
                    const api = new API();
                    let { data } = await api.request("get", `stream/${liveStream?._id}/viewers?$or=deviceId:${UUID}&$or=liveStream:${liveStream?._id}`)
                    // filter only records for the current live stream
                    data = _.filter(data, function (entry) { return entry?.liveStream === liveStream?._id })
                    // show name modal
                    setTimeout(() => setshowViewerModal(_.isEmpty(data)), 10000)
                } else {
                    addViewerInfo({
                        user: authData?.user?._id,
                        liveStream: liveStream?._id,
                        name: `${authData?.user?.firstName} ${authData?.user?.lastName} (${authData?.user?.phone})`,
                        deviceId: UUID
                    })
                }
            }
        }
        loader();
    }, [isLoggedIn, authData, liveStream])

    useEffect(() => {
        if (liveStream) fetchMessages()
    }, [liveStream])

    useEffect(() => {
        try {
            setLoading(true);
            const api = new API();
            api.request("get", "stream?$include=event&$or=isLive:true&$limit=1").then(streams => {
                setLoading(false);
                if (streams?.data?.length > 0) {
                    const stream = streams?.data[0]
                    setLiveStream(stream);
                    setPopulation(_.size(_.uniqBy(stream.viewers, function (v) {
                        return v.client && v.active && v.deviceId
                    })))
                }
            }).catch(error => {
                showError(error.message);
                setLoading(false);
            })
        } catch (error) {
            showError(error.message);
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        if (liveStream) {
            const connection = socketIOClient(Enums.BASE_URL.replace("/api/v1", "")
                // , {
                //     // 'reconnection': true,
                //     // 'reconnectionDelay': 5000,
                //     // 'reconnectionAttempts': 20,
                //     transportOptions: {
                //         polling: {
                //             // extraHeaders
                //         },
                //     },
                // }
            );
            setSocket(connection);
        }
    }, [liveStream])

    useEffect(() => {
        socket?.on("connect", () => {
            setConnected(true);
            socket.emit("identity", authData?.user?._id, (v) => {
                setConnected(true);
                const UUID = localStorage.getItem("UUID")
                socket.emit("subscribe", { liveStream, user: authData?.user, deviceId: UUID })
            });
        })

        socket?.on("new-message", handleNewMessage)

        socket?.on("audience-size", (v) => {
            if (population !== v) setPopulation(v);
        })

        socket?.on("disconnect", () => {
            setConnected(false)
        })

        socket?.on("live-page-refresh", () => window.location.reload())

        return () => {
            socket?.emit("unsubscribe")
            socket?.emit("disconnect")
        }
    }, [socket, liveStream, authData]);

    useEffect(() => {
        const box = document.querySelector('.chat-messages-screen');
        const targetElm = document.querySelector(`#bubble-${_.size(chatMessages) - 1}`);
        if (targetElm) scrollToElm(box, targetElm, 600);
    }, [chatMessages])

    useEffect(() => {
        let interval;
        const fetch = async () => {
            try {
                const api = new API();
                const { totalDocs } = await api.request("get", `stream/${liveStream?._id}/viewers`)
                setPopulation(totalDocs)
            } catch (error) {
                console.log(error.message);
            }
        }
        if (liveStream) interval = setInterval(() => fetch(), 30000);

        return () => {
            clearInterval(interval)
        }
    }, [liveStream])

    const addViewerInfo = useCallback(async (data) => {
        try {
            const api = new API(authData?.token);
            await api.request("post", "stream/addViewer", data);
        } catch (error) {
            showError(error.message)
        }
    }, [authData])

    return (
        <EventDetailPageWrapper>
            {
                loading ?
                    <Loader />
                    :
                    !liveStream ?
                        <NoLiveStream />
                        :
                        <LiveShow>
                            <ViewerInfoForm liveStream={liveStream} show={showViewerModal} addViewerInfo={addViewerInfo} close={() => setshowViewerModal(false)} />
                            <Form onSubmit={sendMessage}>
                                <Row>
                                    <Col md={8}>
                                        <Row>
                                            <Col xs={12} md={12} style={{ display: "flex", flexDirection: "row", justifyContent: "left" }}>
                                                <VideoWrapper id={"video-wrapper"}>
                                                    {liveStream.stream?.url && <ReactPlayer
                                                        width="100%"
                                                        height="100%"
                                                        url={liveStream.stream?.url} />}
                                                </VideoWrapper>
                                            </Col>
                                        </Row>

                                        <h1>{liveStream?.event?.title || liveStream?.title}</h1>
                                        <LiveShowActions>
                                            <span>{population} watching now&nbsp;&middot;&nbsp;Streaming started on {moment(liveStream.createdAt).format('DD MMM YYYY')}</span>
                                            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", m: 0, p: 0 }}>
                                                <IconButton sx={{ margin: "10px 10px 0px 50px" }}>
                                                    <ShareIcon sx={{ color: "#FFF", fontSize: 20 }} />
                                                </IconButton>
                                                <IconButton sx={{ margin: "10px 10px 0px 10px" }}>
                                                    <CropFreeOutlinedIcon sx={{ color: "#FFF", fontSize: 20 }} />
                                                </IconButton>
                                                {liveStream.isLive &&
                                                    <OnAir>
                                                        <span>LIVE</span>
                                                    </OnAir>}
                                            </Box>
                                        </LiveShowActions>
                                        <Box sx={{ mb: 2 }}>
                                            <span style={{ color: "#d7d7d7" }}>{liveStream?.event?.description}</span>
                                        </Box>
                                    </Col>
                                    <Col md={4}>
                                        <LiveChatWrapper online={connected && liveStream?.isLive}>
                                            <div className="header-wrapper">
                                                <h5>Live Chat</h5>
                                                <div className="status-indicator" />
                                            </div>
                                            <div className='chat-messages-screen'>
                                                {_.map(chatMessages, function (entry, i) {
                                                    return (
                                                        <ChatBubble key={i} id={`bubble-${i}`}>
                                                            <div className="flex-row">
                                                                <AccountCircleIcon sx={{ color: entry.color, fontSize: 25 }} />
                                                                <div className='x-body'>
                                                                    <small>{entry.user?.firstName || ""}</small>
                                                                    <span>{entry.comment}</span>
                                                                </div>
                                                            </div>
                                                        </ChatBubble>
                                                    )
                                                })}
                                            </div>
                                            <div className="input-wrapper">
                                                {liveStream.isLive ?
                                                    isLoggedIn ?
                                                        <>
                                                            <Input
                                                                value={message}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                                placeholder="Say Something..."
                                                                maxLength={200}
                                                            />
                                                            <div className="info">
                                                                <small>{message?.trim().length || 0}/200</small>{
                                                                    sendingMessage ?
                                                                        <CircularProgress size={20} style={{ margin: "0px 0px 0px 10px" }} />
                                                                        :
                                                                        <IconButton
                                                                            sx={{ margin: "0px 0px 0px 10px" }}
                                                                            onClick={sendMessage}
                                                                            disabled={message.trim().length == 0}
                                                                        >
                                                                            <SendOutlinedIcon sx={{ color: "#FFF", fontSize: 20 }} />
                                                                        </IconButton>
                                                                }

                                                            </div>
                                                        </>
                                                        : <ChatDisabledWrapper>
                                                            <Button type="button" onClick={() => navigate("/auth")}>SIGN IN TO CHAT</Button>
                                                            <span>Live Chat is currently disabled</span>
                                                        </ChatDisabledWrapper>
                                                    :
                                                    <ChatDisabledWrapper>
                                                        <span>Chat is closed. Live Stream has ended</span>
                                                    </ChatDisabledWrapper>
                                                }
                                            </div>
                                        </LiveChatWrapper>
                                    </Col>
                                </Row>
                            </Form>
                        </LiveShow>
            }
        </EventDetailPageWrapper>
    )
}

export default Live

export const NoLiveStream = (props) => {

    return <NoLiveStreamWrapper {...props}>
        <Flicker>
            <div id="text">
                <h1>OFF&nbsp;<span id="offset">A</span>IR</h1>
            </div>
        </Flicker>
    </NoLiveStreamWrapper>
}

const ViewerInfoForm = ({ show, addViewerInfo, liveStream, close }) => {
    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(false);
    const { showError } = useContext(AlertContext);

    const handleSubmit = async () => {
        try {
            if (!payload.name) throw Error("Please provide your full name")
            setLoading(true)
            const UUID = localStorage.getItem("UUID")
            await addViewerInfo({
                liveStream: liveStream?._id,
                name: `${payload.name}${payload.phone ? ` (${payload.phone})` : ""}`,
                deviceId: UUID
            })
            setLoading(false);
            close();
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    return (
        <Backdrop
            sx={{
                color: '#fff',
                backdropFilter: "blur(8px)",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={show}
        >
            <Card sx={{
                width: "40vw",
                maxWidth: "500px",
                minHeight: "400px",
                background: "#060505",
                maxHeight: "600px",
                padding: "0px",
                display: "flex",
                flexDirection: "column",

                "@media only screen and (max-width: 600px)": {
                    width: "90vw !important"
                }
            }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography
                        component={"h1"}
                        sx={{
                            color: "#FFF",
                            fontSize: "30px",
                            textAlign: "center",
                            marginLeft: "0px !important"
                        }}
                    >We&apos;d like to know you</Typography>
                    <Divider sx={{ background: "#D3006C" }} />
                    <Box sx={{ width: "80%", margin: "auto" }}>
                        <Form className="form-group" onSubmit={handleSubmit}>

                            <FormGroup className="mb-3 mt-5" style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{
                                    color: "#FFF",
                                    background: "#c42167",
                                    padding: "0px 3px",
                                    borderRadius: "5px",
                                    marginBottom: "1px",
                                    width: "fit-content",
                                    marginRight: "10px"
                                }}>Full Name <small>(Surname first)</small></label>
                                <Input
                                    type='text'
                                    placeholder='Fullname'
                                    name={"name"}
                                    value={payload.name}
                                    onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3 mt-5" style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{
                                    color: "#FFF",
                                    background: "#c42167",
                                    padding: "0px 3px",
                                    borderRadius: "5px",
                                    marginBottom: "1px",
                                    width: "fit-content",
                                    marginRight: "10px"
                                }}>Phone Number</label>
                                <Input
                                    type='text'
                                    placeholder='Phone'
                                    name={"phone"}
                                    value={payload.phone}
                                    onChange={(e) => setPayload({ ...payload, phone: e.target.value })}
                                />
                            </FormGroup>
                        </Form>
                    </Box>
                </CardContent>
                <AddPlayListDismissBtn disabled={loading} onClick={() => handleSubmit()}>
                    CONTINUE WATCHING
                </AddPlayListDismissBtn>
            </Card>
        </Backdrop>)
}