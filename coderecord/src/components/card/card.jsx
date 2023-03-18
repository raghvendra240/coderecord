
import './card.scss'
import gfgLogo from '../../assets/images/gfg_icon.png'
import leetcodeLogo from '../../assets/images/leetcode_icon_2.png'
import React from 'react';

function getFormattedDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
}

const Card = ({ problems }) => {
    return (
        <div className="solved-problems-list">
      {problems.map((problem) => {
        const platformIcon = gfgLogo;

        return (
          <div className="problem-card" key={problem._id}>
            <div className="platform-icon">
                <img className="platform-icon" src={platformIcon} alt="" srcset="" />
            </div>
            <div className="problem-details">
              <div className="problem-name">{problem.problemName}</div>
              <div className="problem-submission-date">{getFormattedDate(problem.submittedDate)}</div>
            </div>
            <div className="problem-action">
              <a href={problem.problemUrl} target="_blank" rel="noopener noreferrer">
                <button className="problem-action-button">Solve Again</button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
      );
};

export default Card;
