import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import * as actionCreator from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import DashboardFilterList from './DashboardFilterList';

const CustomerDashboard = (props) => {
  const { history } = props;
  const { isFetching, error, customerFilter, haveMore, contests } = useSelector(({ contestsList }) => contestsList);
  const { getContestsForCustomer, clearContestList, setNewCustomerFilter } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => {
    getContests();
    return () => { clearContestList(); };
  }, [customerFilter]);

  const loadMore = (startFrom) => {
    getContestsForCustomer({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const getContests = () => {
    getContestsForCustomer({ limit: 8, contestStatus: customerFilter });
  };

  const goToExtended = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };

  const setContestList = () =>
    new Array(contests.length).fill(null).map((_, i) =>
      <ContestBox
        data={contests[i]}
        key={contests[i].id}
        goToExtended={goToExtended}
      />
    );

  const tryToGetContest = () => {
    clearContestList();
    getContests();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <DashboardFilterList
          setNewCustomerFilter={setNewCustomerFilter} customerFilter={customerFilter}
          name="Active Contests" type={CONSTANTS.CONTEST_STATUS_ACTIVE}
        />
        <DashboardFilterList
          setNewCustomerFilter={setNewCustomerFilter} customerFilter={customerFilter}
          name="Completed contests" type={CONSTANTS.CONTEST_STATUS_FINISHED}
        />
        <DashboardFilterList
          setNewCustomerFilter={setNewCustomerFilter} customerFilter={customerFilter}
          name="Inactive contests" type={CONSTANTS.CONTEST_STATUS_PENDING}
          name="Inactive contests" type={CONSTANTS.CONTEST_STATUS_PENDING}
        />
      </div>
      <div className={styles.contestsContainer}>
        {error
          ? <TryAgain getData={tryToGetContest} />
          : (
            <ContestsContainer
              isFetching={isFetching}
              loadMore={loadMore}
              history={history}
              haveMore={haveMore}
            >
              {setContestList()}
            </ContestsContainer>
          )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
