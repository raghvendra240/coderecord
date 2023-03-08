import React from 'react'
import './primaryButton.scss'

export default function primaryButton({btnText, isAuthenticated}) {
  return (
    <>
    {isAuthenticated==='false' ? (<div className='primary-btn'>{btnText}</div>): ''}
    </>
  )
}
