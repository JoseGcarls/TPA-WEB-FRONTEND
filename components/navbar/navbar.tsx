import './navbar.scss'
import {house, messenger, compass, heart, users} from '../../static/Assets/images.js'
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { JWTContext } from '../../App';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SEARCH_USERNAME } from '../../GraphQL/mutation';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { subscribe } from 'graphql';
import Popup from "reactjs-popup";
import { GET_FULL_DATA } from '../../GraphQL/queries';
function Navbar(){
    const [jwt, setJWT] = useContext(JWTContext)
    const [search, searchData] = useMutation(SEARCH_USERNAME)
    const subject = useMemo(() => new Subject<string>(), [])
    const [picture, setPicture] = useState("")
    var darkTheme;
    var theme;
    const [editfulldata, fulldata] = useLazyQuery(GET_FULL_DATA)
    useEffect(()=>{
        editfulldata({
            variables : {
                token : localStorage.getItem("jwt")
            }
        })
    },[])

    useEffect(()=>{
        theme = localStorage.getItem('theme')
        if (theme == "true"){
            document.body.classList.add('dark')
            darkTheme = true;
        }
        
    })
    
    
    useEffect(() => {
        const subscribe = subject.pipe(debounceTime(500), distinctUntilChanged(), map(e => e.trim())).subscribe(e => {
            search({
                variables : {
                    username: e
                }
            })
        })
        return (() => {
            subject.unsubscribe
        })
    }, [subject])
    useEffect(()=>{
        if(fulldata.data !== null && fulldata.data !== undefined){
            setPicture(fulldata.data.getUserDetailData[0].picture)
        }
    },[fulldata.data])

    // if(fulldata.loading){
    //     return(
    //         <div>loading</div>
    //     )
    // }
    function setDarkTheme(){
        document.body.classList.toggle("dark")
        darkTheme = !darkTheme
        localStorage.setItem('theme', String(darkTheme))
        
    }
    function showDropdown(){
        document.getElementById('dropdown-btn').classList.toggle('show')
    }

    function logout(){
        setJWT('');
        localStorage.removeItem("userid")
        localStorage.removeItem("username")
    }
    window.onclick = (e) =>{
        if(!e.target.matches('.users')){
            document.getElementById('dropdown-btn').classList.remove('show');
        }    
    }
    function closeSearchBar(){
        document.getElementById('toggle-show-search').classList.add('close-search');
        // document.getElementById('nav-title').style.display = "flex";
        document.getElementById('nav-title').classList.remove('close-search');
        document.getElementById('navicon').classList.remove('close-search');
        document.getElementById('nav-title').classList.add('set-middle');
        document.getElementById('search-bar-text').value = "";
    }
    function openSearchBar(){
        document.getElementById('toggle-show-search').classList.remove('close-search');
        // document.getElementById('nav-title').style.display = "none";

        document.getElementById('nav-title').classList.remove('set-middle');
        document.getElementById('nav-title').classList.add('close-search');
        document.getElementById('navicon').classList.add('close-search');
    }
    
    return (
        <div className="navbar">
            <div className="search-bar close-search" id="toggle-show-search">
                <button className="back-button" onClick={closeSearchBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </button>
                <Popup trigger={
                    <input type="text" autoComplete="off" name="search-bar-text" id="search-bar-text" placeholder="Search Here" onChange={
                        (e) => {
                            subject.next(e.target.value)
                            // console.log(e.target.value, subject.isStopped, searchData.data.searchUsername.username)
                        }
                    }/>
                } position="bottom left">
                    <div className="search-result">
                        {
                            searchData.data ?
                            searchData.data?.searchUsername.map((e) => 
                                <div className="result-username"><a href={`/OtherProfile/${e.username}`}>{e.username}</a></div>
                                
                            )
                            :
                            <div></div>
                            
                        }
                    </div>
                </Popup>
            </div>
            <div className="title set-middle" id="nav-title">
                <a href="/">
                    InSOgram
                </a>
            </div>
            <div className="search-container">
                <Popup trigger={
                    <input type="search" autoComplete="off" name="search" id="search" placeholder="Search Here..." onChange={
                        (e) => {
                            subject.next(e.target.value)
                            // console.log(e.target.value, subject.isStopped, searchData.data.searchUsername.username)
                        }
                    }/>
                } position="bottom left">
                    <div className="search-result">
                        {
                            searchData.data ?
                            searchData.data?.searchUsername.map((e) => 
                                <div className="result-username"><a href={`/OtherProfile/${e.username}`}>{e.username}</a></div>
                                
                            )
                            :
                            <div></div>
                            
                        }
                    </div>
                </Popup>
            </div>
            {
                jwt !== "" ?
            <div className="navicon" id="navicon">
                <button className="toggle-search" onClick={openSearchBar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="nav-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>                    
                </button>
                <button className="toggle-theme" onClick={setDarkTheme}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
                <a href="/addpost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="addicon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </a>
                <a href="/">
                    <img src={house} alt="" className="sub-icon"/>
                </a>
                <a href="/direct">
                    <img src={messenger} alt="" className="sub-icon"/>
                </a>
                <a href="/explore">
                    <img src={compass} alt="" className="sub-icon"/>
                </a>
                <a href="/activity">
                    <img src={heart} alt="" className="sub-icon"/>
                </a>
                <button onClick={showDropdown} id="users" className="users">
                    {
                        
                        picture == "" ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="sub-icon users" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        :
                        <img src={picture} alt="" className="user-image users"/>
                    }
                </button>
                <div className="dropdown-btn" id="dropdown-btn">
                    <a href="/profile" id="profile">
                        <div className="content-dropdown">
                            Profile
                        </div>
                    </a>
                    <a href="/profile/save">
                        <div className="content-dropdown">
                            Saved
                        </div>
                    </a>
                    <a href="/setting">
                        <div className="content-dropdown">
                            Settings
                        </div>
                    </a>
                    <a href="/login"  onClick={logout}>
                        <div className="content-dropdown logout">
                            Logout
                        </div>
                    </a>
                </div>
            </div>
            :
            <div className="nav-btn">
                <button className="toggle-theme" onClick={setDarkTheme}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>
                <a href="/login" className="btn">
                    <button className="login">
                        Log In
                    </button>
                </a>
                <a href="/register" className="btn">
                    <button className="signin">
                        Sign Up
                    </button>
                </a>  
            </div> 
            }
        </div>
    );
}
export default Navbar