import React from "react";

import Feature from "./Feature";
import LoginButton from "../../auth/LoginButton";



import {
  PencilSimpleLine,
  UploadSimple,
  ClipboardText,
  Archive,
} from "phosphor-react";

const LandingLowerLarge = () => {
  return (
    <div className="landing-lower-large" id="landing-lower">
      <h1 className="landing-lower-large__header">Optimize your job search</h1>

      <p className="landing-lower-large__sub-text">
        Job<span className="title-accent">Tracker</span> gives you the ability
        to:
      </p>

      <div className="features-list-wrapper">
        <ul className="features-list">
          <li className="feature-wrapper">
            <Feature
              icon={<PencilSimpleLine size={60} />}
              header="Get Organized"
              description="Store important job application info to help keep you organized and
                efficient in your job search."
              position="top"
            />
          </li>

          <li className="feature-wrapper">
            <Feature
              icon={<UploadSimple size={60} />}
              header="Upload Documents"
              description="Upload pertinent documents to your job applications, such as resumes
            and cover letters."
            />
          </li>

          <li className="feature-wrapper">
            <Feature
              icon={<ClipboardText size={60} />}
              header="Track Your Progress"
              description="Keep track of your job search progress and sort and filter active and
            archived listings."
            />
          </li>

          <li className="feature-wrapper">
            <Feature
              icon={<Archive size={60} />}
              header="Remember Your History"
              description="Archive your job applications to easily keep track of where you have applied to in the past and when. "
              position="bottom"
            />
          </li>
        </ul>
      </div>
      <div className="login-btn-container">
        <LoginButton text="Get Started Now" />
      </div>
    </div>
  );
};

export default LandingLowerLarge;
