import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import * as actionCreator from '../../actions/actionCreator';
import styles from './ContestPage.module.sass';


const ContestPageViewMode = () => {
  const { isBrief } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { changeContestViewMode } = bindActionCreators(actionCreator, useDispatch());
  const btnClasses = (value)=> classNames(styles.btn, { [styles.activeBtn]: value })

  return (
    <div className={styles.buttonsContainer}>
      <span
        onClick={() => changeContestViewMode(true)}
        className={btnClasses(isBrief)}
      >
        Brief
      </span>
      <span
        onClick={() => changeContestViewMode(false)}
        className={btnClasses(!isBrief)}
      >
        Offer
      </span>
    </div>
  );
};

export default ContestPageViewMode;