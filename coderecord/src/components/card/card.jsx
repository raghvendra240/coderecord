import "./card.scss";
import gfgLogo from "../../assets/images/gfg_icon.png";
import leetcodeLogo from "../../assets/images/leetcode_icon_2.png";
import React, { useState } from "react";
import SmallComponents from "../SmallComponents/SmallComponents";
import HintPopup from "../HintPopup/HintPopup";

function getFormattedDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
}

function getPaltformIcon(platform) {
  switch (platform) {
    case "gfg":
      return gfgLogo;
    case "leetcode":
      return leetcodeLogo;
    default:
      return;
  }
}

function getSkeleton() {
  return (
    <div className="problem-card skeleton">
      <div className="platform-icon"></div>
      <div className="problem-details"></div>
      <div className="problem-action"></div>
    </div>
  );
}

const Card = ({ problem, showSkeleton }) => {
  const [isHintOpen, setIsHintOpen] = useState(false);
  function openHintModal() {
    setIsHintOpen(true);
  }
  if (showSkeleton) {
    return getSkeleton();
  } else
    return (
      <div className={`problem-card`}>
        <div className="platform-icon">
          <img
            className="platform-icon"
            src={getPaltformIcon(problem.platformName)}
            alt=""
            srcset=""
          />
        </div>
        <div className="problem-details">
          <div className="problem-name">{problem.problemName}</div>
          <div className="problem-submission-date">
            {getFormattedDate(problem.submittedDate)}
          </div>
        </div>
        <div className="problem-action">
          {problem.reminderDate && <SmallComponents dateType={true} date={problem.reminderDate}></SmallComponents>}
          <button
            className={`problem-action-button ${problem.problemHint ? "" : "disabled"}`}
            onClick={openHintModal}
            style={{ "margin-right": "12px" }}
          >
            View Hint
          </button>
          <a
            className=" margin-left-8"
            href={problem.problemUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="problem-action-button">Solve Again</button>
          </a>
        </div>
        {isHintOpen && (
          <HintPopup
            problemHint={problem.problemHint}
            problemName={problem.problemName}
            setIsHintOpen={setIsHintOpen}
          ></HintPopup>
        )}
      </div>
    );
};

export default Card;
