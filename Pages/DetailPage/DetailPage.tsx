import { useMutation, useQuery } from "@apollo/client";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Popup from "reactjs-popup";
import Comment from "../../components/comment/comment";
import { CHECK_LIKE, CHECK_SAVE, DELETE_SAVE, NEW_COMMENT, NEW_LIKE, NEW_SAVE } from "../../GraphQL/mutation";
import { DETAIL_DATA } from "../../GraphQL/queries";
import './DetailPage.scss'
export default function DetailPage(){
    const param = useParams()
    const detaildata = useQuery(DETAIL_DATA,{
        variables : {
            id: param.id
        }
    })
    console.log(param.id)
    console.log(detaildata.data)
    const [file, setfile] = useState({data:[]})
    const [file2, setfile2] = useState({data:[]})
    const [countcomment, setcountcomment] = useState(0)
    const [countlike, setcountlike] = useState(0)
    const [picture, setpicture] = useState("")
    const [username, setusername] = useState("")

    const [liked, setLike] = useState(false)
    const [save, setSave] = useState(false)
    const [limit, setlimit] = useState(5)
    const [editsave, savedata] = useMutation(NEW_SAVE)
    const [editdelsave, delsavedata] = useMutation(DELETE_SAVE)
    const [editsavedata, savedetaildata] = useMutation(CHECK_SAVE)
    const [editComment, commentData] = useMutation(NEW_COMMENT)
    const [editlike, likedata] = useMutation(NEW_LIKE)
    const [editchecklike, checklike] = useMutation(CHECK_LIKE)
    
    const [comment, setcomment] = useState("")
    const [postid, setpostid] = useState("")
    const [userid, setuserid] = useState("")

    
    useEffect(()=>{
        if(detaildata.data !== undefined && detaildata.data !== null){
            console.log(detaildata.data)
            setcountcomment(detaildata.data.getDetailData[0].Comment.length)
            setcountlike(detaildata.data.getDetailData[0].Like.length)
            setfile({data: detaildata.data.getDetailData[0].postDetail})
            setfile2({data: detaildata.data.getDetailData[0].Comment})
            setpicture(detaildata.data.getDetailData[0].User.Userdetail.picture)
            setusername(detaildata.data.getDetailData[0].User.username)
            
            setpostid(detaildata.data.getDetailData[0].id)
            setuserid(detaildata.data.getDetailData[0].User.id)
            // console.log(detaildata.data)
        }
    },[detaildata.data])
    
    useEffect(()=>{
        editsavedata({
            variables : {
                postid: param.id,
                userid: localStorage.getItem("userid")
            }
        })
        editchecklike({
            variables : {
                postid: param.id,
                userid: localStorage.getItem("userid")
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
                postid: param.id,
                userid: userid
            }
        })
    }
    function savePost(){
        setSave(!save)
        if(save == false){
            editsave({
                variables : {
                    postid: postid,
                    userid: userid
                }
            })
        }else if(save == true){
            editdelsave({
                variables : {
                    postid: postid,
                    userid: userid
                }
            })
        }
        
    }
    if(detaildata.loading){
        return(
            <div>loading</div>
        )
    }
    
    return (
        <div className="page-container">
            <div className="container">
                <div className="detail-container-1">
                    <div className="detail-container">
                        <div className="dc-1">
                            <img src={picture} alt="" />
                            {/* <iframe src={`/OtherProfile/${e.User.username}`} frameBorder="0" height="500px" width="300px"></iframe> */}
                            <div className="dc-1-name">
                                <a href={localStorage.getItem("username") == username ? "/profile" : `/OtherProfile/${username}`}>
                                    {username}
                                </a>
                            </div>
                        </div>
                        {
                            localStorage.getItem("username") == username ?
                            <div className="dc-2">
                                <button>...</button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <div className="detail-container-image">
                        {
                            file.data[0] !== undefined ?
                                file.data[0].type == "image" ? 
                                <img src={file.data[0].file} alt="" />
                                :
                                <video src={file.data[0].file}></video>
                            :
                            ""

                        }
                    </div>
                </div>
                <div className="detail-container-2">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
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
                                            navigator.clipboard.writeText(`http://localhost:1234/`)
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
                    <div className="detail-like">
                        <div className="people">
                            {millify(countlike)}
                        </div>
                        Like
                        and
                        <div className="people">
                            {millify(countcomment)}
                        </div>
                        Comment
                    </div>
                    <div className="detail-container-comment">
                        {
                            file2.data.map((j,idx) => {
                                
                                if(idx+1 <= limit){
                                    return(
                                        <Comment j={j}/>
                                    );
                                }
                            })
                        }
                        {
                            
                            file2.data.length > limit ?         
                            <button type="button" className="showmore-btn" onClick={()=>{setlimit(limit + 5)}}>Show more comment</button>
                            :
                            <div></div>
                            
                        }
                    </div>
                    <form action="" className="detail-container-add-comment">
                        <textarea name="addComment" id="addComment" placeholder="Add a Comment" value={comment} onChange={e => {
                            setcomment(e.target.value)
                        }}></textarea>
                        <button className="post-btn" type="button" onClick={()=>{
                            // console.log(e.id,comment,e.user_id)
                            editComment({
                                variables : {
                                    postid : param.id,
                                    comment : comment,
                                    userid : localStorage.getItem("userid"),
                                }
                            })
                            setcomment("")
                        }}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}