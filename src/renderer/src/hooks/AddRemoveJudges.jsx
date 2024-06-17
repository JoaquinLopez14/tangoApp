import React from "react";

const JudgeButtons = ({ index,onAddJudge, onRemoveJudge }) => {
    return (
        <div className="judge-container">
            <button className="addJudge" id="add" onClick={() => onAddJudge(index)}> + </button>
            <button className="addJudge" id="del" onClick={() => onRemoveJudge(index)}> - </button>
        </div>
    );
};

export default JudgeButtons;