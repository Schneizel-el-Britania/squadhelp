import React from 'react';
import styles from '../../Brief/Brief.module.sass';

const ContestInfoItem = (props) => {
  const { originalFileName, fileName, label, data } = props;
  return (
    <div className={styles.dataContainer}>
      <span className={styles.label}>{label}</span>
      {originalFileName ?
        <a
          target="_blank"
          className={styles.file}
          href={`${CONSTANTS.publicURL}${fileName}`}
          download={originalFileName}
          rel="noreferrer"
        >
          {originalFileName}
        </a> :
        <span className={styles.data}>{data}</span>}
    </div>
  );
};

export default ContestInfoItem;