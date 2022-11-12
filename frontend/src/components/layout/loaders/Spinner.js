import React from "react";

function Spinner(props) {
  const { type } = props;
  return type === "landing" ? (
    <div className="spin-wrap">
      <h1 className="spin-text">
        Loading Job<span className="title-accent">Tracker</span>...
      </h1>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="spin-wrap">
      <h6>Fetching Jobs...</h6>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
