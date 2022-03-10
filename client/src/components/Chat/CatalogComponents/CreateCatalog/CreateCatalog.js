import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../../actions/actionCreator';
import { Formik, Form } from 'formik';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../validators/validationSchems';
import styles from './CreateCatalog.module.sass';

const initialValues = {
  catalogName: ''
};

const CreateCatalog = () => {
  const { addChatId } = useSelector(({ chatStore }) => chatStore);
  const { createCatalog } = bindActionCreators(actionCreator, useDispatch());

  const click = (values) => createCatalog({ catalogName: values.catalogName, chatId: addChatId });

  const catalogClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
  };

  return (
    <Formik onSubmit={click} initialValues={initialValues} validationSchema={Schems.CatalogSchema}>
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={catalogClasses}
        />
        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

export default CreateCatalog;
