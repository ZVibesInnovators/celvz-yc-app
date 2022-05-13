import React, { useContext, useState } from 'react';
import { EventDetailPageWrapper, Mask, Subtitle, SubtitleWrapper, Title } from "../../components/events/EventStyles";

import BG from "../../components/assest/image/everbrite_banner_size.png"
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { AlertContext } from "../../contexts/AlertContextProvider";

const Event = () => {
    const { showError } = useContext(AlertContext)
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        newMember: true
    })

    const handleChange = (e) => {
        setPayload((oldPayload) => ({
            ...oldPayload,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if(!payload.name) throw Error ("Please input your full name")
            console.log(payload);
        } catch (error) {
            showError(error.message);
        }
    }

    return (
        <EventDetailPageWrapper style={{ backgroundImage: `url(${BG})` }}>
            <Mask>
                <Row>
                    <Col md={8}>
                        <Title>DISCOVER YOUR PURPOSE</Title>
                        <SubtitleWrapper>
                            <Subtitle>Youth Conference</Subtitle>
                            <Subtitle className="next" small={true}>welcome to the love family</Subtitle>
                        </SubtitleWrapper>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className={"form ml-5"}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="mb-5">
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    name={"name"}
                                    value={payload.name}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-5">
                                <Input
                                    type='text'
                                    placeholder='Email'
                                    name={"email"}
                                    value={payload.email}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup className="mb-5">
                                <Input
                                    type='text'
                                    placeholder='Contact Number'
                                    name={"phone"}
                                    value={payload.phone}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <Button type="submit">Register</Button>
                        </Form>
                    </Col>
                </Row>
            </Mask>
        </EventDetailPageWrapper>
    )
}

export default Event;