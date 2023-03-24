import React, {useState, useEffect } from 'react'
import './App.scss'
import Header from './components/header/header'
import Welcome from './components/welcome/welcome'
import AuthenticationForm from './components/authenticationForm/authenticationForm'
import MainBody from './components/mainBody/mainBody'

import {getUserInfo} from './services/userService'

function getAuthenticatedView (userName) {

}

export default function App() {
  const [isAuthenticationModalOpen, setAuthenticationModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect( () => {
    const fetchUserInfo = async () => {
      try {
        let info = await getUserInfo();
        if (!info) {
          throw new Error("No user info found");
        }
        info = {...info, isAuthenticated: 'true'};
        setUserDetails(info);
        setIsAuthenticated('true');
      } catch (error) {
        console.log("Error while getting authentication detail",error);
      }
    };

    fetchUserInfo();
  }, [isAuthenticated])
  return (
    <div className="app-body">
       <Header userDetails={userDetails} isAuthenticated={isAuthenticated} authenticationModalHandler={setAuthenticationModal} setAuthenticatedCB={(value) => {setIsAuthenticated(value);}} ></Header>
       {(!isAuthenticated || isAuthenticated === 'false') && (<Welcome></Welcome>)}
       {(isAuthenticated === 'true') && (<MainBody></MainBody>)}
       {isAuthenticated === 'true' && getAuthenticatedView(userDetails.userName)}
      {isAuthenticationModalOpen && <AuthenticationForm setAuthenticatedCB={() => {setIsAuthenticated('true');}} closeModalFn={() => {  setAuthenticationModal(false)}}></AuthenticationForm>}
    </div>
  )
}
