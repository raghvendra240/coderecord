import React from 'react'
import './profilePicturePreview.scss'
export default function profilePicturePreview({src}) {
  return (
       <>
       <div className='profile-picture-container'>
            <img  src={src} alt="" />
       </div>
       </>
  )
}
