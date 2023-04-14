import React, { useContext } from 'react'
import './heroSection.scss'
import heroSectionPath from '../../assets/images/main_logo_orange.png'
import '../../assets/styles/common.scss'
import illustration from '../../assets/images/illustration.svg'
import PrimaryButton from '../primaryButton/primaryButton'
import appContext from '../../contexts/appContext'
import gfgIcon from '../../assets/images/gfg_icon.png'
import leetcodeIcon from '../../assets/images/leetcode_icon_2.png'
import {openUrlInNewTab} from '../../utils/commonFuntions'
import {URLS} from '../../utils/globalConstants'
export default function HeroSection() {
  const {setAuthenticationModal} = useContext(appContext);
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
                <PrimaryButton btnText='Download Chrome Extension'></PrimaryButton>
                <div className='vertical-separator'></div>
                <PrimaryButton btnText='Login' clickHandlerCB = {()=> {setAuthenticationModal(true)}}></PrimaryButton>
              </div>
              <div className='supported-platforms'>
                  <div className='heading'>SUPPORTED PLATFORMS</div>
                  <div className='separator'></div>
                  <div className='platform-container'>
                      <div>
                        <img onClick={() => {openUrlInNewTab(URLS.GFG)}} src={gfgIcon} alt="" srcset="" />
                      </div>
                      <div>
                        <img onClick={() => {openUrlInNewTab(URLS.LEETCODE)}} src={leetcodeIcon} alt="" srcset="" />
                      </div>
                  </div>
              </div>
           </div>
           <div className='illustration-container'>
              <img src={illustration} alt="" srcset="" />
           </div>
        </div>
    </div>
  )
}
