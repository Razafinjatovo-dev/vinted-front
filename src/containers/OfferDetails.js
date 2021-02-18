import React from "react";
import Payment from "./Payment";
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./OfferDetails.css";

const OfferDetails = (props) => {
  let history = useHistory();
  const { Url, isConnected } = props;
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
      const response = await axios.get(`${Url}/offer/${id}`);
      setOfferData(response.data);
      setisLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Offer details loading...</p>
  ) : (
    <div className="OfferDetails_globalWrapper">
      <div className="OfferDetails_container">
        <div className="image_wrapper">
          <img
            className="OfferDetails_item_picture"
            src={offerData.product_image.secure_url}
            alt="itemPhoto"
          />
        </div>
        <div className="OfferDetails_rightPart">
          <p className="OfferDetails_price">{offerData.product_price} €</p>
          <table>
            <tbody>
              {offerData.product_details.map((info, index) => {
                const keys = Object.keys(info);
                const filteredKeys = [];
                return (
                  <tr key={index}>
                    {keys[0] !== undefined && (
                      <>
                        <td className="infoTitle">{keys[0]}</td>
                        <td>{info[keys[0]].toUpperCase()}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <hr></hr>
          <p className="OfferDetails_product_name">{offerData.product_name}</p>
          <p>{offerData.product_description}</p>
          <p className="OfferDetails_user_name">
            Published by {offerData.owner.account.username}
          </p>
          <div className= "buttonWrapper">
            <button className="OfferDetails_button" onClick={handleBuyClick}>
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
