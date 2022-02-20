import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import NextButton from '../../components/NextButton/NextButton';
import styles from './ContestCreationPage.module.sass';

const ContestCreationFooter = (props) => {
  const { submitForm } = props;

  return (
    <div className={styles.footerButtonsContainer}>
      <div className={styles.lastContainer}>
        <div className={styles.buttonsContainer}>
          <BackButton />
          <NextButton submit={submitForm} />
        </div>
      </div>
    </div>
  );
};

export default ContestCreationFooter;