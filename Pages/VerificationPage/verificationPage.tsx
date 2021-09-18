import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { JWTContext } from "../../App";
import Footer from "../../components/footer/Footer";
import { SEND_TOKEN, VERIFY_USER } from "../../GraphQL/mutation";
import './verificationPage.scss'
function VerificationPage(){
    const [token, setToken] = useState("");
    const [timer, setTimer] = useState(0)
    const [verifyUser, userdata] = useMutation(VERIFY_USER);
    const [sendToken, _] = useMutation(SEND_TOKEN)
    const param = useParams();
    const [__ , setJWT] = useContext(JWTContext);
    const history = useHistory();
    
    const verif = () => {
        verifyUser({
            variables : {
                token : token,
                email : param.email
            }
        })
        // console.log(userdata.error.message)
        console.log(userdata.data)
        
    }
    const resend = () => {
        sendToken({
            variables : {
                email : param.email
            }
        });
        setTimer(60);
    }
    
    useEffect(()=>{
        if (timer != 0){
            setTimeout(() => {
                setTimer(timer - 1)
                
            }, 1000);
            document.getElementById("resend-button").style.backgroundColor = "rgb(153, 152, 152)";     
        }else if(timer == 0){
            document.getElementById("resend-button").style.backgroundColor = "#0073ff";
        }
    })
    useEffect(()=>{
        if(userdata.data != undefined &&  userdata.data !== null){
            setJWT(userdata.data.verifyUser)
            history.push("/");
        }
    }, [userdata.data])

    return(
        <div>
            <div className="verification-page">
                <div className="verif-content">
                    <form className="verif-form">
                        <div className="title">
                            Enter Confirmation Code
                        </div>
                        <div className="sub-title">
                            Enter the Confirmation code we sent to {param.email}
                        </div>
                        <input type="text" name="verify" id="verify" placeholder="Confirmation Code" onChange={
                            (e) => {
                                setToken(e.target.value)
                            }
                        }/>
                        <div>
                        {
                        userdata.error != null ? 
                        <div className="error">
                            {userdata.error.message}
                        </div> 
                        : 
                        <div></div>
                        }
                        </div>
                        <button type="button" onClick={timer == 0 ? resend : null} id="resend-button">{timer == 0 ? "Resend Code" : timer}</button>
                        <button type="button" onClick={verif}>Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>      
        </div>
    );
}

export default VerificationPage