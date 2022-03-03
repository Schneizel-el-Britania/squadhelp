import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as actionCreator from '../../actions/actionCreator';
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
import Schems from '../../validators/validationSchems';
import styles from './LoginForm.module.sass';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const { submitting, history } = props;
  const { error, isFetching } = useSelector(({ auth }) => auth);
  const { authActionLogin, clearAuth } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => () => clearAuth(), []);

  const clicked = (values) => authActionLogin(values, history);

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearAuth}
        />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={clicked}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
