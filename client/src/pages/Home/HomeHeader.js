import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import styles from './Home.module.sass';

const HomeHeader = () => {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  let timeout;
  const text = CONSTANTS.HEADER_ANIMATION_TEXT[index % CONSTANTS.HEADER_ANIMATION_TEXT.length];

  useEffect(() => {
    timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  return (
    <div className={styles.headerBar}>
      <div className={styles.headline}>
        <span>Find the Perfect Name for</span>
        <span className={styleName}>{text}</span>
      </div>
      <p>
        Launch a naming contest to engage hundreds of naming
        experts as you’re guided through our agency-level naming process.
        Or, explore our hand-picked collection of premium names
        available for immediate purchase
      </p>
      <div className={styles.button}>
        <Link className={styles.button__link} to="/dashboard">DASHBOARD</Link>
      </div>
    </div>
  );
};

export default HomeHeader;
