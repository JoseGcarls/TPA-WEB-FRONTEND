import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { JWTContext } from "../../App";
import Footer from "../../components/footer/Footer";
import { CHANGE_PASSWORD } from "../../GraphQL/mutation";
import './ChangePasswordPage.scss'
export default function ChangePassword(){
    const [changePW, {loading, error, data}] = useMutation(CHANGE_PASSWORD);
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const param = useParams();
    const [__ , setJWT] = useContext(JWTContext);
    const history = useHistory();
    
    const submitData = () => {
        changePW({
            variables : {
                token : param.token,
                password : pass,
                confirmPassword : cpass,
            }
        })
        // console.log(userdata.error.message)
        
    }
    useEffect(()=>{
        if(data !== null && data !== undefined){
            console.log(data.changePassword)
            setJWT(data.changePassword)
            history.push("/")
        }
        
    },[data])

    return (
        <div>
            <div className="cpas-page">
                <div className="cpas-content">
                    <form className="cpas-form">
                        <div className="title">
                            Change Password
                        </div>
                        
                        <input type="password" name="password" id="password" placeholder="Password" onChange={
                            (e) => {
                                setPass(e.target.value)
                            }
                        }/>
                        <input type="password" name="cpass" id="cpass" placeholder="Confirm Password" onChange={e =>{
                            setCpass(e.target.value)
                        }} />
                        <div>  
                        {
                        error != null ? 
                        <div className="error">
                            {error.message}
                        </div> 
                        : 
                        <div></div>
                        }
                        </div>
                        <button type="button" onClick={submitData}>Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>      
        </div>
    );
}