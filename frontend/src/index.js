import React from "react";
import ReactDOM from "react-dom/client";

import "./dist/css/main.css";

import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";

import { UserContextProvider } from "../src/helpers/UserContext";
import { JobContextProvider } from "../src/helpers/JobContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// console.log(domain, clientId, process.env.CLOUD_NAME);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <UserContextProvider>
        <JobContextProvider>
          <App />
        </JobContextProvider>
      </UserContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
