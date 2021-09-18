import Footer from '../../components/footer/Footer'
import './LoginPage.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOAD_USER } from '../../GraphQL/mutation';
import { JWTContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [_, setJWT] = useContext(JWTContext)
    const [getUsers, {loading, error, data}]= useMutation(LOAD_USER)
    const history = useHistory();
    const checkUser = () => {
        getUsers({
            variables:{
                email: email,
                password : password
            }
        })
        if(!loading){
            console.log(data, error)
        }
        if(data.getUser == "false"){
            console.log("Error")
        }
    }
    useEffect(() => {
        if (data !== undefined && data !== null) {
            setJWT(data.getUser)
            localStorage.setItem("username",data.getUser.username)
            history.push("/");
        }
    },[data])
    return(
        <div>
            <div className="login-page">
                <div className="login-content-1">
                    <img src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg" alt=""/>
                </div>
                <div className="login-content-2">
                    <form className="login-form" >
                        <div className="title">
                            InSOgram
                        </div>
                        <input type="text" name="email" id="email" placeholder="Email" onChange={
                            e => {
                                setEmail(e.target.value)
                            }
                        }/>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={
                            e => {
                                setPassword(e.target.value)
                            }
                        }/>
                        <div className="error-message">{error != null ? error.message : <div></div>}</div>
                        {
                            error?.message == "please Verify your Account" ? 
                                <Link to={"/verification/" + email} className="verif-btn">
                                    <div className="verify">Click Here To Verify</div>
                                </Link>
                                :
                                <div></div>
                        }
                        <button type="button" onClick={checkUser}>{loading ? <div className="loading-moment"><div className="loading"></div>Loading</div> : "Login"}</button>
                        <span className="or">OR</span>
                        {/* <button className="google-btn">
                            <div className="google-img"></div>
                            <div className="google-text">Log in with Google</div>
                        </button> */}
                        <GoogleButton/>
                        <a href="/forgotpassword" className="fgpass">Forgot password?</a>

                    </form>
                    <div className="register-button">
                        Don't have an account?
                        <a href="/register">Sign up</a>
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
export default LoginPage