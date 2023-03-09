import React from 'react'
import './primaryButton.scss'

export default function primaryButton({btnText, clickHandlerCB}) {
  return (
    <>
      <div className='primary-btn' onClick={clickHandlerCB}>{btnText}</div>
    </>
  )
}
