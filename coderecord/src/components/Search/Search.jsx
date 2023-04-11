import React, {useState, useContext} from 'react'
import './Search.scss'
import searchIcon from '../../assets/images/search_icon.svg'
import crossIcon from '../../assets/images/cross_icon.svg'
import mainBodyContext from '../../contexts/mainBodyContext'


export default function Search() {
    const {searchText,setSearchText} = useContext(mainBodyContext);
    let onPrimaryBtnClickWrapper = (event) => {
        document.querySelector('.search-input').value = '';
        setSearchText('');
    };
    let lastTimeout = null;
    const onInputChange = (event) => {
        const value = event.target.value;
        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(() => {
            setSearchText(value);
        }, 500);
    }
  return (
   <div className='search-box-container'>
        <input type='text' className='search-input' onChange={onInputChange} placeholder='Search'></input>
        <button className='search-button' onClick={onPrimaryBtnClickWrapper}>
            <img src={searchText ? crossIcon : searchIcon} alt="" />
        </button>
   </div>
  )
}
