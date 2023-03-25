import React, {useState, useEffect} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import {fetchSortOptions} from '../../services/operationsService'
import Operations from '../Operations/Operations'

import mainBodyContext from '../../contexts/mainBodyContext'

export default function MainBody() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOptions, setSortOptions] = useState([]);
  // let sortOptions = [];
  // const setSortOptions = (options) => {sortOptions = options}

  const contextObject = {
    searchText, setSearchText, sortType, setSortType, filterType, setFilterType, sortOptions
  }

  useEffect(() => {
    const fetchSortOptionsWrapper = async () => {
      const options = await fetchSortOptions();
      setSortOptions(options);
    }
    fetchSortOptionsWrapper();
  }, []);

  useEffect(() => {
    const fetchSolvedProblemsWrapper = async () => {
    try {
        let solvedProblems_ = await fetchSolvedProblems(searchText);
        if (!solvedProblems_) {
          throw new Error("")
        } else {
          setSolvedProblems(solvedProblems_);
        }
      } catch (error) {
        console.log("Error while fetching solved problems",error);
      }
    };

    fetchSolvedProblemsWrapper();
  }, [searchText, sortType, filterType]);



  return (
    <mainBodyContext.Provider value={contextObject}>
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      <Operations></Operations>
      {solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
    </div>
    </mainBodyContext.Provider>
  )
}
