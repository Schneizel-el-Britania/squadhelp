import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
import styles from './Payment.module.sass';

const PaymentCheckout = (props) => {
  const { contests } = useSelector(({ contestStore }) => contestStore);
  const { error } = useSelector(({ payment }) => payment);
  const { payRequest, clearPaymentStore } = bindActionCreators(actionCreator, useDispatch());

  const pay = (values) => {
    const contestArray = [];
    Object.keys(contests).forEach((key) => contestArray.push(contests[key]));
    const { number, expiry, cvc } = values;
    const formData = new FormData();
    for (let i = 0; i < contestArray.length; i++) {
      formData.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }
    formData.append('number', number);
    formData.append('expiry', expiry);
    formData.append('cvc', cvc);
    formData.append('contests', JSON.stringify(contestArray));
    formData.append('price', '100');
    payRequest({ formData }, props.history);
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className={styles.paymentContainer}>
      <span className={styles.headerLabel}>Checkout</span>
      {error && <Error data={error.data} status={error.status} clearError={clearPaymentStore} />}
      <PayForm sendRequest={pay} back={goBack} isPayForOrder />
    </div>
  );
};

export default PaymentCheckout;