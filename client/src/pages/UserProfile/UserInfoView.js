import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import UserInfo from '../../components/UserInfo/UserInfo';
import Error from '../../components/Error/Error';
import PayForm from '../../components/PayForm/PayForm';
import CONSTANTS from '../../constants';
import styles from './UserProfile.module.sass';

const UserInfoView = () => {
  const { balance } = useSelector(({ userStore }) => userStore);
  const { profileModeView } = useSelector(({ userProfile }) => userProfile);
  const { error } = useSelector(({ payment }) => payment);
  const { cashOut, clearPaymentStore } = bindActionCreators(actionCreator, useDispatch());

  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    cashOut({ number, expiry, cvc, sum });
  };

  return (
    profileModeView === CONSTANTS.USER_INFO_MODE
      ? <UserInfo />
      : (
        <div className={styles.container}>
          {parseInt(balance) === 0
            ? <span className={styles.notMoney}>There is no money on your balance</span>
            : (
              <div>
                {error && <Error data={error.data} status={error.status} clearError={clearPaymentStore} />}
                <PayForm sendRequest={pay} />
              </div>
            )}
        </div>
      )
  );
};

export default UserInfoView;