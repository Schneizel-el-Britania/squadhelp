import React from 'react';
import SlideBar from '../../components/SlideBar/SlideBar';
import carouselConstants from '../../carouselConstants';
import styles from './Home.module.sass';

const HomeCustomersSay = () => {
  return (
    <div className={styles.blueContainer}>
      <h2 className={styles.whiteUnderline}>What our customers say</h2>
      <SlideBar
        images={carouselConstants.feedbackSliderImages}
        carouselType={carouselConstants.FEEDBACK_SLIDER}
      />
    </div>
  );
};

export default HomeCustomersSay;