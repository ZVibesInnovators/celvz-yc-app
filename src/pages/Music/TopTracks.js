import { Box } from "@mui/material";
import React from 'react';
import { Col, Row } from "reactstrap";
import { TrackList } from "../../components/styledComponents/musicStyles";

const RecommendedMusic = () => {

    return (
        <Box>
            <TrackList>
                <Row className="mask">

                    <h3>Top Tracks</h3>
                    
                </Row>
            </TrackList>
        </Box>
    )
}

export default RecommendedMusic