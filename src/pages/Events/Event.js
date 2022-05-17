import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { ImSpinner9 } from 'react-icons/im';
import { FormControl } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { EventDetailPageWrapper, Mask, Subtitle, SubtitleWrapper, Title } from "../../components/styledComponents/events/EventStyles";
import { Loader } from '../../components/Misc';
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import Footer from '../../components/Footer';

const nigerianStates = require("../../constants/nigerianStates.json")

const Event = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { showError, showAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [event, setEvent] = useState(null)
    const [blur, setBlur] = useState(false)

    const [payload, setPayload] = useState({
        name: "",
        email: "",
        phone: "",
        location: "Lagos",
        newMember: true
    })

    const fetch = async () => {
        try {
            const { stub } = params;
            setIsLoading(true)
            // get event details
            const api = new API();
            const response = await api.request("get", `events?$or=link:${stub}&$include=media`);
            setIsLoading(false);
            setEvent(response.data[0])
        } catch (error) {
            showError(error.message);
            navigate("/")
        }
    }

    useEffect(() => { fetch() }, [params])

    useEffect(() => {
        document.addEventListener("focusin", (e) => {
            const eleType = e.target.type;
            const v = (["text", "select"].includes(eleType?.split("-")[0]));
            handleBlur(v);
        });
        document.addEventListener("focusout", () => handleBlur(false));

        return () => {
            document.removeEventListener("focusin", handleBlur);
            document.removeEventListener("focusout", handleBlur);
        }
    }, [])

    const handleBlur = (focused) => {
        setBlur(focused)
    }

    const handleChange = (e) => {
        setPayload((oldPayload) => ({
            ...oldPayload,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!event) throw Error("Please select an event")
            if (!payload.name) throw Error("Please input your full name")
            if (!payload.email) throw Error("Please input your Email Address")
            if (!payload.phone) throw Error("Please input your phone")
            if (!payload.location) throw Error("Please input your location")
            setIsSubmitting(true)
            const api = new API();
            const { response } = await api.request("post", `events/register`, {
                ...payload,
                event: event?._id
            })
            showAlert("success", response.message)
            setPayload({
                name: "",
                email: "",
                phone: "",
                location: "Lagos",
                newMember: true
            })
            setIsSubmitting(false)
        } catch (error) {
            showError(error.message);
            setIsSubmitting(false)
        }
    }

    return (
        <EventDetailPageWrapper blur={blur} image={event?.media?.url}>
            <Mask blur={blur}>
                {
                    isLoading ?
                        <Loader /> :
                        <>
                            <Row className="w-100">
                                <Col md={8}>
                                    <Title>{event?.title}</Title>
                                    <SubtitleWrapper>
                                        <Subtitle>{event.description}</Subtitle>
                                        <Subtitle className="next" small={true}>{event.tagline}</Subtitle>
                                    </SubtitleWrapper>
                                </Col>
                            </Row>
                            <Row className="w-100 pb-4">
                                <Col md={4} className={"form ml-5 mb-5"}>
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

                                        <FormControl className="mb-5" variant="standard">
                                            <Input
                                                type='select'
                                                placeholder='Location'
                                                name={"location"}
                                                className="short"
                                                value={payload.location}
                                                onChange={handleChange}
                                                style={{ width: 466 }}
                                            >
                                                {nigerianStates.map((state, i) => <option key={i}>{state}</option>)}
                                            </Input>
                                        </FormControl>

                                        <FormGroup className="hint">
                                            <span>Is this Your First Time With Us?</span>
                                            <input style={{ marginLeft: 10 }} type={"checkbox"} checked={payload.newMember} onClick={(e) => { setPayload({ ...payload, newMember: !payload.newMember }) }} />
                                        </FormGroup>

                                        <Button type="submit" disabled={isSubmitting}>Register {isSubmitting ?
                                            <ImSpinner9 className="fa-spin" style={{ marginLeft: 20 }} />
                                            :
                                            <PlaylistAddCheckCircleIcon style={{ marginLeft: 20 }} />
                                        }</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </>
                }
            </Mask>
        </EventDetailPageWrapper>
    )
}

export default Event;