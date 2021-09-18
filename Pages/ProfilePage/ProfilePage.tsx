import './ProfilePage.scss'
import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_FULL_DATA, GET_SAVE_DATA } from '../../GraphQL/queries';
import { users } from '../../static/Assets/images'
import { useRouteMatch } from 'react-router';
import{BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import millify from 'millify';
function ProfilePage(){
    const match = useRouteMatch()
    const [editdata,fulldata] = useLazyQuery(GET_FULL_DATA)
    const [editsave, save] = useLazyQuery(GET_SAVE_DATA)
    
    const [picture, setPicture] = useState("")
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [post, setPost] = useState(0)
    const [follower, setFollower] = useState(0)
    const [following, setFollowing] = useState(0)
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState({data : []})
    const [savedfiles, setsavedfiles] = useState({data : []})
    useEffect(()=>{
        editsave({
            variables : {
                userid : localStorage.getItem("userid")
            }
        })
        editdata({
            variables : {
                token : localStorage.getItem("jwt")
            }
        })
    },[])
    useEffect(()=>{
        if(save.data !== undefined && save.data !== null){
            console.log(save.data.getSaveData)
            setsavedfiles({data : save.data.getSaveData})
        }
    }, [save.data])
    useEffect(()=>{
        if(fulldata.data !== undefined && fulldata.data !== null){
            setPicture(fulldata.data.getUserDetailData[0].picture)
            setUsername(fulldata.data.getUserData[0].username)
            setFullname(fulldata.data.getUserData[0].fullname)
            setPost(fulldata.data.getUserDetailData[0].post)
            setFollower(fulldata.data.getUserDetailData[0].follower)
            setFollowing(fulldata.data.getUserDetailData[0].following)
            setDescription(fulldata.data.getUserDetailData[0].description)
            setFiles({data : fulldata.data.getPostData})
            
        }
    },[fulldata.data])
    if(fulldata.loading){
        return(
            <div>loading</div>
        )
    }
    
    return(
        <div>
            <div className="profile-page">
                <div className="profile-content-1">
                    <div className="profile-picture">
                        <img src={picture == "" ? users : picture} alt="" />
                    </div>
                    <div className="profile-detail">
                        <div className="detail-container-1">
                            <div className="detail-name">
                                {fulldata.loading ? "" : username}
                            </div>
                            <div className="detail-button">
                                <a href="/setting">
                                    <button>Edit Profile</button>

                                </a>
                            </div>
                        </div>
                        <div className="detail-fp">
                            <div className="posts">
                                <b>
                                    {
                                        millify(post)
                                    }
                                </b>
                                posts
                            </div>
                            <div className="followers">
                                <b>
                                    {
                                        millify(follower)
                                    }
                                </b>
                                followers
                            </div>
                            <div className="following">
                                <b>
                                    {
                                        millify(following)
                                    }
                                </b>
                                following
                            </div>
                        </div>
                        <div className="fullname">
                            {fullname}
                        </div>
                        <div className="description">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="profile-content-2">
                    <div className="description-2">
                        {description}
                    </div>
                    <div className="detail-fp-2">
                        <div className="posts">
                            <b>
                                {
                                    millify(post)
                                }
                            </b>
                            posts
                        </div>
                        <div className="followers">
                            <b>
                                {
                                    millify(follower)
                                }
                            </b>
                            followers
                        </div>
                        <div className="following">
                            <b>
                                {
                                    millify(following)
                                }
                            </b>
                            following
                        </div>
                    </div>
                <Switch>
                    <Route exact path={`${match.path}`}>
                        <div className="button-content-2">
                            <button className="current">
                                <svg aria-label="" className="icons current-icon" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path>
                                </svg>    
                                <a href="/profile">
                                    POSTS
                                </a>
                            </button>
                            <button>
                                <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
                                </svg>
                                <a href="/profile/save">
                                    SAVED
                                </a>
                            </button>
                            <button>
                            <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
                            </svg>
                                <a href="/profile/tag">
                                    TAGGED
                                </a>
                            </button>
                        </div>
                        <div className="image-content-2">
                            
                            {
                                files.data.map(e =>{
                                    // console.log(e.postDetail.length)
                                    // console.log(e)
                                    // console.log(e.postDetail)
                                    if(e.postDetail.length == 1){
                                        if(e?.postDetail[0].type == "image"){
                                            return(
                                                <a href={`/detail/${e.id}`}><img src={e.postDetail[0].file} alt="" /></a>
                                            );
                                        }else{
                                            return(
                                                <a href={`/detail/${e.id}`}><video src={e.postDetail[0].file}></video></a>
                                            );
                                        }
                                    }else{
                                        if(e.postDetail[0].type == "image"){
                                            return(
                                                <div className="multiple-file">
                                                    <a href={`/detail/${e.id}`}><img src={e.postDetail[0].file} alt="" /></a>
                                                    <div className="multiple-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-file" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            );
                                        }else{
                                            return(
                                                <div className="multiple-file">
                                                    <a href={`/detail/${e.id}`}><video src={e.postDetail[0].file}></video></a>
                                                    <div className="multiple-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-file" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })
                            }

                        </div>
                    </Route>
                    <Route exact path={`${match.path}/save`}>
                        <div className="button-content-2">
                            <button>
                                <svg aria-label="" className="icons current-icon" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path>
                                </svg>    
                                <a href="/profile">
                                    POSTS
                                </a>
                            </button>
                            <button className="current">
                                <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
                                </svg>
                                <a href="/profile/save">
                                    SAVED
                                </a>
                            </button>
                            <button>
                            <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
                            </svg>
                                <a href="/profile/tag">
                                    TAGGED
                                </a>
                            </button>
                        </div>
                        <div className="image-content-2">
                            
                            {
                                savedfiles.data.map(e =>{
                                    // console.log(e.postDetail.length)
                                    console.log(e.Post.postDetail)
                                    if(e.Post.postDetail.length == 1){
                                        if(e.Post.postDetail[0].type == "image"){
                                            return(
                                                <a href={`/detail/${e.Post.id}`}><img src={e.Post.postDetail[0].file} alt="" /></a>
                                            );
                                        }else{
                                            return(
                                                <a href={`/detail/${e.Post.id}`}><video src={e.Post.postDetail[0].file}></video></a>
                                            );
                                        }
                                    }else{
                                        if(e.Post.postDetail[0].type == "image"){
                                            return(
                                                <div className="multiple-file">
                                                    <a href={`/detail/${e.Post.id}`}><img src={e.Post.postDetail[0].file} alt="" /></a>
                                                    <div className="multiple-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-file" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            );
                                        }else{
                                            return(
                                                <div className="multiple-file">
                                                    <a href={`/detail/${e.Post.id}`}><video src={e.Post.postDetail[0].file}></video></a>
                                                    <div className="multiple-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-file" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })
                            }

                        </div>
                    </Route>
                    <Route exact path={`${match.path}/tag`}>
                        <div className="button-content-2">
                            <button>
                                <svg aria-label="" className="icons current-icon" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path>
                                </svg>    
                                <a href="/profile">
                                    POSTS
                                </a>
                            </button>
                            <button>
                                <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                    <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
                                </svg>
                                <a href="/profile/save">
                                    SAVED
                                </a>
                            </button>
                            <button  className="current">
                            <svg aria-label="" className="icons" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
                            </svg>
                                <a href="/profile/tag">
                                    TAGGED
                                </a>
                            </button>
                        </div>
                    </Route>
                </Switch>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilePage