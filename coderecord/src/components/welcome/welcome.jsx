import React from 'react'
import './welcome.scss'
import HeroSection from '../heroSection/heroSection'

export default function welcome() {
  return (
    <div className='welcome-body-container'>
      <div className='hero-image-wrapper'>
        <HeroSection></HeroSection>
      </div>
    </div>
  )
}
