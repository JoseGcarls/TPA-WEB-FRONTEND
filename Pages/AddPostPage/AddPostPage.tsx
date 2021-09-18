import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { v4 as uuidv4 } from "uuid";
import { firebaseContext } from "../../App";
import Footer from "../../components/footer/Footer";
import { readFile, readFiles } from "../../components/ReadFile/ReadFile";
import { ADD_POST } from "../../GraphQL/mutation";
import './AddPostPage.scss'
export default function AddPostPage(){
    const [upload, setUpload] = useState({data: []})
    const [uploadProgress, setUploadProgress] = useState(0)
    const [ftype, setftype] = useState("")
    const [content, setContent] = useState({})
    const [caption, setcaption] = useState("")
    const [image, setImage] = useState("")
    const [data, fulldata] = useMutation(ADD_POST)
    const history = useHistory()
    const [valid, setvalid] = useState("")
    const firebase = useContext(firebaseContext)
    const [share, setshare] = useState(false)
    const [submitbtn, setsubmitbtn] = useState(false)
    const [id, setid] = useState("")
    async function handleUpload(file: FileList){
        setUploadProgress(0)
        const filetypes = Array.from(file).map(e =>
            e.type.split("/")[0]
        )
        console.log(filetypes)
        if(filetypes.some(type => type !== "image" && type !== "video")){
            return
        }

        const post = await readFiles(file)
        setUploadProgress(33)
        const refs = post.map(() => 
            firebase.storage().ref(uuidv4())
        )
        const uploadPromise = post.map((fd, index) => refs[index].putString(fd, "data_url"))
        await Promise.all(uploadPromise)
        setUploadProgress(66)
        const urlPromises = refs.map(e => e.getDownloadURL())
        const urls = (await Promise.all(urlPromises) as string[])
        setUploadProgress(100)
        
        setUpload({
            data: urls.map((path, index) => {
            return {
                id: uuidv4(),
                previewType: filetypes[index],
                preview: path,
            }
            })
        })
        
    }
    useEffect(()=>{

        if(upload !== undefined || upload !== null){
            console.log(upload)
        }
    },[upload])
    useEffect(()=>{
        if(fulldata.data !== undefined && fulldata !== null){
            console.log(fulldata.data)
            setid(fulldata.data)
        }
    }, [fulldata.data])
    async function handleSubmit(){
        if(uploadProgress < 100){
            alert("Upload has not finished yet")
            setvalid("Upload has not finished yet")
            return
        }
        if(caption === ""){
            alert("Caption must not be empty")
            setvalid("Caption must not be empty")
            return
        }
        const input = {
            token: localStorage.getItem("jwt"),
            caption: caption,
            postContent: upload.data.map(data => {
                return {
                    file: data.preview,
                    type: data.previewType
                }
            })
        }
        data({
            variables: {
                token: localStorage.getItem("jwt"),
                input: input
            }
        })
        setsubmitbtn(true)
        if(uploadProgress == 100){
            alert("Successfully upload file")
        }

    }

    const [idx, setIdx] = useState(0)
    function slider(num){

        var lengthdata = upload.data.length
        var index = idx + num
        var newIdx = ((index % lengthdata) + lengthdata) % lengthdata
        if(newIdx < 0) {
            newIdx = lengthdata - 1

        }
        setIdx(newIdx)
    }
    useEffect(() => {
        if(fulldata.data !== undefined && fulldata.data !== ""){
            setUploadProgress(0)
            setcaption("")
        }
    }, [data])
    useEffect(()=>{
        if(share == true && submitbtn == true){
            window.open(`http://www.twitter.com/share?url=${location.host}/detail/${id}`, "_blank");
            history.push("/")
        }else if(share == false && submitbtn == true){
            history.push("/")

        }
    },[id,share])
    return (
        <div>
            <div className="addPost">
                <form className="add-form" encType="multipart/form-data">
                    <div className="container-1">
                        <label htmlFor="add-file" className="file-label" >
                            <div className="area-click" onDragOver={e => e.preventDefault()} onDrop={e => { handleUpload(e.dataTransfer.files); e.preventDefault()}}></div>
                            {
                                uploadProgress == 0 ?
                                <div>
                                    <div className="file-upload">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="image-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        
                                    </div>
                                    <div className="title">
                                        Post File
                                    </div>
                                </div>
                                :
                                <div className="result">
                                    <button type="button" className="left-btn" onClick={() => {slider(-1)}}>&lt;</button>
                                    <div className="slider">
                                        {
                                            uploadProgress < 100 ? 
                                            <div className="loading-status">
                                                <div className="loading"></div>
                                                <div className="number">{uploadProgress}%</div>
                                            </div>
                                            :
                                            upload.data.map((value, index) => (
                                                value.previewType === "image" 
                                                ?
                                                <img src={value.preview} alt="" className={"file-data " + (index == idx ? "current" : "non")}/>
                                                :
                                                <video src={value.preview} className={"file-data " + (index == idx ? "current" : "non")}></video>

                                            ))
                                        }
                                    </div>
                                    <button type="button" className="right-btn" onClick={() => {slider(1)}}>&gt;</button>
                                </div>
                            }
                        </label>
                    </div>
                        <input type="file" accept="image/*,video/*" multiple={true} style={{display: "none"}} aria-label="add-file" id="add-file" className="add-file1" onChange={e => handleUpload(e.currentTarget.files!)} />
                    <div className="container-2">
                        <button type="button" className="post-button">
                            <label htmlFor="add-file" className="btn-upload">
                                <div className="btn-upload">
                                    Upload File
                                </div>
                            </label>
                        </button>
                        <textarea className="input-caption" id="" placeholder="Caption here..." onChange={
                            (e) => {
                                setcaption(e.target.value)
                            }
                        }></textarea>
                        {
                            valid != "" ?
                            <div className="error-message" style={{"color": "rgb(243, 92, 92)","display": "flex","justify-content" : "center","font-weight": "600"}}>{valid}</div>
                            :
                            <div></div>
                        }
                        <div>
                            <input type="checkbox" name="" id="" onChange={()=>setshare(!share)}/>
                            Share to social media
                        </div>
                        <button type="button" className="post-button" onClick={handleSubmit}>Post</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );    
}