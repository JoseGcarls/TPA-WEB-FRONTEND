import './Footer.scss'
import React from 'react';
function Footer(){
    return(
        <div className="footer">
            <div className="footer-content-1">
                <a href="https://about.instagram.com/">About</a>
                <a href="https://about.instagram.com/en_US/blog">Blog</a>
                <a href="https://about.instagram.com/about-us/careers">Jobs</a>
                <a href="https://help.instagram.com/">Help</a>
                <a href="https://developers.facebook.com/docs/instagram">API</a>
                <a href="https://help.instagram.com/519522125107875">Privacy</a>
                <a href="https://help.instagram.com/581066165581870">Terms</a>
                <a href="https://www.instagram.com/directory/profiles/">Top Account</a>
                <a href="https://www.instagram.com/directory/hashtags/">Hashtags</a>
                <a href="https://www.instagram.com/explore/locations/">Location</a>
            </div>
            <div className="footer-content-2">
                @2021 inSOgram
            </div>
        </div>
    );
}

export default Footer