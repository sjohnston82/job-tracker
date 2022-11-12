import React from "react";

const Feature = (props) => {
  const { header, description, icon, position } = props;

  return (
    <div className="feature">
      <div className="icon-wrapper">
        <div className="icon">{icon}</div>
        <div className="icon-bg"></div>
      </div>

      <div
        className={
          position === "top" ? "feature__header top" : "feature__header"
        }
      >
        <p className="feature__header__text">{header}</p>
      </div>

      <div
        className={
          position === "bottom"
            ? "feature__description bottom"
            : "feature__description"
        }
      >
        <p className="feature__description__text">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
