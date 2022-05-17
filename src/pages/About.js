import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import Footer from "../components/Footer";
import { LargeHeroButton } from "../components/home/CallToActionButtons";
import { Content, Hero, HeroBG, Mask } from "../components/styledComponents/aboutStyles";
import { EventDetailPageWrapper } from "../components/styledComponents/events/EventStyles";

const About = () => {
    const [message, setMessage] = useState("");

    return (
        <EventDetailPageWrapper style={{ zIndex: 0 }}>
            <HeroBG />
            <Mask>
                <Hero className="row">
                    <Col md="7">
                        <h1>WHO WE ARE</h1>
                        <span>Welcome to the love family</span>
                    </Col>
                </Hero>
                <Content className="row">
                    <Col md="9" className="mr-auto">
                        <p>CELVZ Youth Church, A.K.A ZVibes Family is where the littest youths for
                            Jesus are being raised. We are a special people of purpose, passion,
                            and power, living out the God-life, taking God's divine presence to
                            the nations and people of the earth, and demonstrating the character
                            of the Spirit.</p>

                        <p>This is the Global Youth Ministry of <a href="https://celvz.org" target={"_blank"}>Christ Embassy
                            Lagos Virtual Zone (CELVZ)</a> - An Ark for
                            every young person in the world, an oasis of love: the place to be.
                            This is the place for you!</p>

                        <p>We're physically located at&nbsp;
                            <a style={{ color: "#FFF" }} href="https://goo.gl/maps/FSoY7nL6J4y31Srx5" target={"_blank"}>
                                24, Sanyaolu Street, Oregun, Ikeja, Lagos, Nigeria
                            </a>,
                            but our reach, impact, and influence
                            spreads across the whole world.</p>

                        <p>We are really excited to have you join the
                            ZVibes Family, where you're loved, taught the Word of God, and your growth
                            is guaranteed. You're specially welcome to the love family.
                        </p>
                    </Col>
                </Content>
                <Row className="mt-4 pb-5">
                    <Col className="subscribe" md={"6"}>
                        <h1>NEW HERE?</h1>
                        <span>Say Hello</span>
                    </Col>
                    <Col className="mx-auto" md={"4"}>
                        <Form>
                            <FormGroup>
                                <Input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                            </FormGroup>
                            <LargeHeroButton style={{ alignSelf: "flex-end" }}>SEND</LargeHeroButton>
                        </Form>
                    </Col>
                </Row>
            </Mask>
        </EventDetailPageWrapper>
    )
}

export default About;