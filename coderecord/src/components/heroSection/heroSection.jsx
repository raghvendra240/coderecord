import React from 'react'
import './heroSection.scss'
import heroSectionPath from '../../assets/images/main_logo_orange.png'
import '../../assets/styles/common.scss'
import illustration from '../../assets/images/illustration.svg'
export default function heroSection() {
  return (
    <div className='hero-container'>
        <div><img src={heroSectionPath} alt="" /></div>
        {/* <div className='hero-text'>Track your progress, conquer coding challenges, and reach new heights with CodeRecord</div> */}
        <h1>Welcome to CodeRecord</h1>
        <div className='cr-display-flex body-container'>
           <div className='left-container'>
            <div className='subtext'>Stay organized with your coding progress.</div>
            <div className='app-info'>CodeRecord is the best app to keep track of your coding problems and solutions. With CodeRecord, you can easily organize and manage all your coding challenges, and never forget a solution again.</div>
              <div className='download-section'>
                <div className="button">Download Chrome Extension</div>
                <div className='vertical-separator'></div>
                <div className="button">Login</div>
              </div>
           </div>
           <div className='illustration-container'>
              <img src={illustration} alt="" srcset="" />
           </div>
        </div>
    </div>
  )
}
