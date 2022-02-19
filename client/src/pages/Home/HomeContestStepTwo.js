import React from 'react';
import CONSTANTS from '../../constants';
import styles from './Home.module.sass';

const HomeContestStepTwo = () => {
  return (
    <div className={styles.greenContainer}>
      <div className={styles.step}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/2-compressed-new.gif`} alt="compressed" />
        <div className={styles.greenStep}>
          <h3>Step 2: Ideas start pouring in within minutes</h3>
          <p>
            <i className="fas fa-check" />
            <span>100s of naming experts start submitting name ideas</span>
          </p>
          <p>
            <i className="fas fa-check" />
            <span>Names automatically checked for URL availability</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeContestStepTwo;
