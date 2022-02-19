import React from 'react';
import CONSTANTS from '../../constants';
import styles from './Home.module.sass';

const HomeContestStepThree = () => {
  return (
    <div className={styles.greyContainer}>
      <div className={styles.stepReverse}>
        <div>
          <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
          <p>
            <i className="fas fa-check" />
            <span>Provide instant feedback on Names</span>
          </p>
          <p>
            <i className="fas fa-check" />
            <span>Send private feedback or public messages to all creatives</span>
          </p>
          <p>
            <i className="fas fa-check" />
            <span>The more entries you rate - the submissions get better and better</span>
          </p>
        </div>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/3-compressed.gif`} alt="compressed" />
      </div>
    </div>
  );
};

export default HomeContestStepThree;
