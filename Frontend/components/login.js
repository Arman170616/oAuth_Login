
import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';


export const Login = () => {
    const clientId = "278115674083-r2kgdv6t5ifv76hdnp08ft07ktolb4nt.apps.googleusercontent.com";

      const onSuccess = async (res) => {
        console.log('succzddgsfgess:', res.accessToken);
        const user = {
              "grant_type":"convert_token",
              "client_id":"278115674083-r2kgdv6t5ifv76hdnp08ft07ktolb4nt.apps.googleusercontent.com",
              "client_secret": "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",
              "backend":"google-oauth2",
              "token": res.accessToken
            };
            //console.log(user)
            const {data} = await axios.post('http://localhost:8000/api-auth/convert-token', user ,{headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});

            //console.log(data, data['access_token'])
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access_token']}`;
            localStorage.clear();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            window.location.href = '/'
      }

      const onFailure = (err) => {
        console.log('failed:', err);
      };

    

    return(
        <div className="Auth-form-container">
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            
        />
        </div>

    )
}