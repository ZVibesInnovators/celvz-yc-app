import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Breadcrumbs, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import React, { createRef, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Col, Row } from 'reactstrap';
import EventCard from '../../components/BackOffice/EventCard';
import { Loader } from '../../components/Misc';
import Enums from '../../constants/enums';
import { AlertContext } from '../../contexts/AlertContextProvider';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../services/api';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ConvertToExcel, copyToClipboard } from "../../services/operations";
import ConfirmationDialog from "./ConfirmationDialog";
import NewEventModal from "../../components/BackOffice/NewEventModal";

const confirmRef = createRef();
const newEventModalRef = createRef();

const EventsManager = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [page, setPage] = useState(1);

    useEffect(() => { if (authData) fetchData({}) }, [authData])

    const fetchData = async ({ shouldUpdateSelected }) => {
        try {
            const api = new API(authData?.token);
            const res = await api.request("get", "events?$include=media&$limit=5000")
            setEvents(res.data);
            if (shouldUpdateSelected && selectedEvent) {
                // find the selected event and update the selectedEvent value with the latest
                const newSelected = _.find(res.data, function (evt) {
                    return evt._id === selectedEvent?._id
                })
                if (newSelected) setSelectedEvent(newSelected)
            }
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    const shareEvent = (event) => {
        try {
            const eventLink = Enums.URL_REGEX.test(event?.link) ? event?.link : `${window.location.origin}/events/${event?.link}`;
            copyToClipboard(`I am beyond excited to share with you the incredible event of a lifetime – "${event.title}".Get ready to participate on ${moment(event.startDate).format("ddd MMM, DD YYYY") + " by " + moment(event.startDate).format("hh:mm a")}, where we will gather at the magnificent ${event.venue}. This is an event that you absolutely do not want to miss!Join us at ${event.address}. Don't wait any longer, take the first step and register now for this extraordinary experience by visiting ${eventLink}.I cannot wait to see you there and witness the transformation that awaits you!`)
            showAlert("info", "Text copied to clipboard")
        } catch (error) {
            showError(error.message)
        }
    }

    const handleScroll = (event) => {
        // const element = event.target;
        // console.log(element.scrollHeight - element.scrollTop - 20, element.clientHeight);
        // if (element.scrollHeight - element.scrollTop - 20 <= element.clientHeight) {
        //   console.log("ppp =>",page + 1);
        //   setPage(page + 1);
        // }
    };

    return (
        <>
            <NewEventModal ref={newEventModalRef} refresh={(v) => fetchData({ shouldUpdateSelected: v })} />
            {isLoading ?
                <Loader />
                :
                <Box sx={{ height: "calc(100vh - 150px)", overflow: "none" }}>
                    <Row style={{ height: "100%", overflow: "none" }}>
                        <Col md="6" style={{ height: "100%", overflow: "auto" }} onScroll={handleScroll}>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                                <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#FFF" }}>
                                    <Link underline="none" color="inherit" onClick={() => navigate("/admin")} sx={{ ":hover": { color: Enums.COLORS.orange, cursor: "pointer" } }}>
                                        Dashboard
                                    </Link>
                                    <Typography sx={{ color: Enums.COLORS.yellow }}>Events Manager</Typography>
                                </Breadcrumbs>
                                <Button size="small" variant='contained' onClick={() => newEventModalRef.current.toggle(true)}>New Event</Button>
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
                                                        <EventCard event={event} onSelect={(v) => setSelectedEvent(v)} shareEvent={shareEvent} selectedEvent={selectedEvent} />
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
                                    <EventDetailPreview
                                        newEventModalRef={newEventModalRef}
                                        event={selectedEvent}
                                        shareEvent={shareEvent}
                                        refresh={() => {
                                            setSelectedEvent();
                                            fetchData({})
                                        }}
                                    />
                            }
                        </Col>
                    </Row>
                </Box>}
        </>
    )
}

export default EventsManager;

const EventDetailPreview = ({ event, refresh, newEventModalRef, shareEvent }) => {
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
            setLoading(false)
        } catch (error) {
            showError(error.message)
        }
    }

    useEffect(() => {
        setPayload(event)
    }, [event])


    const createData = (data) => {
        return {
            name: `${data.user?.firstName || ""} ${data.user?.lastName || ""}`,
            location: data.user?.location || "N/A",
            phone: data.user?.phone || "N/A",
            firstTimer: data.user?.newMember ? "YES" : "NO",
            needTransport: data.freeTransport ? "YES" : "NO",
        };
    }

    const rows = attendees.map(entry => createData(entry));

    const confirmDelete = () => {
        confirmRef.current.open({
            title: "Delete Event",
            description: "Deleting this event will permanently remove it and all associated data from our database and will prevent users from visiting its registration link\nAre you sure you want to proceed?",
            submitText: "Delete Event",
            confirm: () => deleteEvent()
        })
    }

    const deleteEvent = async () => {
        try {
            showAlert("info", `Deleting Event "${event.title}" in the background`);
            const api = new API(authData?.token);
            await api.request("delete", `events/${event._id}`)
            confirmRef.current.close()
            showAlert("success", `Event "${event.title}" has been successfully deleted`);
            refresh()
        } catch (error) {
            showError(error.message)
        }
    }

    const exportData = (rows) => {
        const confirmExport = () => {
            showAlert("info", `Exporting registrants data for "${event.title}" event in the background`);
            // ConvertToExcel({ jsonData: rows })
            confirmRef.current.close();
            const api = new API(authData?.token);
            // const res = await api.request("get", `events/${event._id}/attendees-export`)
            // console.log("export =>", res.blob())

            // Add authorization token to headers
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + authData?.token);

            // Make API call to endpoint that returns a file with headers
            fetch(`${Enums.BASE_URL}/events/${event._id}/attendees-export`, {
                headers: headers
            })
                .then(response => response.blob())
                .then(blob => {
                    console.log("BLOB =>", window.URL.createObjectURL(blob), blob);
                    // Create a URL for the returned file blob
                    const url = window.URL.createObjectURL(blob);
                    // Create an anchor element with the URL and download attribute
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'file.xlsx'; // Replace with the name of the downloaded file
                    // Append the anchor element to the document body
                    document.body.appendChild(a);
                    // Click the anchor element to trigger the download
                    a.click();
                    // Remove the anchor element from the document body
                    document.body.removeChild(a);
                    // Revoke the URL object to free up memory
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error(error));
        }

        confirmRef.current.open({
            title: "Export Registrants",
            description: "This operation may take some time depending on the data size.\nAre you sure you want to proceed?",
            submitText: "Export to Excel",
            confirm: () => confirmExport()
        })
    }

    return (loading ?
        <Loader containerStyle={{ position: "relative", height: "100%", flex: 1 }} />
        :
        <>
            <ConfirmationDialog ref={confirmRef} />
            <Box>
                <Paper elevation={16} sx={{ width: "100%", height: "300px", backgroundImage: `url(${event?.media?.meta?.secure_url})`, backgroundSize: "cover", backgroundPositionY: "top" }} />
                <Typography variant="h4" sx={{ color: Enums.COLORS.yellow }}>{event.title}</Typography>
                <Typography variant="p" >{event.description}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "center", display: "flex" }}><EventIcon sx={{ fontSize: 18 }} />&nbsp;{eventDate}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "flex-start", display: "flex" }}><LocationOnIcon sx={{ fontSize: 18 }} />&nbsp;{event?.venue} | {event?.address}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", mt: "10px" }}>
                    <IconButton color="secondary" title='Share' onClick={() => shareEvent(event)}><ShareIcon /></IconButton>
                    <IconButton color="warning" title="Open Link" onClick={openEventLink}><LinkIcon /></IconButton>
                    <IconButton color="primary" title="Edit Event" onClick={() => newEventModalRef?.current.toggle(true, event)}><EditIcon /></IconButton>
                    <IconButton color="error" title="Delete Event" onClick={confirmDelete}><DeleteIcon /></IconButton>
                </Box>
                <Box sx={{ display: "flex", mb: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Attendees&nbsp;&middot;&nbsp;{_.size(attendees)}</Typography>
                    <Button variant="contained" size="small" color="inherit" sx={{ color: Enums.COLORS.grey_500 }} onClick={() => exportData(rows)}>Export <FileDownloadIcon sx={{ ml: 1 }} /></Button>
                </Box>
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
                    <AttendeesTable attendees={rows} />}
            </Box>
        </>

    )
}

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'location', label: 'Location', minWidth: 170, },
    {
        id: 'phone',
        label: 'Phone No.',
        minWidth: 170,
    },
    {
        id: 'firstTimer',
        label: 'First Timer',
        minWidth: 50,
    },
    {
        id: 'needTransport',
        label: 'Free Transport',
        minWidth: 50,
        sortable: true
    },
];

function AttendeesTable({ attendees }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={attendees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}