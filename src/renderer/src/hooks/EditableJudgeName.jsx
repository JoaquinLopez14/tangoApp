import React, { useState } from "react";
import PropTypes from 'prop-types';

const EditableJudgeName = ({ id,label, onLabelChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState(label);

    const handleLabelClick = () => {
        setIsEditing(true);
    };

    const handleLabelChange = (e) => {
        setTempLabel(e.target.value);
    };

    const handleLabelBlur = () => {
        setIsEditing(false);
        onLabelChange(tempLabel);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLabelBlur();
        } else if (e.key === 'Escape') {
            setTempLabel(label);
            setIsEditing(false);
        }
    };
            
            return (
              <>
            {isEditing ? (
              <input
              type="text"
              value={tempLabel}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              />
              ) : (
                <h2 className="input-option-name" onClick={handleLabelClick}>{label}</h2>
                )}
        </>
    );
    };
    
    EditableJudgeName.propTypes = {
        label: PropTypes.string.isRequired,
        onLabelChange: PropTypes.func.isRequired,
    };
    
export default EditableJudgeName;
