import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';
import * as actionCreator from '../../actions/actionCreator';
import TryAgain from '../TryAgain/TryAgain';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';

const CreatorContestsList = (props) => {
  const { location, history } = props;
  const { creatorFilter, contests, haveMore, error } = useSelector(({ contestsList }) => contestsList);
  const { isFetching } = useSelector(({ dataForContest }) => dataForContest);

  const { getContestsForCreative, clearContestList, setNewCreatorFilter, getDataForContest } = bindActionCreators(actionCreator, useDispatch());

  const tryLoadAgain = () => {
    clearContestList();
    getContestsForCreative({ limit: 8, offset: 0, ...getPredicateOfRequest() });
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    getContestsForCreative({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const setContestList = () =>
    new Array(contests.length).fill(null).map((_, i) =>
      <ContestBox
        data={contests[i]}
        key={contests[i].id}
        goToExtended={goToExtended}
      />
    );

  const goToExtended = (contestId) => { history.push(`/contest/${contestId}`); };

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries: typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, creatorFilter)) {
      setNewCreatorFilter(filter);
      clearContestList();
      getContestsForCreative(filter);
      return false;
    }
    return true;
  };

  useEffect(() => {
    getDataForContest();
    const parseUrl = parseUrlForParams(location.search);
    if (parseUrl && !contests.length) {
      getContestsForCreative(creatorFilter);
    }
  }, [location.search]);

  return (
    error ?
      (<div className={styles.messageContainer}>
        <TryAgain getData={tryLoadAgain} />
      </div>) :
      (<ContestsContainer
        isFetching={isFetching}
        loadMore={loadMore}
        history={history}
        haveMore={haveMore}
      >
        {setContestList()}
      </ContestsContainer>)
  );
};

export default CreatorContestsList;