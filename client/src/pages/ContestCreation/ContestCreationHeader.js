import React from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './ContestCreationPage.module.sass';

const ContestCreationHeader = (props) => {
  const {title} = props;
  
  return (
    <div className={styles.startContestHeader}>
      <div className={styles.startContestInfo}>
        <h2>{title}</h2>
        <span>
          Tell us a bit more about your business as well as your preferences so that creatives get a better idea about what you are looking for
        </span>
      </div>
      <ProgressBar currentStep={2} />
    </div>
  );
};

export default ContestCreationHeader;