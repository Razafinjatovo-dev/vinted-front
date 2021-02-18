import "./Signup.css";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = (props) => {
  let history = useHistory();
  const { Url, setIsConnected, setTokenCookies } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "" || email === "") {
      setErrorMessage("Username and/or Password  and/or email missing");
    }

    try {
      const response = await axios.post(`${Url}/user/signup`, {
        email: email,
        username: username,
        password: password,
      });
      setTokenCookies(response.data.token);
      Cookies.set("userToken", response.data.token);
      setIsConnected(true);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="Signup-Wrapper">
      <div className="Signup-Border">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <p style={{ color: "red" }}>{errorMessage}</p>

          <div className="input_name_email_password">
            <input
              required="required"
              type="text"
              placeholder={`Nom d'utilisateur`}
              value={username}
              onChange={(event) => {
                const input = event.target.value;
                setUsername(input);
              }}
            />

            <br />

            <input
              required="required"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <br />

            <input
              required="required"
              type="password"
              placeholder={`Mot de passe`}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <br />
          </div>

          <div className="checkbox_newsletter">
            <input
              className="signup_checkbox"
              type="checkbox"
              name="newsletter"
            />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
          </div>
          <div className="checkbox_TandC">
            <p>
              {" "}
              En m'inscrivant je confirme avoir lu et accepté les{" "}
              <span>{`Termes & Conditions`}</span> et{" "}
              <span>{`Politique de Confidentialité`}</span> de Vinted. Je
              confirme avoir au mois 18 ans.
            </p>
          </div>

          <button type="submit">S'inscrire</button>
          <Link style={{ textDecoration: "none" }} to="/Login">
            <p className="already_signed_up">
              <span>Tu as déjà un compte? Connecte-toi!</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
