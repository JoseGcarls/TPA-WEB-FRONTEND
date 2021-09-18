import { lock } from '../../static/Assets/images.js';
import './ForgotPassword.scss'
import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../GraphQL/mutation';
function ForgotPasswordPage(){
    const [fgpass, {loading, error, data}] = useMutation(FORGOT_PASSWORD)
    const [email, setEmail] = useState("")
    const [click, setclick] = useState(false)
    const [timer, setTimer] = useState(0)
    const [success, setSuccess] = useState(false)
    function sendData(){
        fgpass({
            variables : {
                email : email
            }
        })       
    }
    useEffect(()=>{
        console.log(error, loading, data)
        if(loading){
            console.log("loading")
        }else{
            if(error == null && click == true){
                setTimer(60);
                setSuccess(true)
            }else if(error != null){
                setSuccess(false)
            }
        }
    },[error,loading])
    useEffect(()=>{
        if (timer != 0){
            setTimeout(() => {
                setTimer(timer - 1)
                
            }, 1000);
            document.getElementById("send-button").style.backgroundColor = "rgb(153, 152, 152)";     
        }else if(timer == 0){
            document.getElementById("send-button").style.backgroundColor = "#0073ff";
        }
    })

    return(
        <div>
            <div className="fgpass-page">
                <div className="fgpass-content">
                    <form action="" className="fgpass-form">
                        <div className="logo">
                            <img src={lock} alt="" className="lock"/>
                        </div>
                        <div className="title">
                            Trouble Logging in?
                        </div>
                        <div className="sub-title">
                            Enter your email and we'll send you a link to get back into your account
                        </div>
                        <input type="text" name="email" id="email" placeholder="Email" onChange={e => {
                            setEmail(e.target.value)
                        }}/>
                        <div className="error-message">{error != null ? error.message : <div></div>}</div>
                        <div className="success-message">{success == true && click == true? "Please check your email!" : <div></div>}</div>
                        <button type="button" id="send-button" onClick={()=>{
                            if(timer == 0){
                                sendData()
                                setclick(true)
                            }else{
                                return null
                            }
                        }}>{loading ? <div className="loading"></div> : timer == 0 ? "Send Login Link" : timer}</button>
                        <span className="or">OR</span>
                        <div className="register-button">
                            <a href="/register">Create New Account</a>
                        </div>
                    </form>
                    <div className="login-button">
                        <a href="/login"><button>Back to Login</button></a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ForgotPasswordPage