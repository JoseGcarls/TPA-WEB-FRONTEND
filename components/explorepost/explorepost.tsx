import React from "react";

export default function ExplorePost({e}){
    return (
        <button>
            <div className="image-container">
                {
                    e.postDetail[0].type == "image" ?
                    <a href={`/detail/${e.id}`}>
                        <img src={e.postDetail[0].file} alt="" />
                    </a> 
                    :
                    <a href={`/detail/${e.id}`}>
                        <video src={e.postDetail[0].file}></video>
                    </a>
                }
            </div>
        </button>
    );
}