import React, {useState, useEffect} from 'react'
import './mainBody.scss'
import Card from '../card/card'
import {fetchSolvedProblems} from '../../services/solvedProblemService'
import Operations from '../Operations/Operations'

export default function MainBody() {
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchSolvedProblemsWrapper = async () => {
      try {
        console.log("Fetching solved problems");
        let solvedProblems_ = await fetchSolvedProblems();
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
  }, []);

  return (
    <div className='main-body-container'>
      {solvedProblems.length === 0 && <div className='no-solved-problems'>No solved problems found</div>}
      <Operations></Operations>
      {solvedProblems.map((problem) => { return <Card problem={problem} key={problem._id}></Card>})}
    </div>
  )
}
