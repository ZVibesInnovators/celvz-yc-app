import React, { useContext, useEffect } from 'react';
import "../components/Landing.css";
import { AuthContext } from '../contexts/AuthContext';
import { LargeHeroButton } from "../components/home/CallToActionButtons";


const Landing = (props) => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  useEffect(() => setIsAuth(true), [])
  return (
    <div>
      <div className="header-wraper header-bg">
      <div className="main-info p-3 p-md-5">
        <h2 className="sub-view mb-0 mt-0">An Oasis</h2>
        <h1 className="sub-view mb-0 mt-3 hero-text">
          Of Love
        </h1>
        <span className="mt-md-5">
          <ul class="btn btn-next mt-md-5 mt-3">
            <LargeHeroButton style={{ marginLeft: 10, marginBottom:15}}>What We Do</LargeHeroButton>

            <LargeHeroButton outline={true} style={{ marginLeft: 10}}>Stay Connected</LargeHeroButton>
          </ul>
        </span>
      </div>
    </div>
      <div className="body">
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

      </div>



    </div>
  );
};

export default Landing