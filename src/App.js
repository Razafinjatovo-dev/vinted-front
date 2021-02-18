import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import OfferDetails from "./containers/OfferDetails";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Payment from "./containers/Payment";
import PageIntrouvable from "./components/PageIntrouvable";
import CheckoutForm from "./components/CheckoutForm";
import Publish from "./components/Publish";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();
library.add(faEye, faEyeSlash, faSearch);

function App() {
  const Url = "https://vintweed.herokuapp.com";
  const [tokenCookies, setTokenCookies] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  const [skip, setSkip] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");

  Cookies.set("token", tokenCookies);
  return (
    <div className="App">
      <Router>
        <Header
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          tokenCookies={tokenCookies}
          setTokenCookies={setTokenCookies}
          title={setTitle}
          setTitle={setTitle}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sort={sort}
          setSort={setSort}
          skip={skip}
          setSkip={setSkip}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
        <Switch>
          <Route path="/Signup">
            <Signup
              Url={Url}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              setTokenCookies={setTokenCookies}
            />
          </Route>
          <Route path="/Offer/:id">
            <OfferDetails Url={Url} isConnected={isConnected} />
          </Route>
          <Route path="/Offer">
            <Offer />
          </Route>
          <Route path="/Login">
            <Login
              Url={Url}
              tokenCookies={tokenCookies}
              setTokenCookies={setTokenCookies}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
            />
          </Route>
          <Route path="/Publish">
            <Publish Url={Url} tokenCookies={tokenCookies} />
          </Route>
          <Route path="/Payment">
            <Payment />
          </Route>
          <Route exact path="/">
            <Home
              Url={Url}
              isConnected={isConnected}
              title={title}
              priceMin={priceMin}
              priceMax={priceMax}
              sort={sort}
              skip={skip}
              page={page}
              limit={limit}
            />
          </Route>
          <Route>
            <CheckoutForm Url={Url} />
          </Route>
          <Route exact path="*">
            <PageIntrouvable />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
