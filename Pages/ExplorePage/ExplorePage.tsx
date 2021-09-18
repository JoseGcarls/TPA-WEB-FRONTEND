import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import ExplorePost from "../../components/explorepost/explorepost";
import { EXPLORE_PAGGED } from "../../GraphQL/mutation";
import './ExplorePage.scss'
export default function ExplorePage(){
    const [file, setfile] = useState({data:[]})
    const [nextpost, setnextpost] = useState("")
    const fileRef = useRef<HTMLDivElement>(null)
    const nextpostref = useRef<HTMLDivElement>(null)
    const [pageloading, setloading] = useState(false)
    const [observer, setObserver] = useState<IntersectionObserver>()
    const nextpostrefkey = useRef(nextpost)
    const apollo = useApolloClient()
    const [hasnext, sethasnext] = useState(true)
    const [editpage, pagedata] = useMutation(EXPLORE_PAGGED)

    async function loadItem(){
        const postPagged = await apollo.mutate({
            mutation: EXPLORE_PAGGED,
            variables:{
                nextpost: nextpostrefkey.current! === "" ? null : nextpostrefkey.current!
            }
        })
        file.data.push(...postPagged.data!.postExplorepagged.Post)
        setfile({data: file.data})
        setnextpost(postPagged.data.postExplorepagged.post_id)
        sethasnext(postPagged.data.postExplorepagged.has_next)
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
    },[])
    useEffect(()=>{
        if(observer === undefined || pageloading || nextpost == null || hasnext == false){
            return
        }
        observer!.observe(nextpostref.current)
    }, [observer,pageloading, nextpost, hasnext])

    // const [editData, fulldata] = useMutation(GET_HOME_DATA)
    // const [files, setFiles] = useState({data : []})
    // useEffect(()=>{
    //     editData({
    //         variables : {
    //             token : localStorage.getItem("jwt")
    //         }
    //     })
    // },[])

    // useEffect(()=>{
    //     if(fulldata.data !== null && fulldata.data !== undefined){
    //         setFiles({data : fulldata.data.getFullDataHomePage})
    //     }
    // },[fulldata.data])
    return(
        <div>
            <div className="explore-page">
                <div className="explore-main" ref={fileRef}>
                    {
                        file.data.map(e => {
                            
                            return (
                                // <button>
                                //     <div className="image-container">
                                //         {
                                //             e.postDetail[0].type == "image" ? 
                                //             <img src={e.postDetail[0].file} alt="" />
                                //             :
                                //             <video src={e.postDetail[0].file}></video>
                                //         }
                                //     </div>
                                // </button>
                                <ExplorePost e={e}/>
                            );
                        })

                    }
                    
                    {/* <div className="loading"></div> */}
                    {
                        pageloading ?
                        <div className="loading"></div>
                        :
                        <div ref={nextpostref}></div>
                    }
                </div>
            </div>
        </div>
    );
}