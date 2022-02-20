import React from 'react';
import BundleBox from '../../components/BundleBox/BundleBox';
import styles from './StartContestPage.module.sass';

const StartContestCombinedBundles = ({ setBundle }) => {
  return (
    <div className={styles.combinedBundles}>
      <div className={styles.infoCombinedBundles}>
        <span className={styles.headerInfo}>Save With Our Bundle Packages</span>
        <span className={styles.info}>Launch multiple contests and pay a discounted bundle price</span>
        <hr />
      </div>
      <div className={styles.baseBundles}>
        <BundleBox
          path={['Name.png', 'Logo.png']}
          header="Name+Logo"
          describe="Get the essentials needed to establish your brand together and save."
          setBundle={setBundle}
        />
        <BundleBox
          path={['Name.png', 'Tagline.png']}
          header="Name+Tagline"
          describe="Communicate your vision with the perfect Name/Tagline combo."
          setBundle={setBundle}
        />
        <BundleBox
          path={['Logo.png', 'Tagline.png']}
          header="Tagline+Logo"
          describe="Description for Logo + Tagline will come here."
          setBundle={setBundle}
        />
        <BundleBox
          path={['Name.png', 'Logo.png', 'Tagline.png']}
          header="Name+Tagline+Logo"
          describe="Establish your entire brand identity and save with this bundle."
          setBundle={setBundle}
        />
      </div>
    </div>
  );
};

export default StartContestCombinedBundles;