import React from 'react'
import logo from '../../assets/images/main_logo_black.png'
import './header.scss'
import PrimaryButton from '../primaryButton/primaryButton'
export default function header() {
  return (
    <>
    <div className='header-container'>
        <img className='logo-black' src={logo} alt="logo" />
        <PrimaryButton btnText='Login' isAuthenticated='false'></PrimaryButton>
    </div>
    </>
  )
}
