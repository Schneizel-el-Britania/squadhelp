import React from 'react';
import { useSelector } from 'react-redux';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';

const Dashboard = (props) => {
  const { history, match } = props;
  const { data } = useSelector(({ userStore }) => userStore);
  if (!data) { history.replace('/login'); }

  return (
    <div>
      <Header />
      {data && (data.role === CONSTANTS.CUSTOMER
        ? <CustomerDashboard history={history} match={match} />
        : <CreatorDashboard history={history} match={match} />)}
    </div>
  );
};

export default Dashboard;
