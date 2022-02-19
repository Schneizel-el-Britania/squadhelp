import React from 'react';
import SlideBar from '../../components/SlideBar/SlideBar';
import carouselConstants from '../../carouselConstants';
import styles from './Home.module.sass';

const HomeMainSlider = () => {
  return (
    <div className={styles.greyContainer}>
      <SlideBar
        images={carouselConstants.mainSliderImages}
        carouselType={carouselConstants.MAIN_SLIDER}
      />
    </div>
  );
};

export default HomeMainSlider;