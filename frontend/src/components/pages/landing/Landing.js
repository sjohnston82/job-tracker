import React, { useContext } from "react";

import LoginButton from "../../auth/LoginButton";
import LandingLower from "./LandingLower";
import LandingLarge from "./LandingLarge";

import { JobContext } from "../../../helpers/JobContext";

const Landing = () => {
  const { windowSize } = useContext(JobContext);
  return windowSize.innerWidth < 1024 ? (
    <div className="landing">
      <div className="landing__top-section">
        <p className="landing__top-section__title">
          Your job search, <span className="title-accent">simplified.</span>
        </p>
        <p className="landing__top-section__sub-title">
          Discover an all-in-one service to help you stay ahead of the game in
          the search for your next job.
        </p>

        <div className="auth-btn-container-sm">
          <LoginButton text="Get Started Now" />
          <div className="learn-more-link-wrapper-sm">
            <p className="or-sm">or</p>
            <a href="#landing-lower" className="learn-more-sm">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <LandingLower />
    </div>
  ) : (
    <LandingLarge />
  );
};

export default Landing;
