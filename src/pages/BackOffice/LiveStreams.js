import TvOffIcon from '@mui/icons-material/TvOff';
import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, FormControl, IconButton, InputLabel, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import React, { createRef, useContext, useEffect, useMemo, useState } from 'react';
import ReactPlayer from "react-player";
import { Col, Row } from "reactstrap";
import { OnAir, VideoWrapper } from "../../components/home/livePageStyles";
import { BootstrapInput, Loader } from "../../components/Misc";
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../services/api";
import { NoLiveStream } from "../Live";

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import ConfirmationDialog from "./ConfirmationDialog";

const streamTemp = {
    title: "",
    isLive: true,
    description: "",
    stream: {
        url: ""
    }
};

const LiveStreams = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [showConfirmNew, setConfirmNew] = useState(false);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);
    const [streams, setStreams] = useState([]);
    const [newStream, setNewStream] = useState(streamTemp)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (authData) getStreams()
    }, [authData]);

    const getStreams = async () => {
        try {
            const api = new API(authData?.token);
            const response = await api.request("get", `stream?$include=event&$limit=${Math.pow(10, 5)}`);
            setStreams(response.data);
            setLoading(false)
        } catch (error) {
            showError(error.message);
            setLoading(false)
        }
    }

    const liveStream = useMemo(() => {
        return _.find(streams, function (s) {
            return s.isLive
        })
    }, [streams])

    const submit = () => {
        try {
            if (!newStream.title) throw Error("Please provide a title");
            if (!newStream.description) throw Error("Kindly input a description");
            if (!newStream.stream?.url) throw Error("A valid video feed url is required")
            setNewStream((old) => ({ ...old, channelId: `CH-${moment().format("DDMMYY")}-${moment().format("HHMMSS")}` }))
            setConfirmNew(true)
        } catch (error) {
            showError(error.message);
        }
    }

    const startLiveStream = async () => {
        try {
            setConfirmNew(false)
            setSubmitting(true)
            const api = new API(authData?.token);
            await api.request("post", "stream", newStream);
            await getStreams();
            setNewStream(streamTemp);
            showAlert("success", "A new stream is now On Air")
            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
            showError(error.message);
        }
    }

    return (
        isLoading ?
            <Loader />
            :
            <Box>
                <Row>
                    <Col md={9} className="mr-auto" style={{ borderRight: "1px solid #333", display: "flex", minHeight: "400px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {!liveStream ?
                            <NoLiveStream style={{ height: "inherit", overflow: "hidden" }} />
                            : <VideoWrapper id={"video-wrapper"} style={{ margin: 0 }}>
                                {liveStream.stream?.url && <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={liveStream.stream?.url} />}
                            </VideoWrapper>}
                    </Col>
                    <Col md={3} className="ml-auto">
                        <Box>
                            {liveStream &&
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <OnAir style={{ margin: "0px 10px" }}>
                                        <p style={{ fontSize: "18px", margin: "0px", color: "#cc0100" }}>ON-AIR</p>
                                    </OnAir>
                                    <IconButton color="primary" size="medium">
                                        <TvOffIcon sx={{ color: "#d7d7d7" }} />
                                    </IconButton>
                                </Box>
                            }
                            <Box sx={{ marginY: 1 }}>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ color: Enums.COLORS.white, fontSize: 20 }}>New Live Stream</Typography>
                                </Box>
                                <Divider sx={{ color: Enums.COLORS.grey_400, marginY: 1 }} />
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Title
                                        </InputLabel>
                                        <BootstrapInput value={newStream.title} onChange={(e) => setNewStream({ ...newStream, title: e.target.value })} />
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Description
                                        </InputLabel>
                                        <BootstrapInput value={newStream.description} onChange={(e) => setNewStream({ ...newStream, description: e.target.value })} />
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ marginY: 1 }}>
                                        <InputLabel shrink sx={{ color: Enums.COLORS.yellow }}>
                                            Video Feed URL
                                        </InputLabel>
                                        <BootstrapInput value={newStream.stream.url} onChange={(e) => setNewStream({ ...newStream, stream: { ...newStream.stream, url: e.target.value } })} />
                                    </FormControl>
                                    <Button onClick={submit}
                                        disabled={submitting}
                                        sx={{
                                            minHeight: "40px",
                                            padding: "5px 15px",
                                            background: "#eee",

                                            ":hover": {
                                                background: Enums.COLORS.yellow,
                                                "span": {
                                                    color: `${Enums.COLORS.grey_500} !important`
                                                }
                                            },

                                            "span": {
                                                color: "#333 !important",
                                                fontSize: "13px"
                                            }
                                        }}><span>Start Streaming</span></Button>

                                    {/* confirmation dialog */}
                                    <Dialog onClose={() => setConfirmNew(false)} open={showConfirmNew}>
                                        <DialogTitle sx={{ textAlign: "center" }}>
                                            Start new Live Stream
                                            <Typography>Starting a new Live Stream would take any ongoing live stream off air</Typography>
                                            <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Do you want to proceed?</Typography>
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={() => setConfirmNew(false)}>Cancel</Button>
                                            <Button onClick={startLiveStream}>Start Stream</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                            </Box>
                        </Box>
                    </Col>
                </Row>
                <Box sx={{ mt: 4, mx: 4 }}>
                    <EnhancedTable rows={streams} refresh={getStreams} />
                </Box>
            </Box>
    )
}

export default LiveStreams;


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Stream Title',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'event',
        numeric: false,
        disablePadding: false,
        label: 'Event',
    },
    {
        id: 'views',
        numeric: true,
        disablePadding: false,
        label: 'Views',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Previous Streams
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const confirmRef = createRef()

function EnhancedTable({ rows, refresh }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { showError, showAlert } = useContext(AlertContext);
    const { authData } = useContext(AuthContext);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const toggleLive = async (stream, state) => {
        const changeStreamState = async () => {
            try {
                // check if there are other live streams if the user intends to Go live
                const liveStream = rows.find(r => r.isLive);
                if (state && liveStream) throw Error(`Please stop any active stream (${liveStream.title}) before starting another one`)
                showAlert("info", `We're updating ${stream.title} in the background`)
                const api = new API(authData?.token);
                await api.request("patch", `stream/${stream._id}`, {
                    ...stream,
                    isLive: state
                });
                await refresh()
                showAlert("success", `${stream.title} has been set to ${state ? "Live" : "Off Air"}`)
                confirmRef.current.close()
            } catch (error) {
                showError(error.message);
            }
        }

        confirmRef.current.open({
            title: state ? "Start Stream" : "Stop Stream",
            description: `Are you sure you want to ${state ? "Start Stream" : "Stop Stream"} for the stream: "${stream.title}"?`,
            submitText: state ? "Start Stream" : "Stop Stream",
            confirm: changeStreamState
        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <ConfirmationDialog ref={confirmRef} />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.title}
                                                {row.isLive && <LiveTvIcon sx={{ color: Enums.COLORS.orange, fontSize: "16px", marginLeft: "5px", marginBottom: "5px" }} />}
                                            </TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">{row.event?.title || "N/A"}</TableCell>
                                            <TableCell align="left">{_.size(row.viewers)}</TableCell>
                                            <TableCell align="left">
                                                <Button onClick={() => toggleLive(row, !row.isLive)} size="small" variant="outlined" color={row.isLive ? "warning" : "success"}>{row.isLive ? "Stop Stream" : "Start Stream"}</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}