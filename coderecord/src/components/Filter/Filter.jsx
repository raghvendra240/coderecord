import React, { useState, useContext } from "react";
import "../Sort/Sort.scss";
import "./Filter.scss";
import filter_empty from "../../assets/images/filter_empty.svg";
import filter_filled from "../../assets/images/filter_filled.svg";
import downChevron from "../../assets/images/down-chevron.svg";
import upChevron from "../../assets/images/up-chevron.svg";
import circularLoader from '../../assets/images/circular-loader.gif'
import mainBodyContext from "../../contexts/mainBodyContext";
import {OPERATION_MAPPING} from '../../utils/globalConstants'
import $ from "jquery";

export default function Filter() {
  const { filterOptions, setFilterId, applyingOperations, setCurrentOperation} = useContext(mainBodyContext);
  const defaultFilter = filterOptions && filterOptions.length && filterOptions.find((filterOption) => filterOption.default);
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter.id);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  document.addEventListener('click', (e) => {
    e.stopPropagation();
    const $element = $(e.target);
    if ($element.hasClass('js-filter-container') || $element.parents('.js-filter-container').length > 0) {
      if ($element.hasClass('js-filter-list') || $element.parents('.js-filter-list').length > 0) {
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
    $element = $element.hasClass('js-filter-item') ? $element : $element.parents('.js-filter-item')
    const index = $element.data('index');
    setCurrentOperation(OPERATION_MAPPING.FILTER);
    setSelectedFilter(index);
    setDropdownStatus(false);
    setFilterId(filterOptions[index].id)
  }
  return (
    <div className={`sort-container js-filter-container ${dropdownStatus && 'active'}`}>
      <div className="sort-header">
        <div className="sort-icon">
          <img src={filter_empty} alt="" />
        </div>
        <div className="sort-text">
          <div>Filter:</div>
          <div className="selected">{filterOptions[selectedFilter].name}</div>
        </div>
        <div className="down-chevron">
          <img src={applyingOperations === OPERATION_MAPPING.FILTER ? circularLoader : (dropdownStatus ? upChevron : downChevron)} alt="" />
        </div>
      </div>
      <div className={`sort-list js-filter-list ${dropdownStatus &&  'active'}`} onClick={listClickHandler}>
        {filterOptions.map((option, index) => { 
          return <div className={`sort-item js-filter-item ${selectedFilter === index && 'selected'}`} key={option.id}  data-index={index}>
            <div>{option.name}</div>
          </div>
          })
        }
      </div>
    </div>
  );
}
