import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { LargeHeroButton } from "../components/home/CallToActionButtons";
import { AdsSection, FollowGodSection, WeAreSection, YouthImg } from '../components/home/landingPageStyles';
import "../components/Landing.css";
import { useNavigate } from 'react-router-dom';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import Footer from '../components/Footer';


const Landing = (props) => {
  const navigate = useNavigate()
  // const [isAuth, setIsAuth] = useContext(AuthContext);

  // useEffect(() => setIsAuth(isAuth), [isAuth])

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
              <LargeHeroButton style={{ marginLeft: 10, marginBottom: 15 }}>What We Do</LargeHeroButton>
              <LargeHeroButton outline={true} style={{ marginLeft: 10 }}>Stay Connected</LargeHeroButton>
            </ul>
          </span>
        </div>
        <div className="col-md-6 mr-auto bg-mask pr-md-5" style={{ display: "flex" }}>
          <YouthImg />
        </div>
      </div>
      <AdsSection>
        <div className="mask row">
          <Col md={7}>
            <div className="top" />
            <div className="footer row">
              <Col lg={8} className="mx-auto">
                <h1 className='date'>JUNE 4TH-&nbsp;<small>10am prompt</small></h1>
                <h1 className='venue'>The Tent LCA Liesure Garden</h1>
                <h1 className='address'><small>8, billings Way,</small>&nbsp;Oregun-Ikeja</h1>
              </Col>
              <Col lg={4} className="right">
                <LargeHeroButton style={{ width: 245 }} onClick={() => navigate(`/events/dyp2022`)}>Join Event</LargeHeroButton>
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
              <Button><ArrowForwardOutlinedIcon style={{ marginRight: 10 }} />Learn More</Button>
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
              <Button>
                <AiFillInstagram />
              </Button>
              <Button>
                <FaTiktok />
              </Button>
              <Button>
                <AiFillYoutube />
              </Button>
              <Button>
                <AiOutlineTwitter />
              </Button>
            </div>
          </Col>
          <Col md={5} className="right" />
        </div>
        <div className="footer-mask" />
      </FollowGodSection>
      <Footer />
    </div>
  );
};

export default Landing