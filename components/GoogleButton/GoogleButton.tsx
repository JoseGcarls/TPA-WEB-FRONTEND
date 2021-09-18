import { useMutation } from '@apollo/client';
import React, { useCallback, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { JWTContext } from '../../App';
import { LOGIN_GOOGLE } from '../../GraphQL/mutation';
// import "./GoogleButton.scss";


function isGoogleLoginResponseOffline(response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponseOffline {
  return response.code !== undefined;
}

function GoogleButton() {
  const [googleLogin, { data, loading, error }] = useMutation<{googleLogin: string}>(LOGIN_GOOGLE);
  const [_, setJWT] = useContext(JWTContext);

  useEffect(() => {
      console.log(data)
    if (data !== undefined && data !== null) {
      setJWT(data.googleLogin);
    }
  }, [data]);

  function responseGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if (isGoogleLoginResponseOffline(response)) {
      alert("Failed to login with google");
      return;
    }
  
    googleLogin({
      variables: { 
        accessToken: response.getAuthResponse().access_token,
      },
    });
  }

  if (loading) {
    return <div className="loading-moment"><div className="loading"></div>Loading</div> 
  }

  if (error) {
    console.log(error.networkError);
    return <p>An error has occured</p>;
  }

  return (
    <GoogleLogin
      clientId="334553447434-3ithajel5liv23565v05b3fpmdenjc6u.apps.googleusercontent.com"
      render={renderProps => (
        <button className="google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <div className="google-img"></div>
            <div className="google-text">Log in with Google</div>
        </button>
      )}
      onSuccess={responseGoogle}
      cookiePolicy="single_host_origin" />
  );
}

export default GoogleButton