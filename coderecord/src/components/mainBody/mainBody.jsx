import React, {useState, useEffect} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import {fetchSortOptions, fetchFilterOptions} from '../../services/operationsService'
import Operations from '../Operations/Operations'

import mainBodyContext from '../../contexts/mainBodyContext'

export default function MainBody() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortId, setSortId] = useState('');
  const [filterId, setFilterId] = useState('');
  const [sortOptions, setSortOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState();
  const [operationsLoaded, setOperationsLoaded] = useState(0);
  const [solvedProblemsLoading, setSolvedProblemsLoading] = useState(true);
 

  useEffect(() => {
    const fetchSortOptionsWrapper = async () => {
      const options = await fetchSortOptions();
      setSortOptions(options);
      setOperationsLoaded((preVal)=>preVal+1);
    }
    fetchSortOptionsWrapper();
  }, []);

  useEffect(() => {
    const fetchFilterOptionsWrapper = async () => {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
      setOperationsLoaded((preVal)=>preVal+1);
    }
    fetchFilterOptionsWrapper();
  }, []);

  useEffect(() => {
    const fetchSolvedProblemsWrapper = async () => {
    try {
        let solvedProblems_ = await fetchSolvedProblems(searchText, sortId);
        if (!solvedProblems_) {
          throw new Error("")
        } else {
          setSolvedProblems(solvedProblems_);
          setSolvedProblemsLoading(false);
        }
      } catch (error) {
        console.log("Error while fetching solved problems",error);
      }
    };

    fetchSolvedProblemsWrapper();
  }, [searchText, sortId, filterId]);



  return (
    <mainBodyContext.Provider value={{searchText, setSearchText, setSortId, setFilterId, sortOptions, filterOptions}}>
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      {operationsLoaded > 2 && <Operations></Operations>}
      {solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
      {solvedProblemsLoading && <div className='loading'>Loading...</div>}
    </div>
    </mainBodyContext.Provider>
  )
}
