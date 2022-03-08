import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as actionCreator from '../../actions/actionCreator';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';
import CONSTANTS from '../../constants';
import styles from './UpdateUserInfoForm.module.sass';

const UpdateUserInfoForm = (props) => {
  const { onSubmit, submitting } = props;
  const { data, error } = useSelector(({ userStore }) => userStore);
  const { clearUserError } = bindActionCreators(actionCreator, useDispatch());

  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.displayName,
  };
  const inputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.error,
    notValid: styles.notValid,
  };

  const imageClasses = {
    uploadContainer: styles.imageUploadContainer,
    inputContainer: styles.uploadInputContainer,
    imgStyle: styles.imgStyle,
  };

  const updateFormCreator = () =>
    CONSTANTS.UpdateInfoItems.map((data) => {
      if (data?.type === "text") {
        return (
          <div className={styles.container} key={data.name}>
            <span className={styles.label}>{data.label}</span>
            <FormInput
              name={data.name}
              type={data.type}
              label={data.label}
              classes={inputClasses}
            />
          </div>);
      }
      return (
        <ImageUpload
          key={data.name}
          name={data.name}
          classes={imageClasses}
        />);
    });

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={Schems.UpdateUserSchema}>
      <Form className={styles.updateContainer}>
        {error && <Error data={error.data} status={error.status} clearError={clearUserError} />}
        {updateFormCreator()}
        <button type="submit" disabled={submitting}>Submit</button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
