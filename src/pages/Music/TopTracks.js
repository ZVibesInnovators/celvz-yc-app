import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from 'react';
import { Col, Row } from "reactstrap";
import { TrackList, StyledTableCell, StyledTableRow } from "../../components/styledComponents/musicStyles";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Chosen', "Marizu", 500, "04.28", "..."),
    createData('Grateful', "CELVZ Loveworld Singers", 200, "04.28", "..."),
    createData('Unending Praise', "CELVZ Loveworld Singers", 700, "04.28", "..."),
    createData('DYP Theme Song', "CELVZ Loveworld Singers", "10,000", "04.28", "..."),
    createData('Morning Sun', "Marizu", 7000, "04.28", "..."),
];

const RecommendedMusic = () => {

    return (
        <Box>
            <TrackList>
                <Row className="mask">

                    <h3>Top Tracks</h3>
                    <TableContainer component={Box} style={{marginTop: "20px"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SONG</StyledTableCell>
                                    <StyledTableCell align="right">ARTIST</StyledTableCell>
                                    <StyledTableCell align="right">DAILY PLAYS</StyledTableCell>
                                    <StyledTableCell align="right">TIME</StyledTableCell>
                                    <StyledTableCell align="right">OPTIONS</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Row>
            </TrackList>
        </Box>
    )
}

export default RecommendedMusic