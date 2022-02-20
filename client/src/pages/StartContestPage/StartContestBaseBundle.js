import React from 'react';
import BundleBox from '../../components/BundleBox/BundleBox';
import styles from './StartContestPage.module.sass';

const StartContestBaseBundle = ({setBundle}) => {
  return (
    <div className={styles.baseBundleContainer}>
      <div className={styles.infoBaseBundles}>
        <span className={styles.headerInfo}>
          Our Most Popular
          <span>Categories</span>
        </span>
        <span className={styles.info}>Pick from our most popular categories, launch a contest and begin receiving submissions right away</span>
        <hr />
      </div>
      <div className={styles.baseBundles}>
        <BundleBox
          path={['Name.png']}
          header="Name"
          describe="Get up and running with the perfect name."
          setBundle={setBundle}
        />
        <BundleBox
          path={['Logo.png']}
          header="Logo"
          describe="Kickstart your venture with a unique, memorable logo."
          setBundle={setBundle}
        />
        <BundleBox
          path={['Tagline.png']}
          header="Tagline"
          describe="Connect deeply with your target audience with an on-target tagline."
          setBundle={setBundle}
        />
      </div>
    </div>
  );
};

export default StartContestBaseBundle;