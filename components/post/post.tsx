import { useMutation } from "@apollo/client";
import millify from "millify";
import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { CHECK_LIKE, CHECK_SAVE, DELETE_POST, DELETE_SAVE, NEW_LIKE, NEW_SAVE } from "../../GraphQL/mutation";
import Comment from "../comment/comment";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
export default function Post({e,comment, setcomment,editComment, userid}){
    const [liked, setLike] = useState(false)
    const [save, setSave] = useState(false)
    const [limit, setlimit] = useState(5)
    const [editsave, savedata] = useMutation(NEW_SAVE)
    const [editdelsave, delsavedata] = useMutation(DELETE_SAVE)
    const [editsavedata, savedetaildata] = useMutation(CHECK_SAVE)
    
    const [editlike, likedata] = useMutation(NEW_LIKE)
    const [editchecklike, checklike] = useMutation(CHECK_LIKE)
    const [editdelpost, delpost] = useMutation(DELETE_POST)
    
    const videoPlayer = useRef<HTMLVideoElement>(null)
    const [play, setplay] = useState(false)


    useEffect(()=>{
        editsavedata({
            variables : {
                postid: e.id,
                userid: userid
            }
        })
        editchecklike({
            variables : {
                postid: e.id,
                userid: userid
            }
        })
        
    }, [])
    useEffect(()=>{
        if(savedetaildata.data !== null && savedetaildata.data !== undefined){
            if(savedetaildata.data.checkSave == true){
                setSave(true)
            }
            console.log(savedetaildata.data)
        }
    },[savedetaildata.data])
    useEffect(()=>{
        if(checklike.data !== null && checklike.data !== undefined){
            setLike(true)
        }
    },[checklike.data])

    function likepost(){
        setLike(!liked)
        editlike({
            variables : {
                postid: e.id,
                userid: userid
            }
        })
    }
    function savePost(){
        setSave(!save)
        if(save == false){
            editsave({
                variables : {
                    postid: e.id,
                    userid: userid
                }
            })
        }else if(save == true){
            editdelsave({
                variables : {
                    postid: e.id,
                    userid: userid
                }
            })
        }
        
    }
    function startvidplay(){
        if(videoPlayer.current!.paused){
            videoPlayer.current!.play()
            setplay(true)
        }else{
            videoPlayer.current!.pause()
            setplay(false)
        }
    }
    const [idx, setIdx] = useState(0)
    function slider(num){

        var lengthdata = e.postDetail.length
        var index = idx + num
        var newIdx = ((index % lengthdata) + lengthdata) % lengthdata
        if(newIdx < 0) {
            newIdx = lengthdata - 1
        }
        setIdx(newIdx)
    }
    return(
        <div className="container">
            <div className="modal-confirm" id="modal">
                <div className="confirmation-delete">
                    <div className="confirm-text">Are you sure want to delete?</div>
                    <button className="confirm-delete" onClick={()=>{
                        editdelpost({
                            variables: {
                                id: e.id
                            }
                        })
                    }}>Delete</button>
                    <button className="cancel-delete" onClick={()=>{
                        document.getElementById("modal").classList.remove("show")
                    }}>Cancel</button>
                </div>
            </div>
            <div className="detail-container">
                <div className="dc-1">
                    <img src={e.User.Userdetail.picture} alt="" />
                    <iframe src={`/OtherProfile/${e.User.username}`} frameBorder="0" height="500px" width="300px"></iframe>
                    <div className="dc-1-name">
                        <a href={localStorage.getItem("username") == e.User.username ? "/profile" : `/OtherProfile/${e.User.username}`}>
                            {e.User.username}
                        </a>
                    </div>
                </div>
                {
                    localStorage.getItem("username") == e.User.username ?
                    <div className="dc-2">
                        <Popup trigger={
                            <button>...</button>
                        } position="bottom right">
                            <div className="post-edit-button">
                                <button className="edit-button">Edit Post</button>
                                <button className="delete-button" onClick={
                                    () => {
                                        document.getElementById("modal").classList.toggle("show")
                                    }
                                }>Delete Post</button>
                            </div>
                        </Popup>
                    </div>
                    :
                    <div></div>
                }
            </div>
            <div className="detail-container-image">
                {
                    
                    e.postDetail.length == 1 ?
                        e.postDetail[0].type == "image" ? 
                            <img src={e.postDetail[0].file} alt="" />
                        :
                            <div className="video">
                                <video src={e.postDetail[0].file} ref={videoPlayer}></video>
                                <button type="button" onClick={startvidplay}>
                                    {
                                        play ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    }
                                    
                                </button>
                            </div>
                    :
                    <div className="slider">
                        <button type="button" className="left-btn" onClick={() => {slider(-1)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="slider-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                            {
                            e.postDetail.map((x, index)=>{
                            console.log(x)
                            return(
                                x.type == "image" ?
                                    <img src={x.file} alt="" className={index == idx ? "current" : "non"}/>
                                        
                                :  
                                    
                                    <div className="video">
                                        <video src={x.file} ref={videoPlayer} className={index == idx ? "current" : "non"}></video>
                                        <button type="button" onClick={startvidplay} className={index == idx ? "current" : "non"}>
                                            {
                                                play ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            
                                        </button>
                                    </div>
                                )
                            })  
                            }
                        <button type="button" className="right-btn" onClick={() => {slider(1)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="slider-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>  
                }
            </div>
            <div className="detail-container-icon">
                <div className="button-icon-1">
                    <button onClick={likepost}>
                        {
                            liked == false ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        }
                        
                    </button>
                    <button>
                        <a href={`/detail/${e.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>

                        </a>
                    </button>
                    <div>

                    </div>
                    <Popup trigger={
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons plane" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    } position="right center">
                        <div className="popup-share">
                            <button onClick={
                                ()=>{
                                    navigator.clipboard.writeText(`http://localhost:1234/detail/${e.id}`)
                                }
                            }>
                                <svg xmlns="http://www.w3.org/2000/svg" className="popup-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </button>
                            <button>
                                <img src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-icon-file-facebook-icon-svg-wikimedia-commons-4.png" alt="" height="25px"/>
                            </button>
                            <button>
                                <a href="/direct">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="popup-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                    </svg>

                                </a>
                            </button>
                        </div>
                    </Popup>
                </div>
                <div className="button-icon-2">
                    <button onClick={savePost}>
                        {
                            save == false ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        }
                    </button>
                </div>
            </div>
            <div className="detail-caption">
                <span className="people">
                    {e.User.username}
                </span>
                <span className="caption">
                    <ShowMoreText lines={1} more="Show more" less="Show less" className="caption-button" anchorClass="my-anchor-css-class" expanded={false} width={300} truncatedEndingComponent={"..."}>
                        {e.caption}
                    </ShowMoreText>
                </span>
            </div>
            <div className="detail-like">
                <div className="people">
                    {console.log(e)}
                    {millify(e.Like.length * 1000)}
                </div>
                Like
                and
                <div className="people">
                    {millify(e.Comment.length *  10000)}
                </div>
                Comment
            </div>
            <div className="detail-container-comment">
                {
                    e.Comment.map((j,idx) => {
                        
                        if(idx+1 <= limit){
                            return(
                                <Comment j={j}/>
                            );
                        }
                    })
                }
                {
                    
                    e.Comment.length > limit ?         
                    <button type="button" className="showmore-btn" onClick={()=>{setlimit(limit + 5)}}>Show more comment</button>
                    :
                    <div></div>
                    
                }
                <div className="post-time">{moment(e.created_at).fromNow()}</div>
            </div>
            <form action="" className="detail-container-add-comment">
                <textarea name="addComment" id="addComment" placeholder="Add a Comment" value={comment} onChange={e => {
                    setcomment(e.target.value)
                }}></textarea>
                <button className="post-btn" type="button" onClick={()=>{
                    console.log(e.id,comment,e.user_id)
                    editComment({
                        variables : {
                            postid : e.id,
                            comment : comment,
                            userid : userid,
                        }
                    })
                    setcomment("")
                }}>Post</button>
            </form>
        </div>
           
    );
}