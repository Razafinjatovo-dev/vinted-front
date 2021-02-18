import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "./Filter";
import VintedLogo from "../assets/VintedLogo.png";
import "./Header.css";

const Header = (props) => {
  const {
    isConnected,
    setIsConnected,
    setTokenCookies,
    title,
    setTitle,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sort,
    setSort,
    skip,
    setSkip,
    page,
    setPage,
    limit,
    setLimit,
  } = props;
  let history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const connectedHeader = (
    <div className="HeaderContainer">
      <div className="Header-pageContent-width-harmonizer">
        <div className="LogoWrapper">
          <Link to="/">
            <img
              className="Header-VintedLogo"
              src={VintedLogo}
              alt="Vinted Logo"
            />
          </Link>
        </div>

        <div className="Header-searchbox-banner">
          <div className="Header-searchbox-wrapper">
            <FontAwesomeIcon icon="search" style={{ color: "lightGrey" }} />
            <input
              className="Header-searchbox"
              type="search"
              placeholder="Rechercher des articles"
              onChange={handleTitle}
              value={title}
            />
          </div>
          <Filter />
        </div>

        <Link to="/">
          <button
            className="Header-logOut-button"
            onClick={() => {
              // Etape 1: supprimmer le cookie;
              setTokenCookies("");
              //  Etape 2: mettre state isConnected à false
              setIsConnected(false);
              //  Etape 3 redirect vers page de connexion
              history.push("/Login");
            }}
          >
            Se Déconnecter
          </button>
        </Link>
        <Link to="/Publish">
          <button className="sell-your-item-button">Vends tes articles</button>
        </Link>
      </div>
    </div>
  );

  const disconnectedHeader = (
    <div className="HeaderContainer">
      <div className="Header-pageContent-width-harmonizer">
        <div className="LogoWrapper">
          <Link to="/">
            <img
              className="Header-VintedLogo"
              src={VintedLogo}
              alt="Vinted Logo"
            />
          </Link>
        </div>
        <div className="Header-searchbox-banner">
          <div className="Header-searchbox-wrapper">
            <FontAwesomeIcon icon="search" style={{ color: "lightGrey" }} />
            <input
              className="Header-searchbox-input"
              type="search"
              placeholder="Rechercher des articles"
              onChange={handleTitle}
            />
          </div>
        </div>
        <Filter
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sort={sort}
          setSort={setSort}
        />
        <div className="Header-Signup-Login">
          <div className="Header-Signup-Login-ButtonsWrapper">
            <Link style={{ textDecoration: "none" }} to="/Signup">
              <p>S'inscrire</p>
            </Link>
            <span>|</span>
            <Link style={{ textDecoration: "none" }} to="/Login">
              <p>Se Connecter</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return isConnected === true ? connectedHeader : disconnectedHeader;
};

export default Header;
