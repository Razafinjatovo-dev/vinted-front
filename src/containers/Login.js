import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Cookies from "js-cookie";
import './Login.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = (props) => {
    
    const{tokenCookies, setTokenCookies,setIsConnected} = props;
    const[errorMessage, setErrorMessage] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    // eslint-disable-next-line
    // const[isLoading,setIsLoading] = useState("true");
    let history = useHistory();
    const [hidePassword, setHidePassword] = useState(true)
    
    
    const handleClickOnEyeIcon = () => {
        // console.log ('Clicked');
        setHidePassword(!hidePassword);
    };

    const handleSubmit = async (event) => {
            event.preventDefault();
            if (email ==="" || password===""){
                setErrorMessage ('email and/or password missing');
            };
            try{
                const response = await axios.post('https://lereacteur-vinted-api.herokuapp.com/user/login', {email: email,password: password});
                // setIsLoading(false);
                setIsConnected(true);
                // Cookie Token
                const token = response.data.token;
                setTokenCookies(token);
                Cookies.set("userToken", tokenCookies, {expires:1});
                //Redirect homepage
                history.push("/");
               
            }catch(error){
                // console.log(error.response);
                // console.log(error.response.data.message);
                if(email && password){
                    setErrorMessage(error.response.data.message + ", please sign up");
                }
            }
        }

    return(
        <div className='Login-wrapper'>
            <form className= 'Login-border' onSubmit= {handleSubmit}>
                <p style={{color: "red"}}>{errorMessage}</p>
                <h1>Se connecter</h1>
                <input type='email' value={email} placeholder='Adresse mail'onChange={(event) => {
                    setEmail(event.target.value);
                }}/>
                <div className= 'login_password_input'>
                    <input type= {hidePassword? 'password' : 'text'} value={password} placeholder='Mot de passe' onChange={(event) => {
                        setPassword(event.target.value);
                    }}/>
                    <FontAwesomeIcon icon= {hidePassword? 'eye-slash': 'eye'} onClick={handleClickOnEyeIcon}/>
                </div>
                
                <br/>
                <button type='submit'>Se connecter</button>
                <Link style ={{textDecoration : 'none'}}to='/'>
                <p className= 'Forgotten_Password'>Mot de passe oublié</p>
                </Link>
            </form>
        </div>

    )
}

export default Login; 
