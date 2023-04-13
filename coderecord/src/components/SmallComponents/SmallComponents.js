import React from 'react'
import './SmallComponents.scss'
import calenderIcon from "../../assets/images/calander.svg";

function dateComponent(date) {
    return (    
        <div className="date">
            <img src={calenderIcon}></img>
        </div>
    )
}

export default function SmallComponents({dateType, date}) {
    
    if (dateType) {
        return dateComponent(date);
    } else return '';
}
