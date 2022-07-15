import { Box } from "@mui/material";
import React from 'react';
import { Col, Row } from "reactstrap";
import { LargeHeroButton } from "../../components/home/CallToActionButtons";
import { HeroWrapper } from "../../components/styledComponents/musicStyles";
import TopTracks from "./TopTracks"

const RecommendedMusic = () => {

    return (
        <Box sx={{ marginBottom: "200px" }}>
            <HeroWrapper>
                <Row className="mask h-100">
                    <Col md={6} className="p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" , marginTop: "20px"}} >
                        <h1>New Trending Album</h1>
                        <label>Featured Content</label>
                        <LargeHeroButton style={{ width: "150px", fontSize: "15px", borderRadius: "50px", marginTop: 10 }}>Play All</LargeHeroButton>
                    </Col>
                    <Col md={6} className="p-4">
                        <Row style={{ justifyContent: "flex-end" }}>
                            <Col md={5} style={{ height: "calc(50vh/2.5)", margin: "5px", background: "#d81b60", borderRadius: "10px" }}></Col>
                            <Col md={5} style={{ height: "calc(50vh/2.5)", margin: "5px", background: "#1d77be", borderRadius: "10px" }}></Col>
                        </Row>
                        <Row style={{ justifyContent: "flex-end" }}>
                            <Col md={5} style={{ height: "calc(50vh/2.5)", margin: "5px", background: "#179bab", borderRadius: "10px" }}></Col>
                            <Col md={5} style={{ height: "calc(50vh/2.5)", margin: "5px", background: "#b59124", borderRadius: "10px" }}></Col>
                        </Row>
                    </Col>
                </Row>
            </HeroWrapper>
            {/* top tracks */}
            <TopTracks />
        </Box>
    )
}

export default RecommendedMusic