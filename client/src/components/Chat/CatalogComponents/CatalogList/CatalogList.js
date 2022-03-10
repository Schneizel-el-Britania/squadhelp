import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import * as actionCreator from '../../../../actions/actionCreator';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';

const CatalogList = (props) => {
  const { catalogList } = props;
  const { changeShowModeCatalog, deleteCatalog } = bindActionCreators(actionCreator, useDispatch());

  const goToCatalog = (event, catalog) => {
    changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalogHandle = (event, catalogId) => {
    deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const elementList = [];
    catalogList.forEach((catalog) => {
      elementList.push(
        <Catalog
          catalog={catalog}
          key={catalog._id}
          deleteCatalog={deleteCatalogHandle}
          goToCatalog={goToCatalog}
        />
      );
    });
    return elementList.length ? elementList : <span className={styles.notFound}>Not found</span>;
  };

  return (
    <div className={styles.listContainer}>
      {getListCatalog()}
    </div>
  );
};

export default CatalogList;
