import React from "react";

import hands from "../../../images/jobs/hands.jpg";
import LoginButton from "../../auth/LoginButton";
import LandingLowerLarge from "./LandingLowerLarge";

const LandingLarge = () => {
  return (
    <div className="landing-large">
      <div className="landing-large__main-page">
        <div className="landing-large__main-page__left-container">
          <p className="main-title">
            Your job search, <span className="title-accent">simplified</span>
          </p>
          <div className="main-title__subtext">
            <p className="main-title__subtext-lg">
              Relieve the headache of job hunting
            </p>
            <p className="main-title__subtext-sm">
              Discover an all-in-one service to help you stay ahead of the game
              in the search for your next job
            </p>
          </div>
          <div className="auth-btn-container">
            <LoginButton text="Get Started Now" />
            <div className="learn-more-link-wrapper">
              <p className="or">or</p>
              <a href="#landing-lower" className="learn-more">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="landing-large__main-page__right-container">
          <div className="landing-img-wrapper">
            <img src={hands} alt="Hands" />
          </div>
        </div>
      </div>
      <LandingLowerLarge />
    </div>
  );
};

export default LandingLarge;
