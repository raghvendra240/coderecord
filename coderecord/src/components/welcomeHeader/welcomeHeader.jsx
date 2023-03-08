import React from 'react'
import './welcomeHeader.scss'

export default function welcome({userName}) {
  return (
    <div className='welcome-container'>welcome! {userName}</div>
  )
}
