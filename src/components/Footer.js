import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import logo from "./assest/image/logoLarge.png";
import { useNavigate } from "react-router-dom";

const FooterWrapper = styled.div`
    background-color: #000;

    .col-md-8 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 46px;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        text-align: left;
        color: #FFFFFF;
        margin-bottom: 10px;
    }

    img {
        width: 200px;
        margin-left: auto;
        cursor: pointer;
    }

    .copyright {
        padding: 20px;
        border-top: .5px solid #FFF;
        text-align: center;

        small {
            color: #FFF;
        }
    }
`

const Footer = () => {
    const navigate = useNavigate()

    return (
        <FooterWrapper id="site-footer">
            <Row>
                <Col md={8}>
                    <span>The Cornerstone Basement,<br />
                        LCA Leisure Car Park,<br />
                        8 Billings Way, Off Kudirat Abiola Way,<br />
                        Oregun, Ikeja - Lagos.</span>
                    <small style={{ color: "#FFF" }}>+234 814 8272 285</small>
                    <small style={{ color: "#FFF" }}>celvzyouthchurch@gmail.com</small>
                </Col>
                <Col md={4}>
                    <img src={logo} style={{ width: "100px", marginTop: "20px" }} onClick={() => navigate("/")} />
                </Col>
            </Row>
            <div className='copyright'>
                <small>&copy; 2022 All Rights Reserved</small>
            </div>
        </FooterWrapper>
    )
}

export default Footer;