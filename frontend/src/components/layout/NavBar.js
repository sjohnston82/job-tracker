import React, { useContext, useRef } from "react";

import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

import { JobContext } from "../../helpers/JobContext";
import { UserContext } from "../../helpers/UserContext";

import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const {
    getJobs,
    showingSearchbar,
    setShowingSearchbar,
    resetter,
    windowSize,
  } = useContext(JobContext);

  const {
    isAuthenticated,
    userData,
    setShowingContact,
    showingContact,
    user,
    showingProfile,
    setShowingProfile,
  } = useContext(UserContext);

  const navRef = useRef();

  const toggleShowNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    if (showingSearchbar) setShowingSearchbar(false);
  };

  const handleLinkClick = (type) => {
    if (type === "contact") {
      setShowingContact(true);
      setShowingProfile(false);
    } else if (type === "profile") {
      setShowingProfile(true);
      setShowingContact(false);
      getJobs();
    } else {
      resetter();
      getJobs();
    }

    if (windowSize?.innerWidth < 1024) toggleShowNavbar();
  };

  return windowSize?.innerWidth < 1024 ? (
    <header>
      <div className="logo">
        <h3 className="nav-title" >
          Job<span className="nav-title-span">Tracker</span>
        </h3>
      </div>
      <nav ref={navRef}>
        <div className="nav-links-container">
          <div className="main-nav-links">
            <a
              href="/#"
              id="home-link"
              onClick={() =>{ handleLinkClick("home")}}
              className={
                !showingContact && !showingProfile
                  ? "main-nav-links__link active"
                  : "main-nav-links__link"
              }
            >
              Home
            </a>
            <a
              href="/#"
              onClick={() => handleLinkClick("contact")}
              id="contact-link"
              className={
                showingContact
                  ? "main-nav-links__link active"
                  : "main-nav-links__link"
              }
            >
              Contact
            </a>
            {isAuthenticated && (
              <a
                href="/#"
                onClick={() => handleLinkClick("profile")}
                id="profile-link"
                className={
                  showingProfile
                    ? "main-nav-links__link active"
                    : "main-nav-links__link"
                }
              >
                Profile
              </a>
            )}

            <div className="mobile-auth-div">
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <LoginButton text="Login" />
              )}
            </div>
          </div>
          <div className="auth-btns">
            {isAuthenticated ? (
              <div className="auth-div">
                <img src={userData.avatar} alt={userData.username} />
                <span className="auth-logout-btn">
                  <LogoutButton />
                </span>
              </div>
            ) : (
              <div className="auth-div-login">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
        <button className="nav-btn close-nav-btn" onClick={toggleShowNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={toggleShowNavbar}>
        <FaBars />
      </button>
    </header>
  ) : (
    <nav className="large-nav">
      <div className="nav-home-div">
        <button className="nav-home-link nav-btn-lg" onClick={handleLinkClick}>
          Home
        </button>
      </div>
      {isAuthenticated && (
        <div className="nav-profile-div">
          <button
            className="nav-profile-link nav-btn-lg"
            onClick={() => handleLinkClick("profile")}
          >
            Profile
          </button>
        </div>
      )}
      <div className="nav-logo-div">
        {" "}
        <h3 className="nav-title-large" onClick={resetter}>
          Job<span className="nav-title-span-large">Tracker</span>
        </h3>
      </div>
      <div className="nav-contact-div">
        <button
          className="nav-contact-link nav-btn-lg"
          onClick={() => handleLinkClick("contact")}
        >
          Contact
        </button>
      </div>
      <div className="nav-auth-div">
        {!isAuthenticated ? (
          <div className="login-wrapper">
            <LoginButton text="Login" />
          </div>
        ) : (
          <div className="auth-div-lg">
            <div className="avatar-wrapper">
              <img
                className="nav-avatar-lg"
                src={userData.avatar}
                alt="Avatar"
              />
            </div>
            <div className="logged-in-div">
              <p className="welcome-text">
                {userData.displayName ||
                  userData.username ||
                  user.username ||
                  "Welcome!"}
              </p>
              <div className="logout-container">
                <LogoutButton /> <FiLogOut className="logout-icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
