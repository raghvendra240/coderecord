import React, {useState, useEffect, useRef} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import {fetchSortOptions, fetchFilterOptions} from '../../services/operationsService'
import Operations from '../Operations/Operations'
import $ from 'jquery'
import mainBodyContext from '../../contexts/mainBodyContext'
import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader'
import SmallComponents from '../SmallComponents/SmallComponents'
import notFoundIcon from '../../assets/images/not-found.png'
import { smallComponents } from '../../utils/globalConstants'

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

  const showOperationsRow = function () {
    const basicCondition =  !solvedProblemsLoading && operationsLoaded >= 2 ;
    if (basicCondition && solvedProblems.length === 0) {
        return searchText.length > 0 || sortId > 0 || filterId > 0;
    }
    return basicCondition;
  }

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
      { showOperationsRow() && <Operations></Operations>}
      {!showOperationsRow() && !solvedProblemsLoading  && operationsLoaded >= 2 && <SmallComponents type={smallComponents.EMPTY_SCREEN} config={{emptyMessage:"Get started with Coderecord by solving your first coding problem!"}} ></SmallComponents>}
      {((searchText.length || filterId > 0 || sortId > 0 )&& solvedProblems.length === 0) && <SmallComponents type={smallComponents.NO_RESULT_FOUND} config={{iconClass: notFoundIcon, emptyMessage:"No result found"}} ></SmallComponents>}
      {operationsLoaded < 2 && <div style={{margin: '25px 45px'}}><Card showSkeleton={true}></Card> </div>}
      <div className='card-wrapper js-card-scrollable'>
        {solvedProblemsLoading && 
          <div>
            <Card showSkeleton={true}></Card>
            <Card showSkeleton={true}></Card>
            <Card showSkeleton={true}></Card>
          </div>
          }
          {!solvedProblemsLoading && solvedProblems.length > 0 && solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
          {loadingMore && <ThreeDotLoader></ThreeDotLoader>}
      </div>
    </div>
    </mainBodyContext.Provider>
  )
}
