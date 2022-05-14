import React from 'react';
import { Col } from 'reactstrap';
import { LargeHeroButton } from "../components/home/CallToActionButtons";
import { AdsSection, YouthImg } from '../components/home/landingPageStyles';
import "../components/Landing.css";
import { useNavigate } from 'react-router-dom';


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
              <Col md={8} className="mx-auto">
                <h1 className='date'>JUNE 4TH-&nbsp;<small>10am prompt</small></h1>
                <h1 className='venue'>The Tent LCA Liesure Garden</h1>
                <h1 className='address'><small>8, billing Way,</small>&nbsp;Oregun-Ikeja</h1>
              </Col>
              <Col md={4} className="right">
                <LargeHeroButton onClick={() => navigate(`/events/dyp2022`)}>Join Event</LargeHeroButton>
              </Col>
            </div>
          </Col>
        </div>
      </AdsSection>
      {/* <div className="body">
        <div className='body-info'>
          <div className='body-txt'>
            <h1 className="sub-text">YOU</h1>
            <span className="big-text">Found Home</span>
            <ul class="btn btn-top">
              <LargeHeroButton outline={true}>Watch Previous</LargeHeroButton>
              <LargeHeroButton style={{ marginLeft: 20 }}>Join This Family</LargeHeroButton>
            </ul>
          </div>
        </div>
      </div>

      <div className='body-1'>
        <div className='body-bg'>
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
        </div>
      </div>

      <div className='social'>
        <div className='social-px'>
          <div className='hero'>
            <div className="flex-2">
              <h2 className='hero-1'><span className='follow_light'>FOLLOW </span> GOD<span className='on_light'> ON</span><br/><span className='follow_span'>SOCIALS</span></h2>
              <div className="flex-3" />
            </div>
           

          </div>




        </div>

      </div> */}



    </div>
  );
};

export default Landing