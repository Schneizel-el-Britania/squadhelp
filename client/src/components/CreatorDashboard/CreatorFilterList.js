import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import queryString from 'query-string';
import classNames from 'classnames';
import styles from './CreatorDashboard.module.sass';
import CreatorFilterItem from './CreatorFilterItem';

const types = ['', 'name,tagline,logo', 'name', 'tagline', 'logo', 'name,tagline', 'logo,tagline', 'name,logo'];

const CreatorFilterList = (props) => {
  const { history } = props;
  const { creatorFilter } = useSelector(({ contestsList }) => contestsList);
  const { isFetching, data } = useSelector(({ dataForContest }) => dataForContest);
  const { getDataForContest, setNewCreatorFilter } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => { getDataForContest(); }, []);

  const renderSelectType = () => {
    const array = [];
    types.forEach((el, i) => !i || array.push(<option key={i - 1} value={el}>{el}</option>));
    return (
      <select
        onChange={({ target }) => changePredicate({
          name: 'typeIndex',
          value: types.indexOf(target.value),
        })}
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  const renderIndustryType = () => {
    const array = [<option key={0} value=''>Choose industry</option>];
    data.industry.forEach((industry, i) => array.push(<option key={i + 1} value={industry}>{industry}</option>));
    return (
      <select
        onChange={({ target }) => changePredicate({ name: 'industry', value: target.value })}
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  const changePredicate = ({ name, value }) => {
    setNewCreatorFilter({ [name]: value === 'Choose industry' ? null : value });
    parseParamsToUrl({ ...creatorFilter, ...{ [name]: value === 'Choose industry' ? null : value } });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.headerFilter}>Filter Results</span>
      <div className={styles.inputsContainer}>
        <div
          onClick={() => changePredicate({ name: 'ownEntries', value: !creatorFilter.ownEntries })}
          className={classNames(styles.myEntries, { [styles.activeMyEntries]: creatorFilter.ownEntries })}
        >
          My Entries
        </div>
        <CreatorFilterItem title="By contest type">{renderSelectType()}</CreatorFilterItem>
        <CreatorFilterItem title="By contest ID">
          <input
            type="text"
            onChange={({ target }) => changePredicate({ name: 'contestId', value: target.value })}
            name="contestId"
            value={creatorFilter.contestId}
            className={styles.input}
          />
        </CreatorFilterItem>
        {!isFetching && <CreatorFilterItem title="By industry">{renderIndustryType()}</CreatorFilterItem>}
        <CreatorFilterItem title="By amount award">
          <select
            onChange={({ target }) => changePredicate({ name: 'awardSort', value: target.value })}
            value={creatorFilter.awardSort || ''}
            className={styles.input}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </CreatorFilterItem>
      </div>
    </div>
  );
};

export default CreatorFilterList;