import React from 'react'
import './Operations.scss'
import Sort from '../Sort/Sort'
import Filter from '../Filter/Filter'
import Search from '../Search/Search'

export default function Operations() {
  return (
    <div className='operations-row'>
        <Search></Search>
        <div className='sort-filter-col'>
            <Sort></Sort>
            <Filter></Filter>
        </div>
    </div>
  )
}
