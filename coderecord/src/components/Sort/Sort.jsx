import React, {useContext, useState} from 'react'
import './Sort.scss'
import sortIcon from '../../assets/images/sort.svg'
import downChevron from '../../assets/images/down-chevron.svg'
import upChevron from '../../assets/images/up-chevron.svg'
import ascendingIcon from '../../assets/images/ascending.svg'
import descendingIcon from '../../assets/images/descending.svg'
import circularLoader from '../../assets/images/circular-loader.gif'
import mainBodyContext from '../../contexts/mainBodyContext'
import {OPERATION_MAPPING} from '../../utils/globalConstants'
import $ from 'jquery'

export default function Sort() {
  const {sortOptions, setSortId, applyingOperations, setCurrentOperation} = useContext(mainBodyContext);
  const defaultSort = sortOptions.length && sortOptions.find((sortOption) => sortOption.default);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(defaultSort.id);
  document.addEventListener('click', (e) => {
    e.stopPropagation();
    const $element = $(e.target);
    if ($element.hasClass('js-sort-container') || $element.parents('.js-sort-container').length > 0) {
      if ($element.hasClass('js-sort-list') || $element.parents('.js-sort-list').length > 0) {
        return;
      }
      setDropdownStatus(!dropdownStatus);
    } else {
      setDropdownStatus(false);
    }
  })
  const listClickHandler = (e) => {
    e.stopPropagation();
    let $element = $(e.target);
    $element = $element.hasClass('sort-item') ? $element : $element.parents('.sort-item')
    const index = $element.data('index');
    setCurrentOperation(OPERATION_MAPPING.SORT)
    setSelectedSortOption(index);
    setDropdownStatus(false);
    setSortId(sortOptions[index].id)
  }
  return (
    <div className={`sort-container js-sort-container ${dropdownStatus && 'active' }`} >
      <div className='sort-header'>
        <div className='sort-icon'>
          <img src={sortIcon} alt="" />
        </div>
        <div className='sort-text'>
        <div>Sort:</div>
          <div className='selected'>{sortOptions[selectedSortOption]?.name || ''}</div>
        </div>
        <div className='down-chevron'>
          <img src={applyingOperations === OPERATION_MAPPING.SORT ? circularLoader :  (dropdownStatus ? upChevron : downChevron)} alt="" />
        </div>
      </div>
      <div className={`sort-list js-sort-list ${dropdownStatus &&  'active'}`} onClick={listClickHandler}>
        {sortOptions.map((option, index) => { 
          return <div className={`sort-item ${selectedSortOption === index && 'selected'}`} key={option.id}  data-index={index}>
            <div>{option.name}</div>
            <div><img className={`sort-icon`} src={option.order === 'ASC' ? ascendingIcon : descendingIcon} alt="" srcset="" /></div>
          </div>
          })
        }
      </div>

    </div>
  )
}
