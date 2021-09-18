import React, { useEffect, useRef, useState } from "react";
import './StoryPage.scss'

export default function StoryPage(){
    const [playing, setplaying] = useState(true)
    const [loading, setloading] = useState(0)
    const [play, setplay] = useState(true)
    const videoPlayer = useRef<HTMLVideoElement>(null)
    const [sound, setsound] = useState(false)
    useEffect(()=>{
        if(playing && loading < 100){
            setTimeout(() => {
                    setloading(loading + 10)
            }, 1000);
        }
        
    }, [loading, playing])
    function soundhandle(){
        if(videoPlayer.current!.muted){
            videoPlayer.current!.muted = false
            setsound(false)
        }else{
            videoPlayer.current!.muted = true
            setsound(true)
        }
    }
    function playhandle(){
        if(playing){
            pauseVideo()
        }else{
            playVideo()
        }
    }
    function pauseVideo(){
        videoPlayer.current!.pause()
        setplaying(false)
    }
    function playVideo(){
        videoPlayer.current!.play()
        setplaying(true)
    }
    return(
        <div className="story-page">
            <div className="container">
                <button type="button" className="left-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="slider-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                    <div className="story-content">
                        <div className="detail-content-story">
                            <div className="header-story">
                                <img src="https://yt3.ggpht.com/ytc/AKedOLRfI8FYaFSeFPCMD1uODnO9DY2lHZXI9N3ITMt-LQ=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                <div className="name">Emily sie</div>
                            </div>
                            <div className="story-button">
                                <button className="play" onClick={playhandle}>
                                    {
                                        playing ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="play-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    }
                                </button>
                                <button className="sound" onClick={soundhandle}>
                                    {
                                        sound ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="sound-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="sound-button" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                        </svg>
                                    }
                                </button>
                                <button className="share">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="share-button" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                    </svg>
                                </button>
                                <button className="exit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="exit-button" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="loading-container">
                                <div className="loading-bar" style={{width: loading + "%"}}></div>
                            </div>
                        </div>
                        <video src="/Assets/video0.mp4" ref={videoPlayer} onMouseDown={pauseVideo} onMouseUp={playVideo} autoPlay muted></video>
                    </div>
                <button type="button" className="right-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="slider-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}