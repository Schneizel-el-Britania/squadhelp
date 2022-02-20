import React from 'react';
import classnames from 'classnames';
import CONSTANTS from '../../constants';
import styles from './BundleBox.module.sass';

const BundleBox = (props) => {
  const { path, header, setBundle, describe } = props;
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () =>
    new Array(path.length).fill(null).map((_, i) =>
      <img
        src={defaultPathToImages + path[i]}
        key={i}
        className={styles.imgContainer}
        alt={props.path[i].replace(/.png/g, 'Contest')}
      />
    );

  const mouseHandler = (isOver) => {
    const element = document.getElementById(header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = isOver ?
        `${defaultPathToImages}blue_${path[i]}` :
        defaultPathToImages + path[i];
    }
  };

  const classNames = classnames(
    styles.bundleContainer,
    props.path.length > 1 ? styles.combinedBundle : null
  );

  return (
    <div
      onMouseOver={() => mouseHandler(true)}
      onMouseOut={() => mouseHandler(false)}
      onClick={() => setBundle(header)}
      id={header}
      className={classNames}
    >
      <div> {renderImage()} </div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;
