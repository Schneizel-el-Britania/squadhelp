import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../../actions/actionCreator';
import { Formik, Form } from 'formik';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../validators/validationSchems';
import styles from './CatalogHeader.module.sass';

const CatalogListHeader = (props) => {
  const { isRenameCatalog, currentCatalog: { catalogName, _id } } = useSelector(({ chatStore }) => chatStore);
  const { changeShowModeCatalog, changeRenameCatalogMode, changeCatalogName } = bindActionCreators(actionCreator, useDispatch());

  const changeCatalogNameHandle = (values) => changeCatalogName({ catalogName: values.catalogName, catalogId: _id });
  const initialValues = {
    catalogName,
  };
  const classes = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
  };

  return (
    <div className={styles.headerContainer}>
      <i className="fas fa-long-arrow-alt-left" onClick={() => changeShowModeCatalog()} />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i className="fas fa-edit" onClick={() => changeRenameCatalogMode()} />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik onSubmit={changeCatalogNameHandle} initialValues={initialValues} validationSchema={Schems.CatalogSchema}>
            <Form>
              <FormInput
                name="catalogName"
                classes={classes}
                type="text"
                label="Catalog Name"
              />
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CatalogListHeader;
