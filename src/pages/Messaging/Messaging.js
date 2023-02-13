import { Box, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Col, Row } from "reactstrap";
import { LargeHeroButton } from '../../components/home/CallToActionButtons';
import { BootstrapInput, Loader } from '../../components/Misc';
import { EventDetailPageWrapper } from "../../components/styledComponents/events/EventStyles";
import Enums from '../../constants/enums';
import { AlertContext } from '../../contexts/AlertContextProvider';
import API from '../../services/api';
import _ from "lodash";
import { AuthContext } from '../../contexts/AuthContext';
import HelpIcon from '@mui/icons-material/Help';
import { HeroWrapper } from "../../components/styledComponents/musicStyles";


const Messaging = () => {
    const [message, setMessage] = useState("");
    const [messageGroup, setMessageGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = useCallback(async (event) => {
        try {
            event.preventDefault();
            if (!message || message?.trim()?.length === 0) throw Error("Please type your message")
            setIsSending(true)
            const api = new API(authData?.token);
            const payload = { message, group: messageGroup?._id }
            if (messageGroup.requireAuth) payload["author"] = authData?.user?._id
            await api.request("post", `anon-messages/new`, payload);
            showAlert("success", "Your message has been sent successfully!")
            setMessage("");
            setIsSending(false)
        } catch (error) {
            showError(error.message);
        }
    }, [authData, messageGroup, message]);

    const fetch = async () => {
        try {
            const { stub } = params;
            setIsLoading(true)
            // get event details
            const api = new API();
            const response = await api.request("get", `anon-messages/groups?$or=slug:${stub}&$include=groupArt`);
            setIsLoading(false);
            setMessageGroup(_.isEmpty(response.data) ? null : response.data[0])
        } catch (error) {
            showError(error.message);
            navigate("/")
        }
    }

    useEffect(() => { if (params) fetch() }, [params])

    return (
        <EventDetailPageWrapper
            style={{
                paddingTop: 80,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            {isLoading ?
                <Loader />
                :
                !messageGroup ?
                    <Box sx={{
                        display: "flex",
                        margin: 2,
                        height: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "inherit",
                    }}>
                        <HelpIcon sx={{
                            color: Enums.COLORS.grey_400,
                            fontSize: 200
                        }} />
                        <Typography sx={{ color: Enums.COLORS.grey_400, fontSize: "20px" }}>Oops, we couldn&apos;t find what you were looking for</Typography>
                    </Box>
                    :
                    <Box>
                        <HeroWrapper style={{
                            backgroundImage: `url(${messageGroup?.groupArt?.meta?.secure_url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "40vh",
                        }}>
                            <Row className="mask h-100">
                                <Col md={6} className="p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginTop: "20px" }} >
                                    <label style={{ color: messageGroup?.properties?.nameColor || "inherit" }}><a onClick={() => navigate("/")} style={{ color: "#FFF", cursor: "pointer" }}>Home&nbsp;</a>&nbsp;<span style={{ color: "#FFF" }}>/</span>&nbsp;Messaging</label>
                                    <h1>&nbsp;</h1>
                                </Col>
                            </Row>
                        </HeroWrapper>
                        <Row className="mt-3">
                            <Col md="6" className="px-5">
                                <Box sx={{ display: "flex", flexDirection: "column", }}>
                                    <Typography sx={{ fontSize: "40px", fontWeight: "800", color: messageGroup?.properties?.nameColor || Enums.COLORS.white }}>{messageGroup.name}</Typography>
                                    <Typography sx={{ fontSize: "18px", color: messageGroup?.properties?.descColor || Enums.COLORS.white }}>{messageGroup.description}</Typography>
                                    <FormControl variant="standard" sx={{ marginTop: "50px" }}>
                                        <InputLabel shrink sx={{ color: messageGroup?.properties?.nameColor || Enums.COLORS.yellow }}>
                                            Message
                                        </InputLabel>
                                        <BootstrapInput
                                            multiline
                                            disabled={messageGroup.requireAuth && !authData}
                                            rows={3}
                                            components={Input} placeholder="Say Something..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        {(messageGroup.requireAuth && !authData) && <Typography sx={{ color: Enums.COLORS.orange }}>You must be Signed In to send a message</Typography>}
                                    </FormControl>
                                    <FormControl>
                                        <LargeHeroButton disabled={isSending || (messageGroup.requireAuth) && !authData} style={{ width: "200px", backgroundColor: messageGroup?.properties?.nameColor || Enums.COLORS.orange }} onClick={handleSubmit}>{isSending ? "Sending" : "Send"}</LargeHeroButton>
                                    </FormControl>
                                    <div>
                                        {messages.map((message, index) => (
                                            <div key={index}>{message}</div>
                                        ))}
                                    </div>
                                </Box>
                            </Col>
                        </Row>
                    </Box>
            }
        </EventDetailPageWrapper>
    );
};

export default Messaging;