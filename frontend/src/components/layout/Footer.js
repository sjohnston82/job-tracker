import React, { useContext } from "react";

import { JobContext } from "../../helpers/JobContext";
import { UserContext } from "../../helpers/UserContext";

const Footer = () => {
  const { isAuthenticated, showingContact } = useContext(UserContext);
  const { windowSize } = useContext(JobContext);

  return (
    <div
      className={
        !isAuthenticated && !showingContact && windowSize.innerWidth > 1023
          ? "footer-bg-landing"
          : "footer-bg"
      }
    >
      <p className="footer-text">© Stephen Johnston, 2022</p>
    </div>
  );
};

export default Footer;
