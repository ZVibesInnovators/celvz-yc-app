import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Breadcrumbs, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Col, Row } from 'reactstrap';
import EventCard from '../../components/BackOffice/EventCard';
import { Loader } from '../../components/Misc';
import Enums from '../../constants/enums';
import { AlertContext } from '../../contexts/AlertContextProvider';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../services/api';

const EventsManager = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null)

    useEffect(() => { if (authData) fetchData() }, [authData])

    const fetchData = async () => {
        try {
            const api = new API(authData?.token);
            const res = await api.request("get", "events?$include=media&$limit=5000")
            setEvents(res.data);
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    return (isLoading ?
        <Loader />
        :
        <Box sx={{ height: "calc(100vh - 150px)", overflow: "none" }}>
            <Row style={{ height: "100%", overflow: "none" }}>
                <Col md="6" style={{ height: "100%", overflow: "auto" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                            <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                                Dashboard
                            </Link>
                            <Typography sx={{ color: Enums.COLORS.yellow }}>Events Manager</Typography>
                        </Breadcrumbs>
                        <Button size="small" variant='contained'>New Event</Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {_.isEmpty(events) ? <Box sx={{
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
                            <Typography sx={{ color: Enums.COLORS.grey_400 }}>No Events Found</Typography>
                        </Box> :
                            <Box display="flex" flexWrap="wrap">
                                {
                                    _.map(events, function (event, i) {
                                        return (
                                            <Box key={i} width={1 / 2}>
                                                <EventCard event={event} onSelect={(v) => setSelectedEvent(v)} selectedEvent={selectedEvent} />
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        }
                    </Box>
                </Col>
                <Col md="6" style={{ overflow: "auto", borderLeft: `1px solid ${Enums.COLORS.grey_400}`, height: "100%", display: "flex", flexDirection: "column" }}>
                    {
                        !selectedEvent ? <Box sx={{
                            display: "flex",
                            margin: 2,
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <EventIcon sx={{
                                color: Enums.COLORS.grey_400,
                                fontSize: 100
                            }} />
                            <Typography sx={{ color: Enums.COLORS.grey_400 }}>Please select an event to manage</Typography>
                        </Box>
                            :
                            <EventDetailPreview event={selectedEvent} />
                    }
                </Col>
            </Row>
        </Box>)
}

export default EventsManager;

const EventDetailPreview = ({ event }) => {
    const [payload, setPayload] = useState({});
    const [loading, setLoading] = useState(true);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [attendees, setAttendees] = useState([]);

    useEffect(() => { if (authData) fetchData() }, [authData, event])
    const eventLink = Enums.URL_REGEX.test(event?.link) ? event?.link : `${window.location.origin}/events/${event?.link}`;
    const eventDate = useMemo(() => {
        let prefix = moment(event?.startDate).isAfter() ? "Holds on" : "Held on";
        return `${prefix} ${moment(event?.startDate).format("DD/MM/YYYY hh:mm a")}`
    }, [event])

    const openEventLink = () => {
        window.open(eventLink, "_blank")
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const api = new API(authData?.token);
            const res = await api.request("get", `events/${event?.id}/attendees?$include=user&$limit=10000`)
            setAttendees(res.data);
            console.log(res.data);
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    useEffect(() => {
        setPayload(event)
    }, [event])

    return (loading ?
        <Loader containerStyle={{ position: "relative", height: "100%", flex: 1 }} />
        :
        <Box>
            <Paper elevation={16} sx={{ width: "100%", height: "300px", backgroundImage: `url(${event?.media?.meta?.secure_url})`, backgroundSize: "cover", backgroundPositionY: "top" }} />
            <Typography variant="h4" sx={{ color: Enums.COLORS.yellow }}>{event.title}</Typography>
            <Typography variant="p" >{event.description}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "center", display: "flex" }}><EventIcon sx={{ fontSize: 18 }} />&nbsp;{eventDate}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "flex-start", display: "flex" }}><LocationOnIcon sx={{ fontSize: 18 }} />&nbsp;{event?.venue} | {event?.address}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", mt: "10px" }}>
                <IconButton color="secondary" title='Share'><ShareIcon /></IconButton>
                <IconButton color="warning" title="Open Link" onClick={openEventLink}><LinkIcon /></IconButton>
                <IconButton color="primary" title="Edit Event"><EditIcon /></IconButton>
                <IconButton color="error" title="Delete Event"><DeleteIcon /></IconButton>
            </Box>
            <Typography color="text.secondary">Attendees&nbsp;&middot;&nbsp;{_.size(attendees)}</Typography>
            {_.isEmpty(attendees) ?
                <Box sx={{
                    display: "flex",
                    margin: 2,
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <GroupIcon sx={{
                        color: Enums.COLORS.grey_400,
                        fontSize: 100
                    }} />
                    <Typography sx={{ color: Enums.COLORS.grey_400 }}>There are no attendees for this event</Typography>
                </Box>
                :
                <AttendeesTable attendees={attendees} />}
        </Box>
    )
}


const columns = [
    {
        headerName: 'Name', width: 130, sortable: true,
        valueGetter: ({row}) =>
        `${row.user?.firstName || ''} ${row.user?.lastName || ''}`,
    },
    { field: 'location', headerName: 'Location', width: 130 },
    {
        field: 'firstTimer',
        headerName: 'First Timer',
        width: 90,
    },
    {
        field: 'freeTransport',
        headerName: 'Needs Transportation',
        width: 90,
    },
];


const AttendeesTable = ({attendees}) => {
    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={attendees}
                columns={columns}
            />
        </div>
    );
}