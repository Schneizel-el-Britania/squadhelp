import React from 'react';
import classNames from 'classnames';
import styles from './CustomerDashboard.module.sass';

const DashboardFilterList = (props) => {
  const { name, type, setNewCustomerFilter, customerFilter } = props;

  const className = classNames({
    [styles.activeFilter]: type === customerFilter,
    [styles.filter]: type !== customerFilter,
  });

  return (
    <div onClick={() => setNewCustomerFilter(type)} className={className}>
      {name}
    </div>
  );
};

export default DashboardFilterList;