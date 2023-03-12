import React from 'react'
import './card.scss'
import '../../assets/styles/common.scss'
import gfgLogo from '../../assets/images/gfg_icon.png'
import leetcodeLogo from '../../assets/images/leetcode_icon_2.png'
import { LEETCODE, GFG } from '../../utils/globalConstants'

export default function Card({solvedProblemInfo}) {
  return (
        <div class="card">
            <img className='image' src={solvedProblemInfo.platformName === LEETCODE ? leetcodeLogo : gfgLogo} alt="" />
            <div className=''>
                <div>{solvedProblemInfo.problemName}</div>
                <div>Submitted on 09/03/203</div>
            </div>
        </div>
     )
}
