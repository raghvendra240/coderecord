import React, {useContext, useState} from 'react'
import './Sort.scss'
import sortIcon from '../../assets/images/sort.svg'
import downChevron from '../../assets/images/down-chevron.svg'
import mainBodyContext from '../../contexts/mainBodyContext'
import $ from 'jquery'
export default function Sort() {
  const {sortOptions} = useContext(mainBodyContext);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  document.addEventListener('click', (e) => {
    e.stopPropagation();
    const $element = $(e.target);
    if ($element.hasClass('sort-container') || $element.parents('.sort-container').length > 0) {
      if ($element.hasClass('sort-list') || $element.parents('.sort-list').length > 0) {
        return;
      }
      setDropdownStatus(!dropdownStatus);
    } else {
      setDropdownStatus(false);
    }

    
  })
  return (
    <div className={dropdownStatus ? 'sort-container active': 'sort-container'} >
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
      <div className={dropdownStatus ? 'sort-list active': 'sort-list'}>
        {sortOptions.map((option) => { return <div className='sort-item' key={option.id}>{option.name}</div>})}
      </div>

    </div>
  )
}
