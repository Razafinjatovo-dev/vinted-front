import React from "react";
import { useHistory } from "react-router-dom";
import bigPicture from "../assets/bigPicture.jpg";
import "./Underheader.css";

const Underheader = (props) => {
  const { isConnected } = props;
  let history = useHistory();
  const handleSellClick = () => {
    // console.log("sell item");
    if (isConnected === false) {
      history.push("/Login");
    } else {
      history.push("/Publish");
    }
  };
  return (
    <div className="Underheader-wrapper">
      <div  className="Underheader-pageContent-width-harmonizer">
        <div className="Underheader-big-picture">
          <img src={bigPicture} alt="" />
        </div>
        <div className="Underheader-white-square">
          <p>Prêts à faire du tri dans vos placards?</p>
          <button onClick={handleSellClick}>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Underheader;
