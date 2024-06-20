import React from 'react';
import Trash from '../components/Icons';

const RemoveDancer = ({ onRemove, index }) => (
  <div className="bt-remove-dancers">
    <button className="remove-dancer" onClick={() => onRemove(index)}>
      <Trash />
    </button>
  </div>
);

export default RemoveDancer;