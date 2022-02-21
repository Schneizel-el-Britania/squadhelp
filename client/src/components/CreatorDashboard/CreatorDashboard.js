import React from 'react';
import { withRouter } from 'react-router-dom';
import CreatorContestsList from './CreatorContestsList';
import CreatorFilterList from './CreatorFilterList';
import styles from './CreatorDashboard.module.sass';

const CreatorDashboard = (props) => {
  const { location, history } = props;
  return (
    <div className={styles.mainContainer}>
      <CreatorFilterList history={history} />
      <CreatorContestsList history={history} location={location} />
    </div>
  );
};

export default withRouter(CreatorDashboard);
