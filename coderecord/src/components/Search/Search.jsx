import React, {useState, useContext} from 'react'
import './Search.scss'
import searchIcon from '../../assets/images/search_icon.svg'
import crossIcon from '../../assets/images/cross_icon.svg'
import mainBodyContext from '../../contexts/mainBodyContext'

let onPrimaryBtnClick = function (searchText, setSearchText) {
    if (searchText) {
        setSearchText('');
    } 
}

export default function Search() {
    const {searchText, setSearchText} = useContext(mainBodyContext);
    let onPrimaryBtnClickWrapper = () => onPrimaryBtnClick(searchText, setSearchText);
  return (
   <div className='search-box-container'>
        <input type='text' className='search-input' value={searchText} onChange={(event) => {setSearchText(event.target.value)}} placeholder='Search'></input>
        <button className='search-button' onClick={onPrimaryBtnClickWrapper}>
            <img src={searchText ? crossIcon : searchIcon} alt="" />
        </button>
   </div>
  )
}
