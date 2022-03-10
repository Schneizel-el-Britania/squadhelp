import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../../actions/actionCreator';
import classNames from 'classnames';
import AddToCatalog from '../AddToCatalog/AddToCatalog';
import CreateCatalog from '../CreateCatalog/CreateCatalog';
import CONSTANTS from '../../../../constants';
import styles from './CatalogCreation.module.sass';

const CatalogCreation = () => {
  const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } = CONSTANTS;
  const { catalogCreationMode, isFetching } = useSelector(({ chatStore }) => chatStore);
  const { changeTypeOfChatAdding, changeShowAddChatToCatalogMenu, getCatalogList } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => getCatalogList(), []);

  const createButton = (mode, text) => {
    const onClickHandle = () => changeTypeOfChatAdding(mode);
    const classes = classNames({ [styles.active]: catalogCreationMode === mode });
    return (
      <span onClick={onClickHandle} className={classes}>{text}</span>
    );
  };

  return (
    <>{
      !isFetching && (
        <div className={styles.catalogCreationContainer}>
          <i className="far fa-times-circle" onClick={() => changeShowAddChatToCatalogMenu()} />
          <div className={styles.buttonsContainer}>
            {createButton(ADD_CHAT_TO_OLD_CATALOG, "Old")}
            {createButton(CREATE_NEW_CATALOG_AND_ADD_CHAT, "New")}
          </div>
          {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? <CreateCatalog /> : <AddToCatalog />}
        </div>
      )
    }</>
  );
};

export default CatalogCreation;
