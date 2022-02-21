import React from 'react';
import moment from 'moment';
import CONSTANTS from '../../constants';
import styles from './ContestSideBar.module.sass';

const ContestInfo = (props) => {
  const { totalEntries, contestData } = props;

  const getTimeStr = () => {
    const diff = (moment.duration(moment().diff(moment(contestData.createdAt))));
    let str = '';
    if (diff._data.days !== 0) str = `${diff._data.days} days `;
    if (diff._data.hours !== 0) str += `${diff._data.hours} hours`;
    if (str.length === 0) str = 'less than one hour';
    return str;
  };

  return (
    <div className={styles.contestInfo}>
      <div className={styles.awardAndTimeContainer}>
        <div className={styles.prizeContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}big-diamond.png`} alt="diamond" />
          <span>{`$ ${contestData.prize}`}</span>
        </div>
        <div className={styles.timeContainer}>
          <div className={styles.timeDesc}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`} alt="clock" />
            <span>Going</span>
          </div>
          <span className={styles.time}>{getTimeStr()}</span>
        </div>
        <div className={styles.guaranteedPrize}>
          <div>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`} alt="check" />
          </div>
          <span>Guaranteed prize</span>
        </div>
      </div>
      <div className={styles.contestStats}>
        <span>Contest Stats</span>
        <div className={styles.totalEntrie}>
          <span className={styles.totalEntriesLabel}>Total Entries</span>
          <span>{totalEntries}</span>
        </div>
      </div>
    </div>
  );
};

export default ContestInfo;