import { Box, Button, Divider, FormControl, Input, InputLabel, Modal, Switch, useTheme } from "@mui/material";
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from "reactstrap";
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import { BootstrapInput } from "../Misc";
import FileSelectorModal from "./FileManager/FileSelectorModal";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';

import moment from "moment";
import _ from "lodash";

const NewEventModal = forwardRef((props, ref) => {
    const [show, toggle] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [event, setEvent] = useState({});
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const fileSelectorRef = createRef();
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        toggle: (v, data) => {
            toggle(v);
            setIsEditMode(!_.isEmpty(data))
            setEvent(data || {})
        },
    }))

    useEffect(() => {
        if (!show) {
            setEvent({})
            setIsEditMode(false)
        }
    }, [show])


    const handleImageSelect = (data) => {
        try {
            setEvent((old) => ({ ...old, [data.index]: data.item }))
        } catch (error) {
            showError(error.message)
        }
    }

    const selectPhoto = (index) => {
        try {
            fileSelectorRef.current.toggle(true)
            fileSelectorRef.current.setIndex(index)
        } catch (error) {
            showError(error.message)
        }
    }

    const handleDateChange = (dates) => {
        try {
            const [start, end] = dates
            setEvent((old) => ({
                ...old,
                startDate: moment(start?.$d).format("MM-DD-YYYY hh:mm a"),
                endDate: moment(end?.$d).format("MM-DD-YYYY hh:mm a")
            }))
        } catch (error) {
            console.log(error.message);
        }
    }

    const submit = async () => {
        try {
            if (!event?.media) throw Error("Please select a banner image for this event");
            if (!event?.title) throw Error("Kindly provide a title for this event");
            if (!event?.description) throw ("A breif description is required for the event");
            if (!event?.link) throw Error("Please provide a URL Slug");
            const payload = { ...event };
            payload["media"] = event.media?.id
            payload["createdBy"] = authData?.user?._id
            setLoading(true)
            const api = new API(authData?.token);
            if (isEditMode) {
                // remove not allowed properties
                ["_id", "__v", "isDeleted", "hasExternalLink", "createdAt", "updatedAt", "id"].forEach(p => delete payload[p])
                await api.request("patch", `events/${event._id}`, payload)
                showAlert("success", "Event Updated Successfully");
            } else {
                await api.request("post", "events", payload)
                showAlert("success", "New Event Created Successfully");
            }
            props.refresh(isEditMode);
            setLoading(false)
            toggle(false);
        } catch (error) {
            showError(error.message)
            setLoading(false)
        }
    }

    return (
        <>
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
                    maxHeight: 'calc(100vh - 100px)',
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
                        <h2>{isEditMode ? "Modify" : "New"} Event</h2>
                        <span>{isEditMode ? "Edit this" : "Create a new"} Event registration page</span>
                    </Box>
                    <Divider />
                    <Row>
                        <Col md={12}>
                            <InputLabel shrink sx={{ color: Enums.COLORS.yellow, marginTop: 2 }}>
                                Event Banner
                            </InputLabel>
                            <Box sx={{
                                border: "2px dashed #d7d7d7",
                                width: "100%",
                                height: "200px",
                                borderRadius: "5px",
                                backgroundImage: `url(${event?.media?.meta?.secure_url})`,
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
                                <Box className="mask" onClick={() => selectPhoto("media")}>
                                    <AddPhotoAlternateIcon sx={{ color: Enums.COLORS.white, fontSize: 40 }} />
                                </Box>
                            </Box>
                        </Col>

                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    Event Title
                                </InputLabel>
                                <BootstrapInput placeholder="Give it a great title" value={event.title} onChange={(e) => {
                                    const data = { ...event, title: e.target.value };
                                    data["link"] = e.target.value.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-')
                                    setEvent(data)
                                }} />
                            </FormControl>
                        </Col>
                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    Description
                                </InputLabel>
                                <BootstrapInput placeholder="Let everyone know what this event is about" multiline value={event.description} rows={4} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
                            </FormControl>
                        </Col>
                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    URL Slug
                                </InputLabel>
                                <BootstrapInput components={Input} placeholder="my-url-slug" value={event.link} onChange={(e) => setEvent({ ...event, link: e.target.value?.toLowerCase()?.replace(/[^\w\s]|\s/gi, '-') })} />
                                <small style={{ color: Enums.COLORS.grey_400, fontSize: 12 }}>This uniquely identifies each event and will be used to create a unique link</small>
                            </FormControl>
                        </Col>
                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    Tag Line
                                </InputLabel>
                                <BootstrapInput components={Input} placeholder="Event tag line" value={event.tagline} onChange={(e) => setEvent({ ...event, tagline: e.target.value })} />
                                <small style={{ color: Enums.COLORS.grey_400, fontSize: 12 }}>This is usually a catchy phrase for the event</small>
                            </FormControl>
                        </Col>
                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    Venue
                                </InputLabel>
                                <BootstrapInput components={Input} placeholder="Event Venue" value={event.venue} onChange={(e) => setEvent({ ...event, venue: e.target.value })} />
                            </FormControl>
                        </Col>
                        <Col md={12} style={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="standard" sx={{ marginY: 2 }}>
                                <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                    Address
                                </InputLabel>
                                <BootstrapInput components={Input} placeholder="Event Address" value={event.address} onChange={(e) => setEvent({ ...event, address: e.target.value })} />
                            </FormControl>
                        </Col>
                        <Col md={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MultiInputDateTimeRangeField
                                    onChange={handleDateChange}
                                    slotProps={{
                                        textField: ({ position }) => ({
                                            label: position === 'start' ? 'Event Starts' : 'Event Ends',
                                        }),
                                    }}
                                />
                            </LocalizationProvider>
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
                            <span>{isLoading ? "Please Wait..." : isEditMode ? "Update" : "Submit"}</span>
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* file selector */}
            <FileSelectorModal ref={fileSelectorRef} type={"image"} onSelect={handleImageSelect} />
        </>
    )
})

export default NewEventModal;