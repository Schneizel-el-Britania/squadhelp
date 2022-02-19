import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import HomeHeader from './HomeHeader';
import HomeMainSlider from './HomeMainSlider';
import HomeDescription from './HomeDescription';
import HomeStats from './HomeStats';
import HomeContestStepOne from './HomeContestStepOne';
import HomeContestStepTwo from './HomeContestStepTwo';
import HomeContestStepThree from './HomeContestStepThree';
import HomeNameForSale from './HomeNamesForSale';
import HomeCustomersSay from './HomeCustomersSay';

import styles from './Home.module.sass';


const Home = () => {
  const { isFetching } = useSelector(({ userStore }) => userStore);

  return (
    <>
      {isFetching && <Spinner />}
      <>
        <Header />
        <div className={styles.container}>
          <HomeHeader />
          <HomeMainSlider />
          <HomeDescription />
          <HomeStats />

          <h2>How Do Name Contest Work?</h2>
          <HomeContestStepOne />
          <HomeContestStepTwo />
          <HomeContestStepThree />

          <HomeNameForSale />
          <HomeCustomersSay />
        </div>
        <Footer />
      </>
    </>
  );
};

export default Home;
