import React from 'react';
import { Link } from 'react-router-dom';
import SlideBar from '../../components/SlideBar/SlideBar';
import carouselConstants from '../../carouselConstants';
import styles from './Home.module.sass';

const HomeNameForSale = () => {
  return (
    <>
      <div className={styles.headerBar}>
        <h3>Names For Sale</h3>
        <p className={styles.blueUnderline}>
          Not interested in launching a contest?
          Purchase a name instantly from our hand-picked
          collection of premium names. Price includes a complimentary Trademark Report,
          a Domain name as well as a Logo design
        </p>
      </div>
      <SlideBar
        images={carouselConstants.exampleSliderImages}
        carouselType={carouselConstants.EXAMPLE_SLIDER}
      />
      <div className={styles.button}>
        <Link className={styles.button__link} to="/dashboard">DASHBOARD</Link>
      </div>
    </>
  );
};

export default HomeNameForSale;
