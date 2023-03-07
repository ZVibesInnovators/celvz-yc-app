import { Box, Button, Divider, FormControl, Input, InputLabel, Modal, Switch, useTheme } from "@mui/material";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from "reactstrap";
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";
import { BootstrapInput } from "../../Misc";

const NewMessageGroupModal = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [group, setGroup] = useState({});
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const fileSelectorRef = createRef();
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        toggle: (v) => toggle(v),
    }))

    useEffect(() => {
        if (!show) setGroup({})
    }, [show])

    const submit = async () => {
        try {
            if (!group?.name) throw Error("Kindly provide a name for this group");
            if (!group?.description) throw ("A breif description is required for the group");
            if (!group?.slug) throw Error("Please provide a URL Slug");
            setLoading(true)
            const api = new API(authData?.token);
            await api.request("post", "anon-messages/groups", group)
            showAlert("success", "Message Group Created Successfully");
            props.refresh();
            setLoading(false)
            toggle(false);
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    return (
        <Modal
            open={show}
            onClose={() => !isLoading && toggle(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                top: 0,
                position: "absolute",
                zIndex: 5000
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 550,
                bgcolor: Enums.COLORS.grey_500,
                boxShadow: 24,
                p: 2,
                overflow: "auto",

                [`${theme.breakpoints.down("sm")}`]: {
                    width: "95% !important"
                }
            }}>
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
                    <h2>New Message Group</h2>
                    <span>Create a new Anonymous Message Group</span>
                </Box>
                <Divider />
                <Row>
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

                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Group Name
                            </InputLabel>
                            <BootstrapInput placeholder="Give it a great name" onChange={(e) => {
                                const data = { ...group, name: e.target.value };
                                data["slug"] = e.target.value.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-')
                                setGroup(data)
                            }} />
                        </FormControl>
                    </Col>
                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                Description
                            </InputLabel>
                            <BootstrapInput placeholder="Let users know what this message group is about" multiline rows={4} onChange={(e) => setGroup({ ...group, description: e.target.value })} />
                        </FormControl>
                    </Col>
                    <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl variant="standard" sx={{ marginY: 2 }}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                URL Slug
                            </InputLabel>
                            <BootstrapInput components={Input} placeholder="my-url-slug" value={group.slug} onChange={(e) => setGroup({ ...group, slug: e.target.value?.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-') })} />
                            <small style={{ color: Enums.COLORS.grey_400, fontSize: 12 }}>This uniquely identifies each message group and will be used to create a unique link</small>
                        </FormControl>
                    </Col>
                </Row>
                <Box sx={{
                    marginY: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        disabled={isLoading}
                        onClick={() => toggle(false)}
                        sx={{
                            minHeight: "40px",
                            padding: "5px 15px",
                            background: "#eee",

                            ":hover": {
                                background: Enums.COLORS.orange,
                                "span": {
                                    color: `${Enums.COLORS.white} !important`
                                }
                            },

                            "span": {
                                color: "#333 !important"
                            }
                        }}
                    >
                        <span>Cancel</span>
                    </Button>

                    <Button
                        disabled={isLoading}
                        onClick={submit} sx={{
                            marginX: "5px",
                            minHeight: "40px",
                            padding: "5px 15px",
                            background: isLoading ? Enums.COLORS.grey_400 : Enums.COLORS.yellow,

                            ":hover": {
                                background: "#eee",
                                "span": {
                                    color: "#333 !important"
                                }
                            },

                            "span": {
                                color: `${Enums.COLORS.grey_500} !important`
                            }
                        }}
                    >
                        <span>{isLoading ? "Please Wait..." : "Submit"}</span>
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
})

export default NewMessageGroupModal;