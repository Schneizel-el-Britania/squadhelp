import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../../actions/actionCreator';
import { Formik, Form } from 'formik';
import SelectInput from '../../../SelectInput/SelectInput';
import styles from './AddToCatalog.module.sass';

const initialValues = {
  catalogId: ''
};

const AddToCatalog = () => {
  const { catalogList, addChatId } = useSelector(({ chatStore }) => chatStore);
  const { addChatToCatalog } = bindActionCreators(actionCreator, useDispatch());

  const getCatalogArray = (value) => {
    const array = [];
    catalogList.forEach((catalog) => array.push(catalog[value]));
    return array;
  };

  const click = (values) => addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId });
  const classes = {
    inputContainer: styles.selectInputContainer,
    inputHeader: styles.selectHeader,
    selectInput: styles.select,
  };
  
  const selectArray = getCatalogArray("catalogName");
  return (
    <>{
      selectArray.length !== 0
        ? (
          <Formik onSubmit={click} initialValues={initialValues}>
            <Form className={styles.form}>
              <SelectInput
                name="catalogId"
                header="name of catalog"
                classes={classes}
                optionsArray={selectArray}
                valueArray={getCatalogArray("_id")}
              />
              <button type="submit">Add</button>
            </Form>
          </Formik>
        )
        : <div className={styles.notFound}>You have not created any directories.</div>
    }</>
  );
};

export default AddToCatalog;
