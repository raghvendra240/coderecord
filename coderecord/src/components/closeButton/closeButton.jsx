import React from 'react'
import './closeButton.scss'
import closeBtn from "../../assets/images/close_btn.png";

export default function CloseButton({clickHandlerCB}) {
  return (
    <div className="close-btn-wrapper">
        <img onClick={clickHandlerCB} className="close-btn-image" src={closeBtn} alt="" />
    </div>
  )
}
