import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="Loading_wrapper">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={10000} //10 secs
      />
    </div>
  );
};

export default Loading;
