import React from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './StartContestPage.module.sass';

const StartContestHeader = () => {
  return (
    <div className={styles.startContestHeader}>
      <div className={styles.startContestInfo}>
        <h2>
          START A CONTEST
        </h2>
        <span>
          Launching a contest on Squadhelp is very simple. Select the type of contest you would like
          to launch from the list below. Provide a detailed brief and select a pricing package.
          Begin receiving submissions instantly!
        </span>
      </div>
      <ProgressBar currentStep={1} />
    </div>
  );
};

export default StartContestHeader;