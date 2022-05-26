import React from 'react';
import { Col, Row } from "reactstrap";
import { EventDetailPageWrapper } from "../components/styledComponents/events/EventStyles";
import HandymanIcon from '@mui/icons-material/Handyman';

const MaintenancePage = () => {

    return (
        <EventDetailPageWrapper style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Row>
                <Col md={6} className="mx-auto col-10 p-md-4" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h1 style={{ color: "#FFF", fontWeight: 400, margin: 0 }}><strong>Hi,</strong> we&apos;re currently working on new features to improve your experience.</h1>
                    <h5 style={{ marginTop: 20, color: "#FFF", fontWeight: 400 }}>We can&apos;t wait to show you what we&apos;ve got in store for you.</h5>
                </Col>
                <Col md={4} className={"mx-auto"}>
                    <HandymanIcon style={{ fontSize: "25rem", color: "rgb(185 147 166 / 35%)" }} />
                </Col>
            </Row>
        </EventDetailPageWrapper>
    )
}

export default MaintenancePage;