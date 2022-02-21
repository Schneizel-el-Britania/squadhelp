import React from 'react';
import CONSTANTS from '../../constants';
import styles from './ContestSideBar.module.sass';

const ContestBuyerInfo = (props) => {
  const { userId, User } = props;
  
  return (
    userId !== User.id && (
      <div className={styles.infoCustomerContainer}>
        <span className={styles.labelCustomerInfo}>About Contest Holder</span>
        <div className={styles.customerInfo}>
          <img
            src={User.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${User.avatar}`}
            alt="user"
          />
          <div className={styles.customerNameContainer}>
            <span>{`${User.firstName} ${User.lastName}`}</span>
            <span>{User.displayName}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default ContestBuyerInfo;