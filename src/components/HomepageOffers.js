import "./HomepageOffers.css";
import { Link } from "react-router-dom";
const HomepageOffers = (props) => {
  const { database } = props;

  // console.log(database)

  return (
    <div className="HomepageOffer-pageContent-width-harmonizer">
      <div className="HomepageOffer">
        {database.offers.map((offer) => {
          return (
            <Link
              to={`/Offer/${offer._id}`}
              key={offer._id}
              style={{ textDecoration: "none" }}
            >
              <div className="offerSheet">
                <div className="HomepageOffers-userInfo">
                  <img className="userPhoto" alt="userphoto" />
                  <span>{offer.owner.account.username}</span>
                </div>

                <div className="itemPicture">
                  <img src={offer.product_image.secure_url} alt="itempicture" />
                </div>

                <div className="itemData">
                  <p className="offerSheet_Price" style={{ color: "black" }}>
                    {offer.product_price} €
                  </p>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomepageOffers;
