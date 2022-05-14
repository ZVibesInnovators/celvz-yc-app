import React from "react";
import { LargeHeroButton } from "./home/CallToActionButtons";

const Header = () => {
  return (
    <div className="header-wraper header-bg">
      <div className="main-info p-3 p-md-5">
        <h1 className="sub-view mb-0 mt-0 text-center">An Oasis</h1>
        <h1 className="sub-view mb-0 mt-3">
          <span className="big-view text-center">Of Love</span>
        </h1>
        <span className="mt-md-5">
          <ul class="btn btn-next mt-md-5 mt-3">
            <LargeHeroButton>What We Do</LargeHeroButton>

            <LargeHeroButton outline={true} style={{ marginLeft: 10 }}>Stay Connected</LargeHeroButton>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default Header

