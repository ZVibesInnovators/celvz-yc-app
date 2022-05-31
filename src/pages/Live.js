import _ from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Col, Form, Input, Row } from "reactstrap";
import socketIOClient from "socket.io-client";
import { Loader } from '../components/Misc';
import { EventDetailPageWrapper } from '../components/styledComponents/events/EventStyles';
import Enums from '../constants/enums';
import { AlertContext } from '../contexts/AlertContextProvider';
import { AuthContext } from '../contexts/AuthContext';
import API from '../services/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ChatBubble, LiveChatWrapper, LiveShow, VideoWrapper } from '../components/home/livePageStyles';
import ReactPlayer from 'react-player';



const Live = (props) => {
    const { isLoggedIn, authData } = useContext(AuthContext);
    const [liveStream, setLiveStream] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showError, showAlert } = useContext(AlertContext);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socket = useMemo(() => {
        return socketIOClient(Enums.BASE_URL.replace("/api/v1", ""), {
            transportOptions: {
                polling: {
                    // extraHeaders
                },
            },
        });
    }, []);

    useEffect(() => {
        if (liveStream) fetchMessages()
    }, [liveStream])

    const fetchMessages = useCallback(async (newChatData) => {
        try {
            if (newChatData) {
                console.log('newChatData', _.uniqBy([...chatMessages, newChatData], 'msgId'));
            }
            const api = new API();
            const { comments } = await api.request("get", `stream/${liveStream?._id}/comments?$include=user&$limit=${Math.pow(10, 5)}`);
            console.log("RES =>", comments);
            setChatMessages(comments.data)
        } catch (error) {
            showError(error.message)
        }
    }, [liveStream])

    useEffect(() => {
        try {
            setLoading(true);
            const api = new API();
            api.request("get", "stream?$or=isLive:true&$limit=1").then(streams => {
                setLoading(false);
                if (streams?.data?.length > 0) {
                    const stream = streams?.data[0]
                    setLiveStream(stream);
                    console.log("stream", stream);
                    const extraHeaders = {};
                    if (authData?.token) {
                        extraHeaders["authorization"] = authData.token;
                    }

                    socket.on("connected", () => {
                        socket.emit("join", {
                            channelId: stream.channelId
                        }, (data) => {
                            if (data.liveStream) {

                                showAlert("success", data.message);

                            } else {
                                showError(data.message)
                            }
                        });

                        socket.on(`live-chat-${stream.channelId}`, (newChatData) => {
                            // const msgAdded = chatMessages.map(m => m.msgId).includes(newChatData.msgId)
                            // if (!msgAdded) {
                            fetchMessages(newChatData)
                            // }
                        })
                    })
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

    const sendMessage = useCallback((e) => {
        try {
            e.preventDefault();
            if (!authData) throw Error("You must be logged in to join the live chat")
            socket.emit("send-message", {
                channelId: liveStream.channelId,
                message,
                stream: liveStream,
                user: authData?.user
            })
            setMessage("")
        } catch (error) {
            showError(error.message)
        }
    }, [authData, liveStream])

    return (
        <EventDetailPageWrapper>
            {loading ?
                <Loader />
                :
                <LiveShow>
                    <Form onSubmit={sendMessage}>
                        <Row>
                            <Col md={8}>
                                <h1>DISCOVER YOUR PURPOSE</h1>
                                <span>Youth Conference</span>
                                <Row className="mt-5">
                                    <Col xs={12} md={10} style={{ display: "flex", flexDirection: "row", justifyContent: "left" }}>
                                        <VideoWrapper id={"video-wrapper"}>
                                            {liveStream.stream?.url && <ReactPlayer
                                                width="100%"
                                                height="100%"
                                                // width={{document.getElementById("video-wrapper")?.offsetWidth}}
                                                // height={document.getElementById("video-wrapper")?.offsetHeight}
                                                url={liveStream.stream?.url} />}
                                        </VideoWrapper>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <LiveChatWrapper>
                                    <div className='chat-messages-screen'>
                                        {_.map(chatMessages, function (entry, i) {
                                            return (
                                                <ChatBubble key={i}>
                                                    <div className="flex-row">
                                                        <AccountCircleIcon sx={{ color: "#FFF", fontSize: 25 }} />
                                                        <div className='x-body'>
                                                            <span>{entry.comment}</span>
                                                            <small>{entry.user?.firstName || ""}</small>
                                                        </div>
                                                    </div>
                                                    <div className="footer">
                                                        <small>{entry.createdAt}</small>
                                                    </div>
                                                </ChatBubble>
                                            )
                                        })}
                                    </div>
                                    <Input value={message} onChange={(e) => setMessage(e.target.value)} />
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



