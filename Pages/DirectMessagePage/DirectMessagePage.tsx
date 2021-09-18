import Peer from "peerjs"
import React, { useState } from "react"
import Popup from "reactjs-popup"
import './DirectMessage.scss'

function DirectMessagePage(){
    const peer = new Peer()
    const [peerid, setpeerid] = useState("")
    const [listpeer, setlist] = useState([])
    // function setpeer(){
    window.addEventListener('load', (e)=>{
        console.log("click")
        peer.on('open', (id)=>{
            // setpeerid(id)
        console.log(id)
        
        // document.getElementById("getpeer").innerHTML = id
        })
        peer.on('call', (call)=>{
            navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream)=>{
                call.answer(stream)
                myvideo(stream)
                call.on('stream', (rm) => {
                    if(!listpeer.includes(call.peer)){
                        let x = document.createElement("video")
                        x.classList.add("videoshow1")
                        x.srcObject = stream
                        x.play()
                        document.getElementById("video-image").append(x)
                        listpeer.push(call.peer)
                    }
                })
                
            }).catch((err)=>{
                console.log(err)
            })
        })
    })
    function myvideo(stream){
        let x = document.createElement("video")
        x.classList.add("videoshow2")
        x.srcObject = stream
        x.play()
        document.getElementById("video-image2").append(x)
    }
    // }
    return(
        <div className="dm-page">
            <div id="video-image" style={{height: "200px", width: "200px", position: "absolute",left: "50%", top: "50%"}} ></div>
            <div id="video-image2" style={{height: "200px", width: "200px", position: "absolute",left: "50%", top: "30%"}} ></div>
            <div className="dm-main">
                <div className="main-content-1">
                    <div className="content-1-name">
                        <div className="name">
                            jose_gcarls
                        </div>
                        <div className="addMessage">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="message-btn" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="content-1-list-name">
                        <div className="container-list-name">
                            <div className="image">
                                <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                            </div>
                            <div className="list-name">
                                YuunaRei
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="main-content-2">
                    <div className="target-detail">
                        <div className="image">
                            <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                        </div>
                        <div className="target-name">
                            YunnaRei
                        </div>
                        <div className="button">
                            <Popup trigger={
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="call-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </button>
                            } position="bottom right">
                                <div className="peerid">
                                    Your peer id:
                                    <br />
                                    <div id="getpeer"></div>
                                </div>
                                <input type="text" name="" id="" className="input-peer" onChange={
                                    (e) => {
                                        setpeerid(e.target.value)
                                    }
                                }/>
                                
                                
                                    <button onClick={
                                        ()=>{
                                            navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream)=>{
                                                myvideo(stream)
                                                peer.call(peerid, stream).on('stream', ()=>{
                                                    if(!listpeer.includes(peer.call(peerid, stream).peer)){
                                                        let x = document.createElement("video")
                                                        x.classList.add("videoshow1")
                                                        x.srcObject = stream
                                                        x.play()
                                                        document.getElementById("video-image").append(x)
                                                        listpeer.push(peer.call(peerid, stream).peer)
                                                    }
                                                })
                                                
                                            }).catch((err)=>{
                                                console.log(err)
                                            })
                                        }
                                    }>call</button>
                                    
                            </Popup>
                            {/* <video src="" id="video"></video> */}
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="person-1">
                                <div className="person-1-detail">
                                    <div className="person-1-image">
                                        <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                                    </div>
                                    <div className="person-detail">
                                        <div className="person-name">
                                            YunnaRei
                                        </div>
                                        <div className="person-message">
                                            Hallooasdddddddddddddddddddddd
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="person-1">
                                <div className="person-1-detail">
                                    <div className="person-1-image">
                                        <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                                    </div>
                                    <div className="person-detail">
                                        <div className="person-name">
                                            YunnaRei
                                        </div>
                                        <div className="person-message">
                                            Hallooasdddddddddddddddddddddd
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="target-message">
                            <div className="person-2">
                                <div className="person-2-detail">
                                    <div className="person-2-image">
                                        <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                                    </div>
                                    <div className="person-detail">
                                        <div className="person-2-name">
                                            YunnaRei
                                        </div>
                                        <div className="person-2-message">
                                            Hallooasdasdsaddsasdsadsadsadsadsadasdsadsad
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="person-2">
                                <div className="person-2-detail">
                                    <div className="person-2-image">
                                        <img src="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34" alt="" />
                                    </div>
                                    <div className="person-detail">
                                        <div className="person-2-name">
                                            YunnaRei
                                        </div>
                                        <div className="person-2-message">
                                            Hallooasdasdasdasddsa
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="inputan-message">
                            <input type="text" className="input-text"/>
                            <button className="submit-button" type="button">submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirectMessagePage