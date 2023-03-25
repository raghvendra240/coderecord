import React, {useState, useEffect} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import Operations from '../Operations/Operations'

import mainBodyContext from '../../contexts/mainBodyContext'

export default function MainBody() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchSolvedProblemsWrapper = async () => {
      try {
        let solvedProblems_ = await fetchSolvedProblems(searchText);
        if (!solvedProblems_) {
          throw new Error("")
        } else {
          console.log(solvedProblems_);
          setSolvedProblems(solvedProblems_);
        }
      } catch (error) {
        console.log("Error while fetching solved problems",error);
      }
    };

    fetchSolvedProblemsWrapper();
  }, [searchText, sortType, filterType]);

  return (
    <mainBodyContext.Provider value={{searchText, setSearchText, sortType, setSortType, filterType, setFilterType}}>
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      <Operations></Operations>
      {solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
    </div>
    </mainBodyContext.Provider>
  )
}
