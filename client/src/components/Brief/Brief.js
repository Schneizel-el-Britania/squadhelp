import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../../actions/actionCreator';
import ContestForm from '../ContestForm/ContestForm';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';
import styles from './Brief.module.sass';

const Brief = (props) => {
  const { isEditContest, contestData } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { error } = useSelector(({ updateContestStore }) => updateContestStore);
  const { data: { id: userId, role } } = useSelector(({ userStore }) => userStore);
  const { updateContest, changeEditContest, clearUpdateContestStore } = bindActionCreators(actionCreator, useDispatch());

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData.id);
    updateContest(data);
  };

  const getContestObjInfo = () => {
    const defaultData = {};
    Object.keys(contestData).forEach((key) => {
      if (contestData[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: contestData[key] };
        } else {
          defaultData[key] = contestData[key];
        }
      }
    });
    return defaultData;
  };

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={userId}
        contestData={contestData}
        changeEditContest={changeEditContest}
        role={role}
        goChat={props.goChat}
      />
    );
  }

  return (
    <div className={styles.contestForm}>
      {error && <Error data={error.data} status={error.status} clearError={clearUpdateContestStore} />}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default withRouter(Brief);
