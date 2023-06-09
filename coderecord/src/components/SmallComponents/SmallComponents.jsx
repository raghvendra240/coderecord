import React from 'react'
import './SmallComponents.scss'
import calenderIcon from "../../assets/images/calander.svg";
import {smallComponents} from '../../utils/globalConstants'
import PrimaryButton from '../primaryButton/primaryButton'
import chromeExtensionCoderecordLogo from '../../assets/images/extension-coderecord-logo.png'
import {openUrlInNewTab} from '../../utils/commonFuntions'
import {URLS, PLATFORM_ICONS, PLATFORMS, CHROME_EXTENSION_URL} from '../../utils/globalConstants'

function dateComponent({date}) {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const year = dateObj.getFullYear();
    return (    
        <div className="date-component-wrapper">
            <div className='calendar-icon'><img src={calenderIcon}></img></div>
            <div className='separator'></div>
             <div className='date-wrapper'>
                <div className='date-block'>{day}</div>
                <div className='date-block'>{month}</div>
                <div className='date-block'>{year}</div>
             </div>
        </div>
    )
}

function platformButtons ({platform}) {
   return (
        <div className='platform-btn'>
            <img onClick={() => {openUrlInNewTab(URLS[platform])}} src={PLATFORM_ICONS[platform]} alt="" srcset="" />
        </div>
   )
}

function noResultFound ({iconClass, emptyMessage}) {
    return (
        <div className='not-found'>
            {iconClass &&  <div className='not-found-icon'>
                <img src={iconClass} alt="" srcset=""></img>
            </div>}
            <div className='not-found-text'>{emptyMessage}</div>
        </div>
    )
}

function emptyScreen ({iconClass, emptyMessage}) {
   return (
        <div className='empty-screen'>
            <div className='chrome-extension-logo'>
                <img src={chromeExtensionCoderecordLogo} alt="" srcset="" />
            </div>
            <div className='primary-button'><PrimaryButton btnText='Install Chrome Extension'clickHandlerCB={() => {openUrlInNewTab(CHROME_EXTENSION_URL)}} ></PrimaryButton></div>
            <div className='sub-title'>Get started with Coderecord by solving your first coding problem!</div>
            <div className='platforms'>
                {platformButtons({platform: PLATFORMS.GFG})}
                {platformButtons({platform: PLATFORMS.LEETCODE})}
            </div>
        </div>
   )
}

export default function SmallComponents({type, config}) {
    
    if (type === smallComponents.DATE) {
        return dateComponent(config);
    } else if (type === smallComponents.NO_RESULT_FOUND) {
        return noResultFound(config);
    } else if (type === smallComponents.EMPTY_SCREEN) {
        return emptyScreen(config);
    } else if (type === smallComponents.PLATFORM_ICON) {
        return platformButtons(config);
    } else return '';
}
