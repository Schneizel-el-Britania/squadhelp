import React from 'react';
import styles from './CreatorDashboard.module.sass';

const CreatorFilterItem = (props) => {
  const { title, children } = props;
  return (
    <div className={styles.inputContainer}>
      <span>{title}</span>
      {children}
    </div>
  );
};

export default CreatorFilterItem;