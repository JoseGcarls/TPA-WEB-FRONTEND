import React, { createContext, useEffect, useState } from 'react';
import{BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage/ForgotPasswordPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Navbar from './components/navbar/navbar';
import Homepage from './Pages/HomePage/HomePage';
import VerificationPage from './Pages/VerificationPage/verificationPage';
import DirectMessagePage from './Pages/DirectMessagePage/DirectMessagePage';
import SettingPage from './Pages/SettingPage/SettingPage';
import firebase from 'firebase';
import AddPostPage from './Pages/AddPostPage/AddPostPage';
import ChangePassword from './Pages/ChangePasswordPage/ChangePasswordPage';
import OtherProfilePage from './Pages/OtherProfilePage/OtherProfilePage';
import ExplorePage from './Pages/ExplorePage/ExplorePage';
import ActivityPage from './Pages/ActivityPage/ActivityPage';
import DetailPage from './Pages/DetailPage/DetailPage';
import StoryPage from './Pages/StoryPage/StoryPage';

export const JWTContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => { }]);
export const EmailContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => { }]);
const firebaseConfigApp = firebase.initializeApp({
  apiKey: "AIzaSyCLvywVTOLK97nezaPQqzIWjKFYOcm_vZ0",
  authDomain: "insogram-324423.firebaseapp.com",
  projectId: "insogram-324423",
  storageBucket: "insogram-324423.appspot.com",
  messagingSenderId: "334553447434",
  appId: "1:334553447434:web:df77b602f01f87b702f3f3"
})
export const firebaseContext = createContext(firebaseConfigApp)

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") ?? "") 
  const [ectx, setEctx] = useState("")
  

  useEffect(() => {
      localStorage.setItem("jwt", jwt);
  }, [jwt]);
  return (
    <EmailContext.Provider value={[ectx, setEctx]}>
      <JWTContext.Provider value={[jwt, setJwt]}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/">
              {
                jwt !== "" ?  
                <Homepage/>
                :
                <Redirect to="/login"/>
              }
            </Route>
            <Route exact path="/login">
              {
                jwt !== "" ?
                <Redirect to="/"/> 
                :
                <LoginPage/>
              }
            </Route>
            <Route exact path="/register">
              {
                jwt !== "" ?
                <Redirect to="/"/>
                :
                <RegisterPage/>

              }
            </Route>
            <Route exact path="/forgotpassword">
              {
                jwt !== "" ?
                <Redirect to="/" />
                :
                <ForgotPasswordPage/>
              }
            </Route>
            <Route exact path="/changepassword/:token">
              <ChangePassword/>
            </Route>
            <Route path="/profile">
              {
                jwt !== "" ?
                <ProfilePage/>  
                :
                <Redirect to="/login"/>
              }
            </Route>
            <Route exact path="/verification/:email">
              {
                jwt !== "" ?
                <Redirect to="/" />
                :
                <VerificationPage/>
              }
            </Route>
            <Route exact path="/setting">
              {
                jwt !== "" ?
                <SettingPage/>
                :
                <Redirect to="/login"/>
              }
            </Route>
            <Route exact path="/direct">
              {
                jwt !== "" ?
                <DirectMessagePage/>  
                :
                <Redirect to="/login"/>
              }
            </Route>
            <Route exact path="/addPost">
              {
                jwt !== "" ?
                <AddPostPage/>  
                :
                <Redirect to="/login"/>
              }
            </Route>
            <Route path="/OtherProfile/:username">
              <OtherProfilePage/>
            </Route>
            <Route exact path="/explore">
              {
                jwt !== "" ?
                <ExplorePage/>
                :
                <Redirect to="/"/>
              }
            </Route>
            <Route exact path="/activity">
              {
                jwt !== "" ?
                <ActivityPage/>
                :
                <Redirect to="/"/>
              }
            </Route>
            <Route exact path="/detail/:id">
              {
                jwt !== "" ?
                <DetailPage/>
                :
                <Redirect to="/"/>
              }
            </Route>
            <Route>
              {
                jwt !== "" ? 
                <StoryPage/>
                :
                <Redirect to="/login"/>
              }
            </Route>
          </Switch>
        </Router>
      </JWTContext.Provider>
    </EmailContext.Provider>
  );
}

export default App;
