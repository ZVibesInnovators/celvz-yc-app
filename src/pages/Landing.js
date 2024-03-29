import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { LargeHeroButton } from "../components/home/CallToActionButtons";
import { AdsSection, FollowGodSection, WeAreSection, YouthImg } from '../components/home/landingPageStyles';
import "../components/Landing.css";
import { useNavigate } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { NoLiveStreamWrapper } from '../components/styledComponents/events/EventStyles';
import { Flicker } from '../components/home/livePageStyles';


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header-wraper header-bg row">
        <div className="main-info p-3 p-md-5 col-md-6 bg-mask">
          <h2 className="sub-view mb-0 mt-0">An Oasis</h2>
          <h1 className="sub-view mb-0 mt-3 hero-text">
            Of Love
          </h1>
          <span className="mt-md-5">
            <ul className="btn btn-next mt-md-5 mt-3">
              <LargeHeroButton onClick={() => navigate("/about")} style={{ marginLeft: 10, marginBottom: 15 }}>What We Do</LargeHeroButton>
              <LargeHeroButton onClick={() => navigate("/live")} outline={true} style={{ marginLeft: 10 }}>Stay Connected</LargeHeroButton>
            </ul>
          </span>
        </div>
        <div className="col-md-6 mr-auto bg-mask pr-md-5" style={{ display: "flex" }}>
          <YouthImg />
        </div>
      </div>
      <AdsSection>
        <div className="mask row" style={{ alignItems: "center" }}>
          <Col md={7}>
            {/* <div className="top" /> */}
            <div className="footer row" >
               <Col lg={4} className="right">
               {/* <LargeHeroButton style={{ width: 245 }} onClick={() => navigate(`/events/gitd`)}>Join Event</LargeHeroButton>
              */}</Col> 
              <Col lg={8} className="ml-auto" style={{ justifyContent: "flex-end"}} >
                <h1 className='date'>The Cornerstone Basement,</h1>
                <h1 className='venue'>LCA Leisure Car Park,</h1>
                <h1 className='venue'>8 Billings Way, Off Kudirat Abiola Way,</h1>
                <h1 className='venue'>Oregun, Ikeja - Lagos.</h1>
                <LargeHeroButton style={{ width: 245, marginTop: 20 }} onClick={() => navigate(`/about`)}>Learn More</LargeHeroButton>
                {/* <h1 className='address'><small>8, billings Way,</small>&nbsp;Oregun-Ikeja</h1> */}
              </Col>
            </div>
          </Col>
        </div>
      </AdsSection>

      <div className='body-1'>
        <WeAreSection>
          <Row>
            <Col xs={10} md={8} lg={6}>
              <h1 className="sub-txt mb-0 mt-0">WE ARE</h1>
              <h1 className="big-txt mb-0 mt-2">
                <span>LOVEWORLD</span>
              </h1>
              <p className='ark'> CELVZ Youth Church Is Where The Littest Youths For Jesus Are Being Raised. We Are A Special People
                Of Purpose, Passion, And Power, Living Out The God Life, Taking God's Divine Presence To
                The Nations And People Of The Earth, And Demonstrating The Character Of The Spirit.
                This&nbsp;Is&nbsp;The&nbsp;Global Youth Ministry Of <span className='highlight-word-color'>Christ Embassy Lagos Virtual Zone (CELVZ)</span> - An Ark For Every
                Young Person In The Wolrld. You're Welcome To The Love Family!
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3} style={{ marginLeft: "auto" }}>
              <Button onClick={() => navigate("/about")}><ArrowForwardOutlinedIcon style={{ marginRight: 10 }} />Learn More</Button>
            </Col>
          </Row>
        </WeAreSection>
      </div>

      <FollowGodSection>
        <div className="row mask">
          <Col md={6}>
            <h3>FOLLOW GOD ON</h3>
            <h1>SOCIALS</h1>
            <div className="social-buttons">
              <Button className='pulse' onClick={() => window.open("https://www.instagram.com/celvzyouthchurch/", "_blank")}>
                <AiFillInstagram />
              </Button>
              <Button className='pulse delay-1' onClick={() => window.open()}>
                <FaTiktok />
              </Button>
              <Button className='pulse delay-3' onClick={() => window.open("https://www.youtube.com/channel/UCygsDfFK6e5nzAZ4Gl8S0Wg", "_blank")}>
                <AiFillYoutube />
              </Button>
              <Button className='pulse delay-2' onClick={() => window.open("https://twitter.com/celvzyouth", "_blank")}>
                <AiOutlineTwitter />
              </Button>
            </div>
          </Col>
          <Col md={5} className="right" />
        </div>
        <div className="footer-mask" />
      </FollowGodSection>
      {/* <Footer /> */}
    </div>
  );
};

export default Landing

export const WorshipWithUs = (props) => {

  return <NoLiveStreamWrapper style={{ height: "300px"}}>
      <Flicker>
          <div id="text">
              <h1>Wor<span id="offset">sh</span>ip &nbsp; With <span id="offset">Us</span></h1>
          </div>
      </Flicker>
  </NoLiveStreamWrapper>
}