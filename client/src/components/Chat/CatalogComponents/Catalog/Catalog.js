import React from 'react';
import styles from './Catalog.module.sass';

const Catalog = (props) => {
  const { deleteCatalog, goToCatalog, catalog, catalog: { catalogName, chats, _id } } = props;

  const goToCatalogHandle = (event) => goToCatalog(event, catalog);
  const deleteCatalogHandle = (event) => deleteCatalog(event, _id);

  return (
    <div className={styles.catalogContainer} onClick={goToCatalogHandle}>
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number:  </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i className="fas fa-trash-alt" onClick={deleteCatalogHandle} />
      </div>
    </div>
  );
};

export default Catalog;
