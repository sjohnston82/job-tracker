import React from "react";

import LoginButton from "../../auth/LoginButton";

const LandingLower = () => {
  return (
    <div className="landing__lower-section" id="landing-lower">
      <div className="landing__lower-section__features">
        <h6 className="landing__lower-section__features__title">
          Optimize your job search
        </h6>
        <p className="landing__lower-section__features__sub-title">
          Job<span className="title-accent">Tracker</span> gives you the ability
          to:
        </p>
        <ul className="landing__lower-section__features__features-list">
          <li className="landing__lower-section__features__features-list__item">
            Store important job application info to help keep you organized and
            efficient in your job search.
          </li>
          <li className="landing__lower-section__features__features-list__item">
            Upload pertinent documents to your job applications, such as resumes
            and cover letters.
          </li>
          <li className="landing__lower-section__features__features-list__item">
            Track your job search progress and sort and filter active and
            archived listings.
          </li>
          <li className="landing__lower-section__features__features-list__item">
            Archive old job applications to keep track of who you've applied to
            in the past.
          </li>
          <li className="landing__lower-section__features__features-list__item">
            ...and more!
          </li>
        </ul>
      </div>
      <LoginButton text="Get Started Now" />
    </div>
  );
};

export default LandingLower;
