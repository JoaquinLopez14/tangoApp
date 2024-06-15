import React from "react";

const JudgeScoreInput = ({ judgeLabel, puntaje, onChange}) => {
    return (
        <div className="input-option-container">
            {judgeLabel}
            <input
                className="input-point"
                type = "number"
                maxLength= "5"
                value = {puntaje}
                onChange={onChange}
            />
        </div>
    );
};

export default JudgeScoreInput;