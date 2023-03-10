import React from 'react'
import './card.scss'
import '../../assets/styles/common.scss'
import gfgLogo from '../../assets/images/gfg_icon.png'
import leetcodeLogo from '../../assets/images/leetcode_icon_2.png'

export default function Card() {
  return (
        <div class="card">
            <img className='image' src={leetcodeLogo} alt="" />
            <div className=''>
                <div>Longest Substring Without Repeating Characters</div>
                <div>Submitted on 09/03/203</div>
            </div>
        </div>
     )
}
