import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { Box, FormControl, Link } from "@mui/material";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate, useParams } from "react-router";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { LargeHeroButton } from "../../components/home/CallToActionButtons";
import { Loader } from '../../components/Misc';
import { EventDetailPageWrapper, Mask, Subtitle, SubtitleWrapper, Title } from "../../components/styledComponents/events/EventStyles";
import Enums from "../../constants/enums";
import { AlertContext } from "../../contexts/AlertContextProvider";
import API from "../../services/api";
import { countries } from 'country-list-json';

const nigerianStates = require("../../constants/nigerianStates.json")

const Event = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { showError, showAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [event, setEvent] = useState(null)
    const [blur, setBlur] = useState(false)
    const [showCountries, toggleCountryList] = useState(false)


    useEffect(() => {
        const footer = document.getElementById("site-footer");
        // hide and show footer
        footer.style.display = "none"
        return () => {
            footer.style.display = "block"
        }
    }, [])

    const [payload, setPayload] = useState({
        name: "",
        email: "",
        phone: "",
        location: "Lagos",
        lga: "Ikeja",
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
            setEvent(_.isEmpty(response.data) ? null : response.data[0])
            console.log("response =>", response);
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
        if (e.target.name !== "lga") toggleCountryList(e.target.value !== "Nigeria" && !e.target.value.includes("State") && !nigerianStates.find(state => {
            return state.name === e.target.value
        }))
        setPayload((oldPayload) => ({
            ...oldPayload,
            [e.target.name]: e.target.value
        }))
    }

    const isOtherCountry = useMemo(() => {
        return payload.location !== "Nigeria" && !payload.location.includes("State") && !nigerianStates.find(state => {
            return state.name === payload.location
        })
    }, [payload.location])

    const lgas = useMemo(() => {
        const lgas = nigerianStates.find(s => {
            return s.name === payload.location
        })?.lgas;
        if (!_.isEmpty(lgas)) setPayload({ ...payload, lga: lgas[0] });
        return lgas || []
    }, [payload.location])

    const handleSubmit = useCallback(async (e) => {
        try {
            e.preventDefault();
            if (!event) throw Error("Please select an event")
            if (!payload.name) throw Error("Please input your full name")
            if (!payload.email) throw Error("Please input your Email Address")
            if (!payload.phone) throw Error("Please input your phone")
            if (!payload.location) throw Error("Please input your location")
            if (!payload.lga && !isOtherCountry) throw Error("Please input your location")
            setIsSubmitting(true)
            const api = new API();
            const { response } = await api.request("post", `events/register`, {
                ...payload,
                event: event?._id,
                location: !isOtherCountry ? `${payload.location} - ${payload.lga}` : payload.location
            })
            showAlert("success", response.message)
            setPayload({
                name: "",
                email: "",
                phone: "",
                location: "Lagos",
                lga: "Ikeja",
                newMember: true
            })
            setIsSubmitting(false)
        } catch (error) {
            showError(error.message);
            setIsSubmitting(false);
        }
    }, [isOtherCountry, payload])

    return (
        <EventDetailPageWrapper className="detail-wrapper" blur={blur}
            style={{ backgroundImage: `url(${event?.media?.meta?.secure_url})` }}>
            <Mask blur={blur}>
                {
                    isLoading ?
                        <Loader /> :
                        !event ?
                            <Row>
                                <Col md={6} className="mx-auto col-10 p-md-4" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <h1 style={{ color: "#FFF", fontWeight: 400, margin: 0 }}><strong>Event Not Found</strong></h1>
                                    <h5 style={{ marginTop: 20, color: "#FFF", fontWeight: 400 }}>We were unable to find any event with the provided parameters</h5>
                                    <LargeHeroButton onClick={() => navigate("/")}>Back to Home</LargeHeroButton>
                                </Col>
                            </Row>
                            :
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
                                    <Col md={5} className={"form ml-5 mb-5"}>
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
                                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                <label style={{
                                                    color: "#FFF",
                                                    background: "#c42167",
                                                    padding: "0px 3px",
                                                    borderRadius: "5px",
                                                    marginBottom: "1px",
                                                    width: "fit-content",
                                                    marginRight: "10px"
                                                }}>Location</label>
                                                <Link sx={{ color: "#FFF", "&:hover": { color: Enums.COLORS.orange, cursor: "pointer", textDecoration: "none" } }} onClick={() => toggleCountryList(!showCountries)}>{showCountries ? "Are you in Nigeria?" : "Not in Nigeria?"}</Link>
                                            </Box>
                                            {showCountries ?
                                                <FormGroup className="mb-5">
                                                    <Input
                                                        type='select'
                                                        placeholder='Location'
                                                        name={"location"}
                                                        className="short"
                                                        value={payload.location}
                                                        onChange={handleChange}
                                                        style={{ maxWidth: "100%", margin: "0px 50px 0px 0px" }}                                                    >
                                                        {countries.map((country, i) => <option key={i}>{country?.name}</option>)}
                                                    </Input>
                                                </FormGroup>
                                                :
                                                <FormControl className="mb-5" variant="standard">
                                                    <div className="row">
                                                        <div className="col-12 col-md-5">
                                                            <Input
                                                                type='select'
                                                                placeholder='Location'
                                                                name={"location"}
                                                                className="short"
                                                                value={payload.location}
                                                                onChange={handleChange}
                                                                style={{ maxWidth: "100%", margin: "0px 50px 0px 0px" }}                                                    >
                                                                {[{ name: "-- Select State --"}, ...nigerianStates].map((state, i) => <option key={i}>{state?.name}</option>)}
                                                            </Input>
                                                        </div>
                                                        <div className="col-12 col-md-5 ml-3">
                                                            <Input
                                                                type='select'
                                                                placeholder='Area'
                                                                name={"lga"}
                                                                className="short"
                                                                value={payload.lga}
                                                                onChange={handleChange}
                                                                style={{ maxWidth: "100%" }}                                                    >
                                                                {lgas.map((lga, i) => <option key={i}>{lga}</option>)}
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </FormControl>}

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