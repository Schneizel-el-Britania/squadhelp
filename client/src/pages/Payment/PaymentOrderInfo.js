import React from 'react';
import styles from './Payment.module.sass';

const PaymentOrderInfo = () => {
  return (
    <div className={styles.orderInfoContainer}>
    <span className={styles.orderHeader}>Order Summary</span>
    <div className={styles.packageInfoContainer}>
      <span className={styles.packageName}>Package Name: Standard</span>
      <span className={styles.packagePrice}>$100 USD</span>
    </div>
    <div className={styles.resultPriceContainer}>
      <span>Total:</span>
      <span>$100.00 USD</span>
    </div>
    <a href="#">Have a promo code?</a>
  </div>
  )
}

export default PaymentOrderInfo