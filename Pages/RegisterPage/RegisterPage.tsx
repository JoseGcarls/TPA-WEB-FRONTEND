import './RegisterPage.scss'
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client'
import {CREATE_USER} from '../../GraphQL/mutation'
import { useHistory } from 'react-router-dom';

import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { EmailContext } from '../../App';
function RegisterPage(){
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_, setEctx] = useContext(EmailContext)
    const history = useHistory();

    
    var [createUser, userdata] = useMutation(CREATE_USER)
    // console.log(fullname, email, username, password)
    const newUser = () => {
        console.log(fullname, email, username, password)
        createUser({
            variables:{
                fullname : fullname,
                email : email,
                username : username,
                password : password,
                verify : false
            }
        })

        
    }
    
    useEffect(() => {
        console.log(userdata.data, userdata.error)
        if (userdata.data !== undefined &&  userdata.data !== null) {
          history.push("/verification/" + email);
          setEctx(email)
        }
      }, [userdata.data]);
      
    return(
        <div>
            <div className="register-page">
                <div className="register-content">
                    <form className="register-form">
                        <div className="title">
                            InSOgram
                        </div>
                        <div className="sub-title">
                            Sign up to see photos and videos from your friends.
                        </div>
                        {/* <button className="google-btn">
                            <div className="google-img"></div>
                            <div className="google-text">Log in with Google</div>
                        </button> */}
                        <GoogleButton/>
                        <span className="or">OR</span>
                        <input type="text" name="email" id="email" placeholder="Email" onChange={
                            (e) => {
                                setEmail(e.target.value.trim())
                                
                            }
                        } required/>
                        <input type="text" name="fullname" id="fullname" placeholder="Full Name" onChange={
                            e => {
                                setFullname(e.target.value)
                                
                            }
                        } required/>
                        <input type="text" name="username" id="username" placeholder="Username" onChange={
                            e =>{
                                setUsername(e.target.value)
                            }
                        } required/>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={
                            e => {
                                setPassword(e.target.value)
                                
                            }
                        } required/>
                        
                        <div className="error-message">{userdata.error != null ? userdata.error.message : <div></div>}</div>
                        
                        <button type="button" onClick={newUser}>{userdata.loading ? <div className="loading-moment"><div className="loading"></div>Loading</div> : "Register"} </button>
                        <div className="terms">
                            By signing up, you agree to our Terms, Data Policy and Cookies Policy
                        </div>
                    </form>
                    <div className="register-button">
                        Have an account?
                        <a href="/login">Sign in</a>
                    </div>
                    <div className="title-content-2">
                        Get the app
                    </div>
                    <div className="install-button">
                        <a href="https://apps.apple.com/us/app/instagram/id389801252">
                            <div className="install-image-1"></div>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=in&gl=US">
                            <div className="install-image-2"></div>
                        </a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default RegisterPage