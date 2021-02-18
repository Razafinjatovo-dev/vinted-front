import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {

  const { Url, tokenCookies, setTokenCookies, setIsConnected } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  let history = useHistory();
  const [hidePassword, setHidePassword] = useState(true);

  const handleClickOnEyeIcon = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      return setErrorMessage("email and/or password missing");
    }
    try {
      const response = await axios.post(`${Url}/user/login`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setIsConnected(true);
        // Cookie Token
        const token = response.data.token;
        setTokenCookies(token);
        Cookies.set("userToken", tokenCookies, { expires: 1 });
        //Redirect homepage
        history.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="Login-wrapper">
      <form className="Login-border" onSubmit={handleSubmit}>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <h1>Se connecter</h1>
        <input
          required="required"
          type="email"
          value={email}
          placeholder="Adresse mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div className="login_password_input">
          <input
            required="required"
            type={hidePassword ? "password" : "text"}
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={hidePassword ? "eye-slash" : "eye"}
            onClick={handleClickOnEyeIcon}
          />
        </div>

        <br />
        <button type="submit">Se connecter</button>
        <Link style={{ textDecoration: "none" }} to="/">
          <p className="Forgotten_Password">Mot de passe oublié</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
