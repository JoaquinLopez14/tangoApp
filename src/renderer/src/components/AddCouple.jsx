import React from "react";

const AddCouple = ({ onClick }) => (
  <div className="bt-newPair">
    <button className="addPair" onClick={onClick}>Añadir Pareja</button>
  </div>
);

export default AddCouple;