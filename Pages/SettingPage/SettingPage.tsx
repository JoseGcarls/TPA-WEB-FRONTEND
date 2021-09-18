import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import { readFile } from '../../components/ReadFile/ReadFile'
import { UPDATE_USER } from '../../GraphQL/mutation'
import { GET_FULL_DATA } from '../../GraphQL/queries'
import './SettingPage.scss'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'
import {users} from '../../static/Assets/images'
function SettingPage(){
    const [updateUser, updatedata] = useMutation(UPDATE_USER)
    const fulldata = useQuery(GET_FULL_DATA,{
        variables : {
            token : localStorage.getItem("jwt")
        }
    })
    useEffect(()=>{
        if(fulldata.data !== undefined && fulldata.data !== null){
            setEmail(fulldata.data.getUserData[0].email)
            setFullname(fulldata.data.getUserData[0].fullname)
            setUsername(fulldata.data.getUserData[0].username)
            setDescription(fulldata.data.getUserDetailData[0].description)
            setImage(fulldata.data.getUserDetailData[0].picture)
            console.log(image == "")
        }
    },[fulldata.data])
    useEffect(() => {
        if (updatedata.data !== undefined && updatedata.data !== null) {
            history.push("/");
            // console.log(updatedata)
        }
        
    },[updatedata.data])
    const history = useHistory();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [useImage, setUseImage] = useState(false);
    const [image, setImage] = useState("")
    if(fulldata.loading){
        return(
            <div>loading</div>
        )
    }

    async function handleUpload(file: File){
        const filetype = file.type.split("/")[0]
        if(filetype !== "image"){
            return
        }
        setUseImage(true)
        const picture = await readFile(file)
        setImage(picture)   
    }
    async function handleSubmit(){
        console.log(fulldata.data)
        console.log("id" + fulldata.data.getUserData[0].id,"fullname" + fullname,"un" + username,"dc" + description,"em" + email)
        
        var url = image
        if(useImage == true){
            const ref = firebase.storage().ref(uuidv4())
            await ref.putString(image, "data_url")
            url = await ref.getDownloadURL() as string
        }
        if(useImage == true){
            updateUser({
                variables : {
                    id : fulldata.data.getUserData[0].id,
                    email : email,
                    fullname : fullname,
                    username : username,
                    description : description,
                    google : fulldata.data.getUserData[0].google,
                    image : url
                }
            })
        }else if(useImage == false){
            updateUser({
                variables : {
                    id : fulldata.data.getUserData[0].id,
                    email : email,
                    fullname : fullname,
                    username : username,
                    description : description,
                    google : fulldata.data.getUserData[0].google,
                    image : image
                }
            })
        }
        
    }
    
    return(
        <div>
            <div className="setting-page">
                <div className="main-setting">
                    <div className="main-1">
                        <div className="main-1-container-1">
                            <button>Edit Profile</button>
                            <button>Change Password</button>
                            <button>Apps and Websites</button>
                            <button>Email and SMS</button>
                            <button>Push Notifications</button>
                            <button>Manage Contacts</button>
                            <button>Privacy and Security</button>
                            <button>Login Activity</button>
                            <button>Emails from Instagram</button>
                        </div>
                        <div className="main-1-container-2">
                            <div className="title">
                                InSOgram
                            </div>
                        </div>
                    </div>
                    <div className="main-2">
                        <form action="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="left">
                                            {
                                                image == "" ? 
                                                <img src={users} alt="" />
                                                :
                                                <img src={image} alt="" />
                                            }
                                        </td>
                                        <td className="right for-btn">
                                            <div>
                                                {fulldata.loading ? "" : fulldata.data.getUserData[0].username}
                                            </div>
                                            <div>
                                                <button type="button">
                                                    <div className="change-pp-btn">
                                                            <label className="chooseFile" htmlFor="upload-picture">
                                                                <div className="choose-title">Upload Photo</div>
                                                                <input type="file" className="upload-picture" accept="image/*" id="upload-picture"  onChange={
                                                                    (e) => {
                                                                        handleUpload(e.currentTarget.files![0])
                                                                    }
                                                                }/>
                                                            </label>  
                                                    </div>
                                                </button>
                                                <div className="rm-pp-container">
                                                    <button className="rm-pp-btn" type="button" onClick={ (e) => {
                                                        setUseImage(false)
                                                        setImage("")
                                                    }}>
                                                        Remove Current Photo
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Fullname</td>
                                        <td className="right">
                                            <div><input type="text" name="fullname" id="fullname" defaultValue={fulldata.data?.getUserData[0].fullname} onChange={
                                                (e) => {
                                                    
                                                    setFullname(e.target.value)
                                                }
                                            }/></div>
                                            <div className="input-desc">
                                                Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Username</td>
                                        <td className="right">
                                            <div><input type="text" name="username" id="username" defaultValue={fulldata.data.getUserData[0].username} onChange={
                                                (e) => {
                                                    setUsername(e.target.value)
                                                }
                                            }/></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">
                                            Bio
                                        </td>
                                        <td className="right">
                                            <div>
                                                <textarea name="bio" id="bio" defaultValue={fulldata.data?.getUserDetailData[0].description} onChange={
                                                (e) => {
                                                    setDescription(e.target.value)
                                                }
                                            }></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left">Email</td>
                                        <td className="right">
                                            <div><input type="email" name="email" id="email" defaultValue={fulldata.data.getUserData[0].email} onChange={
                                                (e) => {
                                                    setEmail(e.target.value)
                                                    if(email == ""){
                                                        setEmail(fulldata.data.getUserData[0].email)
                                                    }
                                                }
                                            }/></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="left"></td>
                                        <td className="right">
                                            <button type="button" id="button-submit" onClick={handleSubmit}>Submit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default SettingPage