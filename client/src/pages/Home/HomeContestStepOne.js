import React from 'react';
import CONSTANTS from '../../constants';
import styles from './Home.module.sass';

const HomeContestStepOne = () => {
  return (
    <div className={styles.whiteContainer}>
      <div className={styles.stepReverse}>
        <div>
          <h3>Step 1: Launch a Naming Contest</h3>
          <p>
            <i className="fas fa-check" />
            <span>Start your project right with our proven Naming Brief template</span>
          </p>
          <p>
            <i className="fas fa-check" />
            <span>
              We’ll walk you through exactly what you need to share about your project
              in order to get an awesome Name
            </span>
          </p>
        </div>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/1-compressed.gif`} alt="compressed" />
      </div>
    </div>
  );
};

export default HomeContestStepOne;
