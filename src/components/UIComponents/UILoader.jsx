import React from "react";
import Loader from "react-loader-spinner";

const UILoader = () => {
    return (
        <span className="spinner">
      <Loader type="Audio" color="salmon" height={80} width={80} />
    </span>
    );
};

export default UILoader;