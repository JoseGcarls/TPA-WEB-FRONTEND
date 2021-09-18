import { useApolloClient, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react"
import Footer from "../../components/footer/Footer"
import Post from "../../components/post/post";
import { GET_HOME_DATA, HOME_PAGGED, NEW_COMMENT } from "../../GraphQL/mutation";
import { GET_FULL_DATA } from "../../GraphQL/queries";
import './homepage.scss'
function Homepage(){
    const [file, setfile] = useState({data:[]})
    const [nextpost, setnextpost] = useState("")
    const fileRef = useRef<HTMLDivElement>(null)
    const nextpostref = useRef<HTMLDivElement>(null)
    const [pageloading, setloading] = useState(false)
    const [observer, setObserver] = useState<IntersectionObserver>()
    const nextpostrefkey = useRef(nextpost)
    const apollo = useApolloClient()
    const [hasnext, sethasnext] = useState(true)
    const [editpage, pagedata] = useMutation(HOME_PAGGED)

    const [editData, fulldata] = useMutation(GET_HOME_DATA)
    const [edituserdata, userdata] = useLazyQuery(GET_FULL_DATA)
    const [editComment, commentData] = useMutation(NEW_COMMENT)
    const [files, setFiles] = useState({data : []})
    
    const [username, setusername] = useState("")
    const [userfullname, setuserfullname] = useState("")
    const [userpicture, setuserpicture] = useState("")
    const [comment, setcomment] = useState("")
    const [userid, setuserid] = useState("")

    async function loadItem(){
        const postPagged = await apollo.mutate({
            mutation: HOME_PAGGED,
            variables:{
                nextpost: nextpostrefkey.current! === "" ? null : nextpostrefkey.current!
            }
        })
        file.data.push(...postPagged.data!.postHomepagged.Post)
        setfile({data: file.data})
        setnextpost(postPagged.data.postHomepagged.post_id)
        sethasnext(postPagged.data.postHomepagged.has_next)
        setloading(false)
    }
    useEffect(()=>{
        nextpostrefkey.current = nextpost
        
    }, [nextpost])
    useEffect(()=>{
        setObserver(new IntersectionObserver(
            (entry, observer) =>{
                
                if(!entry[0].isIntersecting){
                    return
                }
                observer.unobserve(nextpostref.current!)
                setloading(true)
                loadItem()
            },
        ))
        editData({
            variables : {
                token : localStorage.getItem("jwt")
            }
        })
        edituserdata({
            variables : {
                token : localStorage.getItem("jwt")
            }
        })
        
    },[])
    useEffect(()=>{
        if(observer === undefined || pageloading || nextpost == null || hasnext == false){
            return
        }
        observer!.observe(nextpostref.current)
    }, [observer,pageloading, nextpost, hasnext])

    useEffect(()=>{
        if(fulldata.data !== null && fulldata.data !== undefined){
            setFiles({data : fulldata.data.getFullDataHomePage})
            // console.log(fulldata.data)
        }
    },[fulldata.data])
    useEffect(()=>{
        if(userdata.data !== null && fulldata.data !== undefined){
            setusername(userdata.data.getUserData[0].username)
            setuserfullname(userdata.data.getUserData[0].fullname)
            setuserpicture(userdata.data.getUserDetailData[0].picture)
            console.log(userdata.data)
            localStorage.setItem("username", userdata.data.getUserData[0].username)
            setuserid(userdata.data.getUserData[0].id)
            localStorage.setItem("userid",userdata.data.getUserData[0].id)
        }
    },[userdata.data])

    
    return(
        <div className="homepage">
            <div className="content-1">
                <div className="story-bar">
                    <div>
                        <img src="https://i.ytimg.com/vi/33NRJaH2fFg/maxresdefault.jpg" alt="" />
                        <div className="name">Emily Sie</div>
                    </div>
                    
                </div>
                <div className="detail-content-1" ref={fileRef}>
                {
                    file.data.map(e => {
                        {
                            console.log(e)
                        }
                        return(
                        //     <div className="container">
                        //         <div className="detail-container">
                        //             <div className="dc-1">
                        //                 <img src={e.User.Userdetail.picture} alt="" />
                        //                 <iframe src={`/OtherProfile/${e.User.username}`} frameBorder="0" height="500px" width="300px"></iframe>
                        //                 <div className="dc-1-name">
                        //                     <a href={localStorage.getItem("username") == e.User.username ? "/profile" : `/OtherProfile/${e.User.username}`}>
                        //                         {e.User.username}
                        //                     </a>
                        //                 </div>
                        //             </div>
                        //             <div className="dc-2">
                        //                 <button>...</button>
                        //             </div>
                        //         </div>
                        //         <div className="detail-container-image">
                        //             {
                        //                 e.postDetail[0].type == "image" ? 
                        //                 <img src={e.postDetail[0].file} alt="" />
                        //                 :
                        //                 <video src={e.postDetail[0].file}></video>
                        //             }
                        //         </div>
                        //         <div className="detail-container-icon">
                        //             <div className="button-icon-1">
                        //                 <button onClick={likepost}>
                        //                     {
                        //                         liked == false ? 
                        //                         <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        //                         </svg>
                        //                         :
                        //                         <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 20 20" fill="currentColor">
                        //                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        //                         </svg>
                        //                     }
                                            
                        //                 </button>
                        //                 <button>
                        //                     <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        //                     </svg>
                        //                 </button>
                        //                 <button>
                        //                     <svg xmlns="http://www.w3.org/2000/svg" className="icons plane" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        //                     </svg>
                        //                 </button>
                        //             </div>
                        //             <div className="button-icon-2">
                        //                 <button onClick={savePost}>
                        //                     {
                        //                         save == false ?
                        //                         <svg xmlns="http://www.w3.org/2000/svg" className="icons" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        //                         </svg>
                        //                         :
                        //                         <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 20 20" fill="currentColor">
                        //                             <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        //                         </svg>
                        //                     }
                        //                 </button>
                        //             </div>
                        //         </div>
                        //         <div className="detail-like">
                        //             Liked By 
                        //             <div className="people">
                        //                 Jose_Gcarls
                        //             </div>
                        //             and
                        //             <div className="people">
                        //                 1k others
                        //             </div>
                        //         </div>
                        //         <div className="detail-container-comment">
                        //             {
                        //                 e.Comment.map((j) =>{
                        //                     return(
                        //                     <div className="detail-comment">
                        //                         <div className="people">
                        //                             {j.User.username}
                        //                         </div>
                        //                         <div className="comment">
                        //                             {j.comment}
                        //                         </div>
                        //                     </div> 
                        //                     );
                        //                 })
                        //             }
                        //         </div>
                        //         <form action="" className="detail-container-add-comment">
                        //             <textarea name="addComment" id="addComment" placeholder="Add a Comment" value={comment} onChange={e => {
                        //                 setcomment(e.target.value)
                        //             }}></textarea>
                        //             <button className="post-btn" type="button" onClick={()=>{
                        //                 console.log(e.id,comment,e.user_id)
                        //                 editComment({
                        //                     variables : {
                        //                         postid : e.id,
                        //                         comment : comment,
                        //                         userid : userid,
                        //                     }
                        //                 })
                        //                 setcomment("")
                        //             }}>Post</button>
                        //         </form>
                        //     </div>
                            <Post e={e} comment={comment} setcomment={setcomment} editComment={editComment} userid={userid}/>
                            )
                        })     
                }
                {
                    pageloading ?
                    <div className="loading"></div>
                    :
                    <div ref={nextpostref}></div>
                }
                </div>
            </div>
            <div className="content-2">
                <div className="detail">
                    <div className="detail-container">
                        <a href="/story">
                        {
                        
                            userpicture == "" ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="sub-icon users" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            :
                            <img src={userpicture} alt="" className="user-image users"/>
                        }
                        </a>
                        <div className="detail-self">
                            <div className="name">
                                {username}
                            </div>
                            <div className="description">
                                {userfullname}
                            </div>
                        </div>
                        <button className="switch-btn">Switch</button>
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </div>
    );

}
export default Homepage
