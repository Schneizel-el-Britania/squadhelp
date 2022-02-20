import React from 'react';
import Header from '../../components/Header/Header';
import UserOptions from './UserOptions';
import UserInfoView from './UserInfoView';
import styles from './UserProfile.module.sass';

const UserProfile = (props) => {
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <UserOptions />
        <UserInfoView />
      </div>
    </div>
  );
};

export default UserProfile;
