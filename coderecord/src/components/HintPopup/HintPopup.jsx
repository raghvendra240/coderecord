import React from "react";
import "./HintPopup.scss";

export default function HintPopup({ problemHint, problemName, setIsHintOpen }) {
  return (
    <div className="backdrop">
      <div className="hint-popup">
        <div className="hint-popup-header">
          <div className="hint-popup-heading">{problemName}</div>
          <div className="hint-popup-close-button" onClick={() => setIsHintOpen(false)}>X</div>
        </div>
        <div className="hint-popup-body">{problemHint}</div>
      </div>
    </div>
  );
}
