import React from "react";

const JudgeButtons = ({ index,onAddJudge, onRemoveJudge }) => {
    return (
        <div className="judge-container">
            <button className="addJudge" onClick={() => onAddJudge(index)}> + </button>
            <button className="addJudge" onClick={() => onRemoveJudge(index)}> - </button>
        </div>
    );
};

export default JudgeButtons;