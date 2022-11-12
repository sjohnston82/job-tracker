import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ text }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="auth-btn auth-btn-lg" onClick={loginWithRedirect}>
        {text}
      </button>
    )
  );
};

export default LoginButton;
