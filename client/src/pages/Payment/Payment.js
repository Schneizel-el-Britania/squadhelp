import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Logo from '../../components/Logo';
import PaymentOrderInfo from './PaymentOrderInfo';
import PaymentCheckout from './PaymentCheckout';
import CONSTANTS from '../../constants';
import styles from './Payment.module.sass';

const Payment = (props) => {
  const { contests } = useSelector(({ contestStore }) => contestStore);

  if (isEmpty(contests)) {
    props.history.replace('startContest');
  }

  return (
    <div>
      <div className={styles.header}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} />
      </div>
      <div className={styles.mainContainer}>
        <PaymentCheckout history={props.history} />
        <PaymentOrderInfo />
      </div>
    </div>
  );
};

export default Payment;
