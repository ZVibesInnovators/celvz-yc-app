import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import logo from "./assest/image/logoLarge.png"

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

    return (
        <FooterWrapper >
            <Row>
                <Col md={8}>
                    <span>+234 814 8272 285</span>
                    <span>celvzyouthchurch@gmail.com</span>
                    <span>24 Sanyaolu Street Off Kudirat Abiola Way<br />
                        Ikeja, Lagos State.</span>
                </Col>
                <Col md={4}>
                    <img src={logo} />
                </Col>
            </Row>
            <div className='copyright'>
                <small>&copy; 2021 All Rights Reserved</small>
            </div>
        </FooterWrapper>
    )
}

export default Footer;