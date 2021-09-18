import './OtherProfilePage.scss'
import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import { useMutation, useQuery } from '@apollo/client';
import { GET_OTHER_ALL_DATA, GET_OTHER_DATA } from '../../GraphQL/mutation';
import { users } from '../../static/Assets/images'
import { useParams, useRouteMatch } from 'react-router';
import{BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import millify from 'millify';
function OtherProfilePage(){
    const match = useRouteMatch()
    const param = useParams();
    const [editData, fulldata] = useMutation(GET_OTHER_DATA)
    const [editalldata, alldata] = useMutation(GET_OTHER_ALL_DATA)
    const [picture, setPicture] = useState("")
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [post, setPost] = useState(0)
    const [follower, setFollower] = useState(0)
    const [following, setFollowing] = useState(0)
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState({data : []})
    const [follow, setfollow] = useState(false) 
    useEffect(()=>{
        editData({
            variables: {
                username : param.username
            }
        })
        
    },[])
    useEffect(()=>{
        if(fulldata.data !== null && fulldata.data !== undefined){
            // console.log(fulldata.data.getOtherData[0].email)
            editalldata({
                variables:{
                    email : fulldata.data.getOtherData[0].email,
                    id : fulldata.data.getOtherData[0].id
                }
            })
        }
    },[fulldata.data])
    
    useEffect(()=>{
        if(alldata.data !== null && alldata.data !== undefined){
            console.log(alldata.data)
            setPicture(alldata.data.getOtherDetailData[0].picture)
            setUsername(param.username)
            setFullname(fulldata.data.getOtherData[0].fullname)
            setPost(alldata.data.getOtherDetailData[0].post)
            setFollower(alldata.data.getOtherDetailData[0].follower)
            setFollowing(alldata.data.getOtherDetailData[0].following)
            setDescription(alldata.data.getOtherDetailData[0].description)
            setFiles({data : alldata.data.getOtherPostData})
            // console.log(filetype)
        }
    },[alldata.data])
    var followclick = () => {
        setfollow(!follow)
    }
    if(fulldata.loading){
        return(
            <div>loading</div>
        )
    }
    return(
        <div>
            <div className="other-profile-page">
                <div className="other-profile-content-1">
                    <div className="profile-picture">
                        <img src={picture == "" ? users : picture} alt="" />
                    </div>
                    <div className="profile-detail">
                        <div className="detail-container-1">
                            <div className="detail-name">
                                {username}
                            </div>
                            <div className="detail-button">
                                {
                                    username == localStorage.getItem("username") ?
                                    <a href="/setting">
                                        <button>Edit Profile</button>
                                    </a>
                                    :
                                    <button onClick={followclick}>
                                        {
                                        follow == false?
                                        "Follow"
                                        :
                                        "Following"
                                        }
                                    </button>
                                }
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

                    <div className="button-content-2">
                        <button className="current">
                            <svg aria-label="" className="icons current-icon" fill="#8e8e8e" height="14" role="img" viewBox="0 0 48 48" width="14">
                                <path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path>
                            </svg>    
                            <a href="/profile">
                                POSTS
                            </a>
                        </button>
                    </div>
                    <div className="image-content-2">
                        
                        {
                            files.data.map(e =>{
                                console.log(e.postDetail.length)
                                
                                if(e.postDetail.length == 1){
                                    if(e.postDetail[0].type == "image"){
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
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default OtherProfilePage