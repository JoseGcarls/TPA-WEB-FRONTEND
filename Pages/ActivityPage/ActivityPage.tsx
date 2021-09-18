import React, { useState } from "react";
import './ActivityPage.scss'
export default function ActivityPage(){
    const [follow, setfollow] = useState(false)
    function followButton(){
        setfollow(!follow)
    }
    return(
        <div className="activity-page">
            <div className="activity-main">
                
                <div className="activity-container">
                    <div className="activity-image">
                        <img src="https://firebasestorage.googleapis.com/v0/b/insogram-324423.appspot.com/o/6e73053c-5220-454e-aa35-a9aa5c3941ba?alt=media&token=d8475142-a7a3-4f2c-a6f8-9d7099cccabb" alt="" />
                    </div>
                    <div className="activity-content-container">
                        <div className="container-content">
                            <span className="container-username">
                                jose_gcarls
                            </span>
                            mentioned you in a comment
                        </div>
                        
                    </div>

                </div>

                <div className="activity-container">
                    <div className="activity-image">
                        <img src="https://firebasestorage.googleapis.com/v0/b/insogram-324423.appspot.com/o/6e73053c-5220-454e-aa35-a9aa5c3941ba?alt=media&token=d8475142-a7a3-4f2c-a6f8-9d7099cccabb" alt="" />
                    </div>
                    <div className="activity-content-container">
                        <div className="container-content">
                            <span className="container-username">
                                jose_gcarls
                            </span>
                            started following you
                        </div>
                    </div>

                    <div className="activity-button">
                        <button type="button" onClick={followButton}>{follow ? "Following" : "Follow"}</button>
                    </div>
                </div>

            </div>
        </div>
    )
}