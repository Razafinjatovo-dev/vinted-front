import React from "react";
import Payment from './Payment';
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./OfferDetails.css";

const OfferDetails = (props) => {
  let history = useHistory();
  const { isConnected } = props;
  const [isLoading, setisLoading] = useState(true);
  const [offerData, setOfferData] = useState();
  const { id } = useParams();
  const handleBuyClick = (event) => {
    if (isConnected === true) {
      history.push("/Payment");
    } else {
      alert("You need to login or create account");
      history.push("/Signup");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setOfferData(response.data);
      setisLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Offer details loading...</p>
  ) : (
    <div className="OfferDetails_container">
      <div>
        <img
          className="OfferDetails_item_picture"
          src={offerData.product_image.secure_url}
          alt="itemPhoto"
        />
      </div>
      <div className="OfferDetails_rightPart">
        <p className="OfferDetails_price">{offerData.product_price} €</p>
        <div>
          {offerData.product_details.map((info, index) => {
            const keys = Object.keys(info);
            return (
              <div key={index} className="OfferDetails_itemInfos_upperPart">
                <p>{keys[0]}</p>
                <p className="left">{info[keys[0]]}</p>
              </div>
            );
          })}
        </div>
        <hr></hr>
        <p className="OfferDetails_product_name">{offerData.product_name}</p>
        <p>{offerData.product_description}</p>
        <div className="Offerdetails_userAvatar">
          <img
            // src={offerData.owner.account.avatar.secure_url}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            alt={offerData.owner.account.username}
          />
          <p className="OfferDetails_user_name">
            {offerData.owner.account.username}
          </p>
        </div>
        <button className="OfferDetails_button" onClick={handleBuyClick}>
          Acheter
        </button>
        
      </div>
    </div>
  );
};

export default OfferDetails;
