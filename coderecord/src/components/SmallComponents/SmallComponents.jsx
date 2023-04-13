import React from 'react'
import './SmallComponents.scss'
import calenderIcon from "../../assets/images/calander.svg";

function dateComponent(date) {
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

export default function SmallComponents({dateType, date}) {
    
    if (dateType) {
        return dateComponent(date);
    } else return '';
}
