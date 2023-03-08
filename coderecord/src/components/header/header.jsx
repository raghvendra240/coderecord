import React from 'react'
import logo from '../../assets/images/main_logo_black.png'
import './header.scss'
import PrimaryButton from '../primaryButton/primaryButton'
import WelcomeHeader from '../welcomeHeader/welcomeHeader'
import ProfilePicturePreview from '../profilePicturePreview/profilePicturePreview'
import dummyProfilePicture from '../../assets/images/profile_picture_dummy.png'
import '../../assets/styles/common.scss'

function authenticatedView (userName = "Raghav", profilePicture) {
    const profilePictureUrl = profilePicture || dummyProfilePicture;
  return (
    <>
      <div className='user-detail-container cr-display-flex cr-vertical-center'>
        <WelcomeHeader userName={userName}></WelcomeHeader>
        <div className="cr-margin-left-24">
          <ProfilePicturePreview  src={profilePictureUrl}></ProfilePicturePreview>
        </div>
      </div>
    </>
  )
}

export default function header({userDetails}) {
  const userName = userDetails && userDetails.userName;
  const isAuthenticated = userDetails && userDetails.isAuthenticated;
  const profilePicture = (userDetails && userDetails.profilePicture) || 'https://cdn.pixabay.com/photo/2020/05/09/13/29/photographer-5149664_960_720.jpg';
  return (
    <>
    <div className='header-container'>
        <img className='logo-black' src={logo} alt="logo" />
        {(isAuthenticated === 'false' || !isAuthenticated) && (<PrimaryButton btnText='Login' isAuthenticated='true'></PrimaryButton>)}
        {isAuthenticated === 'true' && authenticatedView(userName, profilePicture)}
    </div>
    </>
  )
}
