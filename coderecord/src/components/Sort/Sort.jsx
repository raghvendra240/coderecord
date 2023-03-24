import React from 'react'
import './Sort.scss'
import sortIcon from '../../assets/images/sort.svg'
import downChevron from '../../assets/images/down-chevron.svg'
export default function Sort() {
  return (
    <div className='sort-container'>
      <div className='sort-header'>
        <div className='sort-icon'>
          <img src={sortIcon} alt="" />
        </div>
        <div className='sort-text'>
          <div>Sort:</div>
          <div className='selected'>Submission</div>
        </div>
        <div className='down-chevron'>
          <img src={downChevron} alt="" />
        </div>
      </div>
      {/* <div className='sort-list'></div> */}

    </div>
  )
}
