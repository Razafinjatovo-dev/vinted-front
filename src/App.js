import "./App.css";


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
import Publish from "./components/Publish";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash, faSearch);

function App() {
  const [tokenCookies, setTokenCookies] = useState();
  const [isConnected, setIsConnected] = useState(false);
  Cookies.set("token", tokenCookies);
  return (
    <div className="App">
      <Router>
        <Header
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          tokenCookies={tokenCookies}
          setTokenCookies={setTokenCookies}
        />
        <Switch>
          <Route path="/Signup">
            <Signup isConnected={isConnected} setIsConnected={setIsConnected} />
          </Route>
          <Route path="/Offer/:id">
            <OfferDetails isConnected={isConnected} />
          </Route>
          <Route path="/Offer">
            <Offer />
          </Route>
          <Route path="/Login">
            <Login
              tokenCookies={tokenCookies}
              setTokenCookies={setTokenCookies}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
            />
          </Route>
          <Route path="/Publish">
            <Publish tokenCookies={tokenCookies} />
          </Route>
          <Route path="/Payment">
            <Payment />
          </Route>
          <Route exact path="/">
            <Home isConnected={isConnected} />
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
