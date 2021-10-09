import React from 'react';

import './GoalsContainer.css';
import Card from '../utils/Card';
import GoalItem from './GoalItem';

function GoalsContainer(props) {
  const hasNoGoals = !props.goals || props.goals.length === 0;

  return (
    <section id='goals-container'>
      <Card>
        <h2>Your Goals</h2>
        <small>Click on a goal to delete it!</small>
        {hasNoGoals && <h2>No goals found.</h2>}
        <div>
          {props.goals.map((goal) => (
            <GoalItem
              key={goal.id}
              id={goal.id}
              text={goal.text}
              onDelete={props.onDeleteGoal}
            />
          ))}
        </div>
      </Card>
    </section>
  );
}

export default GoalsContainer;
