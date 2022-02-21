import React from 'react';
import { useSelector } from 'react-redux';
import ContestBuyerInfo from './ContestBuyerInfo';
import ContestInfo from './ContestInfo';
import styles from './ContestSideBar.module.sass';

const ContestSideBar = (props) => {
  const { data } = useSelector(({ userStore }) => userStore);
  const { totalEntries, contestData, contestData: { User } } = props;

  return (
    <div className={styles.contestSideBarInfo}>
      <ContestInfo totalEntries={totalEntries} contestData={contestData} />
      <ContestBuyerInfo userId={data.id} User={User} />
    </div>
  );
};

export default ContestSideBar;
