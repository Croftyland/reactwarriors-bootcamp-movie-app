import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UIIcon = ({isAdd, type, onClick }) => {
 
  return (
    <FontAwesomeIcon
      icon={[isAdd ? "fas" : "far", `${type}`]}
      onClick={onClick}
      className = "bookmark-icon"
    />
  );
};

export default UIIcon;
