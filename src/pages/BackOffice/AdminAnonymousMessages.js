import HelpIcon from '@mui/icons-material/Help';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import _ from 'lodash';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Col, Row } from 'reactstrap';
import NewMessageGroupModal from '../../components/BackOffice/MusicManager/NewMessageGroupModal';
import { Loader } from '../../components/Misc';
import Enums from '../../constants/enums';
import { AlertContext } from '../../contexts/AlertContextProvider';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../services/api';
import MessageGroupInfo from './MessageGroupInfo';

const newGroupModalRef = createRef();

const AdminAnonymousMessages = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isChanging, setChanging] = useState(false);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [messages, setMessages] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)

    useEffect(() => { if (authData) fetchData() }, [authData])

    const fetchData = async () => {
        try {
            const api = new API(authData?.token);
            const res = await api.request("get", "anon-messages/groups?$include=groupArt&$limit=5000")
            const mRes = await api.request("get", "anon-messages?$limit=10000&$include=author")
            setMessageGroups(res.data);
            console.log(res.data);
            setMessages(mRes.data);
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    const handleGroupSelect = (group) => {
        setSelectedGroup(null);
        setChanging(true)
        setTimeout(() => {
            setChanging(false)
            setSelectedGroup(group)
        }, 1000);
    }

    return (
        isLoading ?
            <Loader />
            :
            <Box sx={{ height: "calc(100vh - 150px)", overflow: "none" }}>
                <Row style={{ height: "100%" }}>
                    <Col md="4" style={{ borderRight: `1px solid ${Enums.COLORS.grey_400}`, height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                                <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                                    Dashboard
                                </Link>
                                <Typography sx={{ color: Enums.COLORS.yellow }}>Anonymous Messages</Typography>
                            </Breadcrumbs>
                            <Button onClick={() => newGroupModalRef.current.toggle(true)} size="small" variant='contained' color='inherit'>New Group</Button>
                        </Box>
                        <Box sx={{ flex: 1, overflow: "auto" }}>
                            {_.isEmpty(messageGroups) ?
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
                                    <Typography sx={{ color: Enums.COLORS.grey_400 }}>No Message Groups</Typography>
                                </Box>
                                :
                                _.map(messageGroups, function (group, i) {
                                    return (
                                        <Box
                                            key={i}
                                            onClick={() => handleGroupSelect(group)}
                                            sx={{
                                                padding: "10px",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: 'space-between',
                                                borderRadius: "5px",
                                                border: `1px solid ${selectedGroup?._id === group._id ? Enums.COLORS.yellow : Enums.COLORS.grey_400}`,
                                                marginBottom: "10px",
                                                background: selectedGroup?._id === group._id ? "rgba(85, 85, 85, 0.29)" : "inherit",

                                                ":hover": {
                                                    cursor: "pointer",
                                                    background: "rgba(85, 85, 85, 0.29)"
                                                }
                                            }}>
                                            <Box sx={{ flex: 1, overflowX: "hidden" }}>
                                                <Typography sx={{ color: selectedGroup?._id === group._id ? Enums.COLORS.yellow : Enums.COLORS.white }}>{group.name}</Typography>
                                                <Typography sx={{
                                                    color: Enums.COLORS.grey_400, overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    width: "80%",
                                                }}>{group.description}</Typography>
                                            </Box>
                                            <NavigateNextIcon sx={{ color: Enums.COLORS.grey_400 }} />
                                        </Box>
                                    )
                                })}
                        </Box>
                    </Col>
                    <Col md="8" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <Box sx={{ flex: 1, display: "flex", overflow: "auto", width: "100%" }}>
                            {isChanging ?
                                <Loader containerStyle={{ width: "inherit", height: "inherit", position: "relative", flex: 1 }} />
                                :
                                !selectedGroup ?
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
                                        <Typography sx={{ color: Enums.COLORS.grey_400 }}>Please select a Message Group to view its contents</Typography>
                                    </Box>
                                    :
                                    <MessageGroupInfo selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} messages={messages} refresh={fetchData} />
                            }
                        </Box>
                    </Col>
                </Row>
                // new groupd dialog
                <NewMessageGroupModal ref={newGroupModalRef} refresh={fetchData} />
            </Box>
    )
}

export default AdminAnonymousMessages;

