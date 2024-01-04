import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Avatar, Box, Button, Divider, FormControl, Input, InputLabel, Switch, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import React, { createRef, useContext, useMemo, useState } from 'react';
import { Col, Row } from 'reactstrap';
import FileSelectorModal from "../../components/BackOffice/FileManager/FileSelectorModal";
import MUIColorPicker from "../../components/ColorPicker";
import { BootstrapInput } from '../../components/Misc';
import Enums from '../../constants/enums';
import { AlertContext } from '../../contexts/AlertContextProvider';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../services/api';
import ConfirmationDialog from './ConfirmationDialog';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const confirmRef = createRef();
const fileSelectorRef = createRef();

const MessageGroupInfo = ({ messages, selectedGroup, setSelectedGroup, refresh }) => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(false);
    const [showDelete, showConfirmDelete] = useState(false);
    const initialData = { ...selectedGroup }
    const [group, setGroup] = useState(initialData)
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);

    const groupMessages = useMemo(() => {
        return messages?.filter(m => {
            return m.group === group._id
        })
    }, [group, messages])

    const submit = async () => {
        try {
            confirmRef.current.close()
            if (!group?.name) throw Error("Kindly provide a name for this group");
            if (!group?.description) throw ("A breif description is required for the group");
            if (!group?.slug) throw Error("Please provide a URL Slug");
            const payload = { ...group }
            // replace the object in groupArt with the id only
            if (typeof payload?.groupArt === "object") {
                payload["groupArt"] = payload.groupArt?._id
            }
            setLoading(true)
            const api = new API(authData?.token);
            await api.request("patch", `anon-messages/groups/${group._id}`, payload)
            showAlert("success", "Message Group Updated Successfully");
            setLoading(false)
            refresh();
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    const openConfirmation = (data) => {
        confirmRef.current.open(data)
    }

    const confirmUpdate = () => {
        openConfirmation({
            title: "Update Message Group",
            description: "Are you sure you want to proceed?",
            submitText: "Update Group",
            confirm: () => submit()
        })
    }

    const confirmDelete = () => {
        openConfirmation({
            title: "Delete Message Group",
            description: "Deleting this message group will permanently remove it from our database and will prevent users from visiting its related link\nAre you sure you want to proceed?",
            submitText: "Delete Group",
            confirm: () => deleteGroup()
        })
    }

    const deleteGroup = async () => {
        try {
            showAlert("info", `Deleting Group "${group.name}" in the background`);
            const api = new API(authData?.token);
            await api.request("delete", `anon-messages/groups/${group._id}`, group)
            confirmRef.current.close()
            setSelectedGroup(null)
            refresh()
            showAlert("success", `Group "${group.name}" has been successfully deleted`);
        } catch (error) {
            showError(error.message)
        }
    }

    const handleColorChange = (fieldName, colorCode) => {
        setGroup({
            ...group,
            properties: {
                ...group.properties,
                [fieldName]: colorCode || "#FFF"
            }
        })
    }

    const selectPhoto = (index) => {
        try {
            fileSelectorRef.current.toggle(true)
            fileSelectorRef.current.setIndex(index)
        } catch (error) {
            showError(error.message)
        }
    }

    const handleImageSelect = (data) => {
        try {
            console.log(data);
            setGroup((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <>
            <ConfirmationDialog ref={confirmRef} />
            <Row style={{ height: "100%" }}>
                <Col md={6} style={{ borderRight: `1px solid ${Enums.COLORS.grey_400}` }}>
                    <Typography sx={{ fontSize: "30px", fontWeight: "800", color: group?.properties?.nameColor || Enums.COLORS.yellow }}>{group.name}</Typography>
                    <Typography sx={{ color: group?.properties?.descColor || Enums.COLORS.white }}>{group.description}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", color: Enums.COLORS.grey_400 }}>
                        <Typography sx={{ color: Enums.COLORS.grey_400 }}>{moment(group.createdAt).format("DD-mm-YYYY hh:mm a")}</Typography>
                        &nbsp;&middot;&nbsp;
                        <Typography sx={{ color: Enums.COLORS.grey_400 }}>{group.slug}</Typography>
                        <>
                            &nbsp;&middot;&nbsp;
                            <SafetyCheckIcon sx={{ color: Enums.COLORS[group.requireAuth ? "yellow" : "grey_400"] }} />
                        </>
                    </Box>
                    <a style={{ color: Enums.COLORS.yellow }} href={window.location.origin + `/msg/` + group.slug} target="_blank">{window.location.origin + `/msg/` + group.slug}</a>
                    <Box sx={{ marginTop: "50px", paddingTop: "50px", borderTop: `1px solid ${Enums.COLORS.grey_400}` }}>
                        <Box sx={{
                            marginBottom: 1,
                            "h2": {
                                color: "#FFF",
                                fontSize: 25,
                                marginBottom: "2px",
                            },
                            "span": {
                                color: "#FFF",
                                fontSize: 15,
                            }
                        }}>
                            <h2>Update Message Group</h2>
                            <span>Modify this Anonymous Message Group</span>
                        </Box>
                        <Divider />
                        <Row>
                            <Col md={12}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                    Hero Art (Optional)
                                </InputLabel>
                                <Box sx={{
                                    border: "2px dashed #d7d7d7",
                                    width: "100%",
                                    height: "200px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${group?.groupArt?.meta?.secure_url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "top",
                                    backgroundRepeat: "no-repeat",
                                    ".mask": {
                                        display: "none"
                                    },

                                    ":hover": {
                                        cursor: "pointer",

                                        ".mask": {
                                            background: 'rgba(0, 0, 0,0.6)',
                                            width: "100%",
                                            height: "100%",
                                            animation: 'fadeIn 2s',
                                            opacity: 1,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }
                                    }
                                }}>
                                    <Box className="mask" onClick={() => selectPhoto("groupArt")}>
                                        <AddPhotoAlternateIcon sx={{ color: Enums.COLORS.white, fontSize: 40 }} />
                                    </Box>
                                </Box>
                            </Col>
                            <Col md={12}>
                                <Box sx={{
                                    marginTop: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow, fontSize: 20 }}>
                                        Require Authentication
                                    </InputLabel>
                                    <Switch checked={group?.requireAuth} onChange={() => setGroup({ ...group, requireAuth: !group?.requireAuth })} />
                                </Box>
                                <small style={{ color: "#d7d7d7", fontSize: 12 }}>Enabling this will require that users MUST be signed in before they are allowed to comment on this message group</small>
                            </Col>
                            <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                                <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                        Group Name
                                    </InputLabel>
                                    <Box sx={{ alignSelf: "flex-end" }}>
                                        <MUIColorPicker value={group.properties?.nameColor} name="nameColor" onChange={handleColorChange} />
                                    </Box>
                                </Box>
                                <FormControl variant="standard" sx={{ marginY: 2 }}>
                                    <BootstrapInput components={Input} value={group.name} placeholder="Give it a great name" onChange={(e) => {
                                        const data = { ...group, name: e.target.value };
                                        data["slug"] = e.target.value.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-')
                                        setGroup(data)
                                    }} />
                                </FormControl>
                            </Col>
                            <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                                <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                        Description
                                    </InputLabel>
                                    <Box sx={{ alignSelf: "flex-end" }}>
                                        <MUIColorPicker value={group.properties?.descColor} name="descColor" onChange={handleColorChange} />
                                    </Box>
                                </Box>
                                <FormControl variant="standard" sx={{ marginY: 2 }}>
                                    <BootstrapInput components={Input} value={group.description} placeholder="Let users know what this message group is about" multiline rows={4} onChange={(e) => setGroup({ ...group, description: e.target.value })} />
                                </FormControl>
                            </Col>
                            <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                                <FormControl variant="standard" sx={{ marginY: 2 }}>
                                    <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                        URL Slug
                                    </InputLabel>
                                    <BootstrapInput components={Input} value={group.slug} placeholder="my-url-slug" onChange={(e) => setGroup({ ...group, slug: e.target.value?.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-') })} />
                                    <small style={{ color: Enums.COLORS.grey_400, fontSize: 12 }}>This uniquely identifies each message group and will be used to create a unique link</small>
                                </FormControl>
                            </Col>
                        </Row>
                        <Box sx={{
                            marginY: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>

                            <Button
                                disabled={isLoading}
                                onClick={confirmDelete} sx={{
                                    marginX: "5px",
                                    minHeight: "40px",
                                    padding: "5px 15px",
                                    background: isLoading ? Enums.COLORS.grey_400 : Enums.COLORS.orange,
                                    color: `${Enums.COLORS.white} !important`,

                                    ":hover": {
                                        background: "#eee",
                                        color: "#333 !important"
                                    },

                                }}
                            >
                                <DeleteIcon sx={{ marginRight: "5px" }} />
                                <span>{isLoading ? "Please Wait..." : "Delete"}</span>
                            </Button>

                            <Button
                                disabled={isLoading}
                                onClick={confirmUpdate} sx={{
                                    marginX: "5px",
                                    minHeight: "40px",
                                    padding: "5px 15px",
                                    background: isLoading ? Enums.COLORS.grey_400 : Enums.COLORS.yellow,
                                    color: `${Enums.COLORS.grey_500} !important`,

                                    ":hover": {
                                        background: "#eee",
                                        color: "#333 !important"
                                    },
                                }}
                            >
                                {isLoading ? "Please Wait..." : "Update"}
                                <TaskAltIcon sx={{ marginLeft: "5px" }} />
                            </Button>
                        </Box>
                    </Box>
                </Col>
                <Col md={6} style={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: "30px", fontWeight: "800", color: Enums.COLORS.white }}>Messages&nbsp;&middot;&nbsp;({_.size(groupMessages)})</Typography>
                    <Box sx={{ flex: 1, overflow: "auto" }}>
                        {_.isEmpty(groupMessages) ?
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
                            _.map(groupMessages, function (msg, i) {
                                return (
                                    <Box
                                        key={i}
                                        sx={{
                                            padding: "10px",
                                            display: "flex",
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
                                )
                            })}
                    </Box>
                </Col>
            </Row>
            <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
        </>
    )
}

export default MessageGroupInfo;