import React from 'react';

import './GoalItem.css';

function GoalItem(props) {
  return (
    <div className='goal-item' onClick={props.onDelete.bind(null, props.id)}>
      {props.text}
    </div>
  );
}

export default GoalItem;
