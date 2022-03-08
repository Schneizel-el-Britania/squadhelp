import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as actionCreator from '../../actions/actionCreator';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';
import AgreeTermOfServiceInput from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import Schems from '../../validators/validationSchems';
import CONSTANTS from '../../constants';
import styles from './RegistrationForm.module.sass';

const initialValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: CONSTANTS.CUSTOMER,
  agreeOfTerms: false,
};

const RegistrationForm = (props) => {
  const { submitting, history } = props;
  const { error } = useSelector(({ auth }) => auth);
  const { authActionRegister, clearAuth } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => () => clearAuth(), []);
  const clicked = (values) => authActionRegister(values, history);

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.signUpFormContainer}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearAuth}
        />
      )}
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={clicked}
        validationSchema={Schems.RegistrationSchem}
      >
        <Form>
          <div className={styles.row}>
            <FormInput
              name="firstName"
              classes={formInputClasses}
              type="text"
              label="First name"
            />
            <FormInput
              name="lastName"
              classes={formInputClasses}
              type="text"
              label="Last name"
            />
          </div>
          <div className={styles.row}>
            <FormInput
              name="displayName"
              classes={formInputClasses}
              type="text"
              label="Display Name"
            />
            <FormInput
              name="email"
              classes={formInputClasses}
              type="text"
              label="Email Address"
            />
          </div>
          <div className={styles.row}>
            <FormInput
              name="password"
              classes={formInputClasses}
              type="password"
              label="Password"
            />
            <FormInput
              name="confirmPassword"
              classes={formInputClasses}
              type="password"
              label="Password confirmation"
            />
          </div>
          <div className={styles.choseRoleContainer}>
            <Field
              name="role"
              type="radio"
              value={CONSTANTS.CUSTOMER}
              strRole="Join As a Buyer"
              infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
              component={RoleInput}
              id={CONSTANTS.CUSTOMER}
            />
            <Field
              name="role"
              type="radio"
              value={CONSTANTS.CREATOR}
              strRole="Join As a Creative"
              infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
              component={RoleInput}
              id={CONSTANTS.CREATOR}
            />
          </div>
          <div className={styles.termsOfService}>
            <AgreeTermOfServiceInput
              name="agreeOfTerms"
              classes={{
                container: styles.termsOfService,
                warning: styles.fieldWarning,
              }}
              id="termsOfService"
              type="checkbox"
            />

          </div>
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>Create Account</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
