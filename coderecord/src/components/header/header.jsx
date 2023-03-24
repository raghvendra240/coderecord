import React from 'react'
import logo from '../../assets/images/main_logo_black.png'
import './header.scss'
import PrimaryButton from '../primaryButton/primaryButton'
import WelcomeHeader from '../welcomeHeader/welcomeHeader'
import LogOut from '../LogOut/LogOut'
import dummyProfilePicture from '../../assets/images/profile_picture_dummy.png'
import '../../assets/styles/common.scss'

function authenticatedView (userName, setAuthenticatedCB) {
  return (
    <>
      <div className='user-detail-container cr-display-flex cr-vertical-center'>
        <WelcomeHeader userName={userName}></WelcomeHeader>
        <div className="cr-margin-left-24">
          <LogOut setAuthenticatedCB={setAuthenticatedCB}></LogOut>
        </div>
      </div>
    </>
  )
}

export default function header({userDetails, isAuthenticated,  authenticationModalHandler, setAuthenticatedCB}) {
  const authenticationModalHandlerCB = () => {
    authenticationModalHandler(true);
  }
  return (
    <>
    <div className='header-container'>
        <img className='logo-black' src={logo} alt="logo" />
        {(isAuthenticated === 'false' || !isAuthenticated) && (<PrimaryButton btnText='Login' clickHandlerCB={authenticationModalHandlerCB} isAuthenticated='true'></PrimaryButton>)}
        {isAuthenticated === 'true' && authenticatedView(userDetails.firstName, setAuthenticatedCB)}
    </div>
    </>
  )
}
