import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    try {
      //Récupérer les données carte bancaire saisies
      const cardElement = elements.getElement(CardElement);

      //Demander création tokekstripe via API stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "for eg : user/buyer id to put here",
      });
      //   console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      // Requête vers serveur Back end
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, title: "Offer Title", amount: 1000 }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        alert("PAIEMENT VALIDE, MERCI DE VOTRE ACHATS");
      } else {
        alert("PAIEMENT REFUSE");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handlePaymentSubmit}>
        <CardElement />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
