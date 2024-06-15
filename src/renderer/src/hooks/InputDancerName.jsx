import React from "react";

const InputDancerName = ({ index, nombreBailarina, nombreBailarin, handleInputChange }) => {
    return (
      <div className="input-names-container">
        <div className="input-name-container">
          <h2 className="input-option-name">Bailarina</h2>
            <input
              className="input-name"
              type="text"
              value={nombreBailarina || ''}
              onChange={(e) => handleInputChange(e, index, 'nombreBailarina')}
            />
        </div>
          <div className="input-name-container">
            <h2 className="input-option-name">Bailarín</h2>
              <input  
                className="input-name"
                type="text"
                value={nombreBailarin || ''}
                onChange={(e) => handleInputChange(e, index, 'nombreBailarin')}
              />
          </div>
      </div>
    );
};

export default InputDancerName;