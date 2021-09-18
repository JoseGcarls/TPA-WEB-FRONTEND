import { useMutation } from "@apollo/client";
import millify from "millify";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { CHECK_LIKE_COMMENT, DELETE_COMMENT, NEW_LIKE_COMMENT, NEW_REPLY } from "../../GraphQL/mutation";
import ReplyComment from "../replycomment/ReplyComment";

export default function Comment({j}){
    const [editdelcmnt, deletecomment] = useMutation(DELETE_COMMENT)
    const [likecomment, setlikecomment] = useState(false)
    const [editlikecomment, likecommentdata] = useMutation(NEW_LIKE_COMMENT)
    const [editchecklikecomment, checklikecomment] = useMutation(CHECK_LIKE_COMMENT)
    const [editreply, replydata] = useMutation(NEW_REPLY)
    const [comment, setcomment] = useState("")
    const [limit, setlimit] = useState(0)
    const [many, setmany] = useState(0)
    useEffect(()=>{
        editchecklikecomment({
            variables : {
                commentid : j.id,
                userid : localStorage.getItem("userid")
            }
        })
    },[])
    useEffect(()=>{
        if(checklikecomment.data !== null && checklikecomment.data !== undefined){
            setlikecomment(true)
        }
    }, [checklikecomment.data])
    // console.log(checklikecomment.data)
    // console.log(j)
    useEffect(()=>{
        if(j !== undefined && j !== null){
            console.log(j)
            setmany(j.ReplyComment.length)
        }
    },[j])
    return(
        <div className="detail-comment">
            <div className="full-container-comment">
                <div className="container-comment">
                    <div className="people">
                        {j.User.username}
                    </div>
                    <div className="comment">
                        {j.comment}
                    </div>
                    {
                        many != 0 ? 
                        <div className="replies-count">
                            {millify(many)} replies
                        </div>
                        :
                        <div></div>
                    }
                </div>      
                <div className="detail-comment-button">
                    <Popup trigger={
                        <button type="button" className="reply-button">Reply</button>
                    } position="bottom right">
                        <div className="popup-comment">
                            <input type="text" onChange={e => setcomment(e.target.value)} placeholder="Comment"/>
                            <button type="button" onClick={
                                ()=>{
                                    editreply({
                                        variables : {
                                            commentid: j.id,
                                            comment: comment,
                                            userid: localStorage.getItem("userid")
                                        }
                                    })
                                }
                            }>Submit</button>
                        </div>
                    </Popup>
                    <div>{millify(j.LikeComment.length)}</div>
                    <button type="button" className="comment-button" onClick={
                        ()=>{
                            setlikecomment(!likecomment)
                            editlikecomment({
                                variables : {
                                    commentid: j.id,
                                    userid: localStorage.getItem("userid")
                                }
                            })
                        }
                    }>
                    {
                        likecomment == false ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="comment-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="comment-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    }
                    </button>
                    {
                    j.User.username == localStorage.getItem("username") ? 
                        <button type="button" className="comment-button" onClick={()=>{
                            editdelcmnt({
                                variables : {
                                    id: j.id
                                }
                            })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="comment-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    :
                    <div></div>
                    }
                </div>
            </div>
            {
                j?.ReplyComment?.map((k, idx)=>{
                    if(idx+1 <= limit){
                        return(
                            <ReplyComment j={k}/>
                        )
                    }
                    
                })
            }
            {
                    
                many > limit ?         
                <button type="button" className="showmore-btn" onClick={()=>{setlimit(limit + 3)}}>Show more comment</button>
                :
                    many == 0 ?
                    <div></div>
                    :
                    <button type="button" className="showmore-btn" onClick={()=>{setlimit(0)}}>Hide comment</button>
                    
            }
        </div> 
    );
}