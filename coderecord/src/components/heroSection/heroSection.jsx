import React from 'react'
import './heroSection.scss'
import heroSectionPath from '../../assets/images/main_logo_orange.png'
import '../../assets/styles/common.scss'

export default function heroSection() {
  return (
    <div className='hero-container'>
        <div><img src={heroSectionPath} alt="" /></div>
        <div className='hero-text'>Track your progress, conquer coding challenges, and reach new heights with CodeRecord</div>
    </div>
  )
}
