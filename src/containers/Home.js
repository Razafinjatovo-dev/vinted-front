import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Home.css";
import HomepageOffers from "../components/HomepageOffers";
import Underheader from "../components/Underheader";
import Loading from "../components/Loading"

const Home = (props) => {
  const {
    Url,
    isConnected,
    title,
    priceMin,
    priceMax,
    sort,
    skip,
    page,
    limit,
  } = props;
  const [database, setDatabase] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${Url}/offers?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}&skip=${skip}&page=${page}&limit=${limit}`
      );
      setDatabase(response.data);
      setisLoading(false);
    };
    fetchData();
  }, [Url, isConnected, title, priceMin, priceMax, sort, skip, page, limit]);
  return isLoading ? (
    <Loading/>
  ) : (
    <div>
      <Underheader isConnected={isConnected} />
      <HomepageOffers database={database} />
    </div>
  );
};

export default Home;
