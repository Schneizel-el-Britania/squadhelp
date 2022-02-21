import React from 'react';
import styles from './TryAgain.module.sass';

const TryAgain = (props) => {
  const { getData } = props;
  return (
    <div className={styles.container} onClick={getData}>
      <span>Server Error. Try again</span>
      <i className="fas fa-redo"/>
    </div>
  );
};

export default TryAgain;
