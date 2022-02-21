import React, { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './ContestContainer.module.sass';

const ContestsContainer = (props) => {
  const { haveMore, loadMore, isFetching, children } = props;

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [children]);

  const scrollHandler = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (haveMore) { loadMore(children.length); }
    }
  };

  return (
    <div>
      {!isFetching && children.length === 0 && <div className={styles.notFound}>Nothing not found</div>}
      {children}
      {isFetching && <div className={styles.spinnerContainer}><Spinner /></div>}
    </div>
  );
};

export default ContestsContainer;
