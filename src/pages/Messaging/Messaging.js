import { Avatar, Box, Button, Divider, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
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
import { ImSpinner9 } from 'react-icons/im';
import moment from "moment";


const Messaging = () => {
    const [message, setMessage] = useState(localStorage.getItem("amsg-temp") || "");
    const [messageGroup, setMessageGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const params = useParams();
    const location = useLocation()

    const navigate = useNavigate();
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    const callbackURL = useMemo(() => {
        return location.pathname
    }, [location])

    const isViewMode = useMemo(() => {
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        const mode = parameters.get('mode');
        const pin = parameters.get('pin');
        console.log("messageGroup", messageGroup?._id?.slice(-6));
        return mode === "view" && pin === messageGroup?._id?.slice(-6)
    }, [location, messageGroup])

    const handleSubmit = useCallback(async (event) => {
        try {
            event.preventDefault();
            if (!message || message?.trim()?.length === 0) throw Error("Please type your message")
            setIsSending(true)
            const api = new API(authData?.token);
            const payload = { message, group: messageGroup?._id }
            if (messageGroup.requireAuth) payload["author"] = authData?.user?._id
            await api.request("post", `anon-messages/new`, payload);
            localStorage.removeItem("amsg-temp")
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

    const loadMessages = useCallback(async () => {
        try {
            setIsLoadingMessages(true)
            // get event details
            const api = new API();
            const response = await api.request("get", `anon-messages?$or=group:${messageGroup?._id}&$limit=10000&$include=author`)
            setIsLoadingMessages(false);
            console.log("response", response);
            setMessages(_.isEmpty(response.data) ? [] : response.data)
        } catch (error) {
            showError(error.message);
        }
    }, [messageGroup])

    useEffect(() => { if (params) fetch() }, [params])

    useEffect(() => { if (isViewMode) loadMessages() }, [isViewMode])

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
                    <Box sx={{ width: "100%" }}>
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
                        {!isViewMode ? <Row className="mt-3">
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
                                            onChange={(e) => { setMessage(e.target.value); localStorage.setItem("amsg-temp", e.target.value) }}
                                        />
                                    </FormControl>

                                    {(messageGroup.requireAuth && !authData) ?
                                        <Box>
                                            <Typography sx={{ color: Enums.COLORS.orange }}>You must be Signed In to send a message</Typography>
                                            <Box sx={{ flexDirection: "row", display: "flex", gap: "20px" }}>
                                                <LargeHeroButton onClick={() => navigate(`/auth?callback=${callbackURL}`)} style={{ width: "100px", height: "50px", fontSize: "18px" }}>Sign In</LargeHeroButton>
                                                <Button onClick={() => navigate(`/auth/register?callback=${callbackURL}`)} style={{ width: "100px", height: "50px", fontSize: "18px", textTransform: "capitalize", backgroundColor: "#FFF", fontFamily: "Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" }}>
                                                    <Typography component={"p"} sx={{ color: Enums.COLORS.orange }}>Register</Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                        :
                                        <FormControl>
                                            <LargeHeroButton disabled={isSending || (messageGroup.requireAuth) && !authData} style={{ width: "200px", backgroundColor: messageGroup?.properties?.nameColor || Enums.COLORS.orange }} onClick={handleSubmit}>{isSending ? "Sending" : "Send"}</LargeHeroButton>
                                        </FormControl>
                                    }
                                </Box>
                            </Col>
                        </Row>
                            :
                            <Row className="mt-3">
                                <Col md="10" className="px-5 px-md-3 mx-auto">
                                    <Typography sx={{ fontSize: "40px", fontWeight: "800", color: messageGroup?.properties?.nameColor || Enums.COLORS.white }}>{messageGroup.name}</Typography>
                                    <Typography sx={{ fontSize: "18px", color: messageGroup?.properties?.descColor || Enums.COLORS.white }}>{messageGroup.description}</Typography>
                                    <Divider sx={{ my: 5 }} />
                                    {isLoadingMessages ?
                                        <div style={{
                                            backgroundColor: "#C40667",
                                            width: 50,
                                            height: 50,
                                            borderRadius: "50%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transform: "rotate(100deg)",
                                            margin: "auto"
                                        }}>
                                            <ImSpinner9 className='fa-spin' style={{ fontSize: 80, color: "#FFF", }} />
                                        </div>
                                        :
                                        _.isEmpty(messages) ?
                                            <Box sx={{
                                                display: "flex",
                                                margin: 2,
                                                height: "100%",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <HelpIcon sx={{
                                                    color: Enums.COLORS.grey_400,
                                                    fontSize: 100
                                                }} />
                                                <Typography sx={{ color: Enums.COLORS.grey_400 }}>No messages in this group</Typography>
                                            </Box>
                                            :
                                            <>
                                                <Typography sx={{ fontSize: "30px", fontWeight: "800", color: Enums.COLORS.white }}>Messages&nbsp;&middot;&nbsp;({_.size(messages)})</Typography>
                                                <Row style={{ marginTop: "20px" }}>
                                                    {_.map(messages, function (msg, i) {
                                                        return (
                                                            <Col key={i} className="mx-auto" xs={11} sm={6} lg={4} style={{ marginBottom: "10px" }}>
                                                                <Box
                                                                    sx={{
                                                                        padding: "10px",
                                                                        display: "flex",
                                                                        height: "100%",
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        justifyContent: 'space-between',
                                                                        borderRadius: "5px",
                                                                        border: `1px solid ${Enums.COLORS.grey_400}`,
                                                                        marginBottom: "10px",

                                                                        ":hover": {
                                                                            cursor: "pointer",
                                                                            background: "rgba(85, 85, 85, 0.29)"
                                                                        }
                                                                    }}>
                                                                    <Box sx={{ flex: 1, overflowX: "hidden" }}>
                                                                        <Typography sx={{ color: Enums.COLORS.white, fontSize: "20px" }}>{msg.message}</Typography>
                                                                        <Box sx={{ flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                            <Typography sx={{ color: Enums.COLORS.grey_400, fontSize: "14px" }}>{moment(msg.createdAt).format("DD-MMM-YYYY hh:mm a")}</Typography>
                                                                            {msg.author && <Box sx={{ flexDirection: "row", display: "flex", gap: "10px" }}>
                                                                                <Avatar sizes="xs" style={{ width: 20, height: 20 }} />
                                                                                <Typography sx={{ color: Enums.COLORS.yellow, fontSize: "14px" }}>{`${msg.author.firstName || ""} ${msg.author.lastName || ""}`}</Typography>
                                                                            </Box>
                                                                            }
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>
                                            </>
                                    }
                                </Col>
                            </Row>}
                    </Box>
            }
        </EventDetailPageWrapper>
    );
};

export default Messaging;