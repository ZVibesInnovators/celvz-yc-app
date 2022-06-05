import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Box, CircularProgress, IconButton } from "@mui/material";
import _ from 'lodash';
import moment from "moment";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "reactstrap";
import socketIOClient from "socket.io-client";
import { ChatBubble, ChatDisabledWrapper, Flicker, LiveChatWrapper, LiveShow, LiveShowActions, OnAir, VideoWrapper } from '../components/home/livePageStyles';
import { Loader } from '../components/Misc';
import { EventDetailPageWrapper, NoLiveStreamWrapper } from '../components/styledComponents/events/EventStyles';
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
    const { showError, showAlert } = useContext(AlertContext);
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

        return () => {
            socket?.emit("unsubscribe")
        }
    }, [])

    useEffect(() => {
        if (liveStream) {
            const connection = socketIOClient(Enums.BASE_URL.replace("/api/v1", ""), {
                'reconnection': true,
                'reconnectionDelay': 5000,
                'reconnectionAttempts': 20
            });
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
    }, [socket, liveStream, authData]);

    useEffect(() => {
        const box = document.querySelector('.chat-messages-screen');
        const targetElm = document.querySelector(`#bubble-${_.size(chatMessages) - 1}`);
        if (targetElm) scrollToElm(box, targetElm, 600);
    }, [chatMessages])


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

const NoLiveStream = () => {

    return <NoLiveStreamWrapper>
        <Flicker>
            <div id="text">
                <h1>OFF&nbsp;<span id="offset">A</span>IR</h1>
            </div>
        </Flicker>
    </NoLiveStreamWrapper>
}

