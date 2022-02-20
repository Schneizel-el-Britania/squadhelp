import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import * as actionCreator from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './UserProfile.module.sass';

const UserOptions = () => {
  const { changeProfileModeView } = bindActionCreators(actionCreator, useDispatch());
  const { data: { role } } = useSelector(({ userStore }) => userStore);
  const { profileModeView } = useSelector(({ userProfile }) => userProfile);

  const menuItemClasses = (option) => classNames(
    styles.optionContainer,
    { [styles.currentOption]: profileModeView === option }
  );

  return (
    <div className={styles.aside}>
      <span className={styles.headerAside}>Select Option</span>
      <div className={styles.optionsContainer}>
        <div
          className={menuItemClasses(CONSTANTS.USER_INFO_MODE)}
          onClick={() => changeProfileModeView(CONSTANTS.USER_INFO_MODE)}
        >
          UserInfo
        </div>
        {role === CONSTANTS.CREATOR && (
          <div
            className={menuItemClasses(CONSTANTS.CASHOUT_MODE)}
            onClick={() => changeProfileModeView(CONSTANTS.CASHOUT_MODE)}
          >
            Cashout
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOptions;