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
  // const [contextObject, setContextObject] = useState({});
  const [operationsLoaded, setOperationsLoaded] = useState(0);
  const [solvedProblemsLoading, setSolvedProblemsLoading] = useState(true);
  // setContextObject({
  //   searchText, setSearchText, sortType, setSortType, filterType, setFilterType, sortOptions
  // });

  useEffect(() => {
    const fetchSortOptionsWrapper = async () => {
      const options = await fetchSortOptions();
      setSortOptions(options);
      setOperationsLoaded(operationsLoaded + 1);
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
          setSolvedProblemsLoading(false);
        }
      } catch (error) {
        console.log("Error while fetching solved problems",error);
      }
    };

    fetchSolvedProblemsWrapper();
  }, [searchText, sortType, filterType]);



  return (
    <mainBodyContext.Provider value={{searchText, setSearchText, sortType, setSortType, filterType, setFilterType, sortOptions}}>
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      {operationsLoaded > 0 && <Operations></Operations>}
      {solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
      {solvedProblemsLoading && <div className='loading'>Loading...</div>}
    </div>
    </mainBodyContext.Provider>
  )
}
