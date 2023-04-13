import React, {useState, useEffect, useRef} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import {fetchSortOptions, fetchFilterOptions} from '../../services/operationsService'
import Operations from '../Operations/Operations'
import $ from 'jquery'
import mainBodyContext from '../../contexts/mainBodyContext'
import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader'

export default function MainBody() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortId, setSortId] = useState('');
  const [filterId, setFilterId] = useState('');
  const [sortOptions, setSortOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState();
  const [operationsLoaded, setOperationsLoaded] = useState(0);
  const [solvedProblemsLoading, setSolvedProblemsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [applyingOperations, setApplyingOperations] = useState(0);
  const [currentOperation, setCurrentOperation] = useState(0);
  let totalPagesRef = useRef(0);
  let currentPage = 1;

  const loadMore = async () => {
    if (currentPage < totalPagesRef.current) {
      ++currentPage;
      setLoadingMore(true);
      let data = await fetchSolvedProblems(searchText, sortId, filterId, currentPage);
      if (data.solvedProblems) {
        setSolvedProblems((oldProblems) => [...oldProblems, ...data.solvedProblems]);
        setLoadingMore(false);
      }
    }
  }

  const handleScroll = async () => {
    let scrollHeight = $('.js-card-scrollable').prop('scrollHeight');
    let scrollTop = $('.js-card-scrollable').prop('scrollTop');
    let clientHeight = $('.js-card-scrollable').prop('clientHeight');
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 2) {
      await loadMore();
    }
  }
 

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
      setApplyingOperations(currentOperation);
        let data = await fetchSolvedProblems(searchText, sortId, filterId);
        let solvedProblems_ = data.solvedProblems;
        if (!solvedProblems_) {
          throw new Error("")
        } else {
          setSolvedProblems(solvedProblems_);
          setSolvedProblemsLoading(false);
          totalPagesRef.current = data.totalPages;
          $('.js-card-scrollable').scroll(handleScroll);
        }
      } catch (error) {
        console.log("Error while fetching solved problems",error);
      } finally {
        setApplyingOperations(0);
      }
    };

    fetchSolvedProblemsWrapper();
  }, [searchText, sortId, filterId]);



  return (
    <mainBodyContext.Provider value={{searchText, setSearchText, setSortId, setFilterId, sortOptions, filterOptions, applyingOperations, setCurrentOperation}}>
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      {operationsLoaded >= 2 && <Operations></Operations>}
      <div className='card-wrapper js-card-scrollable'>
      {solvedProblemsLoading && 
        <div>
          <Card showSkeleton={true}></Card>
          <Card showSkeleton={true}></Card>
          <Card showSkeleton={true}></Card>
        </div>
        }
        {!solvedProblemsLoading && solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
        {loadingMore && <ThreeDotLoader></ThreeDotLoader>}
      </div>
    </div>
    </mainBodyContext.Provider>
  )
}
