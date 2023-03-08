import React from 'react'
import './primaryButton.scss'

export default function primaryButton({btnText}) {
  return (
    <>
      <div className='primary-btn'>{btnText}</div>
    </>
  )
}
