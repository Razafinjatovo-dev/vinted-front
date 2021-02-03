import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import './Home.css';
import HomepageOffers from '../components/HomepageOffers';
import Underheader from '../components/Underheader';


const Home = (props) => {
    const{isConnected} = props;
    const [database,setDatabase] = useState();
    const [isLoading, setisLoading] = useState(true)
    
    useEffect(()=> {
        const fetchData = async() => {
            const response = await axios.get('https://lereacteur-vinted-api.herokuapp.com/offers');
            setDatabase(response.data);
            setisLoading(false);
        }
        fetchData();
    },[]);
    return isLoading? (<p>En cours de chargement...</p>):(
        <div>
            <Underheader isConnected ={isConnected}/>
            <HomepageOffers database ={database} />
        </div>
    )
}

export default Home;