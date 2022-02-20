import React from 'react';
import { useSelector } from 'react-redux';
import ContestForm from '../../components/ContestForm/ContestForm';
import styles from './ContestCreationPage.module.sass';

const ContestCreationBody = (props) => {

  const { formRef, handleSubmit, contestType } = props;
  const { contests } = useSelector(({ contestStore }) => contestStore);

  const contestData = contests[contestType] ? contests[contestType] : { contestType: contestType };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <ContestForm
          contestType={contestType}
          handleSubmit={handleSubmit}
          formRef={formRef}
          defaultData={contestData}
        />
      </div>
    </div>
  );
};

export default ContestCreationBody;