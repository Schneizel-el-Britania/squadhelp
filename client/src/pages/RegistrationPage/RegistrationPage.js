import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import RegistrationFooter from './RegistrationFooter';
import CONSTANTS from '../../constants';
import styles from './RegistrationPage.module.sass';

const RegistrationPage = (props) => (
  <div className={styles.signUpPage}>
    <div className={styles.signUpContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
        <div className={styles.linkLoginContainer}>
          <Link to="/login" style={{ textDecoration: 'none' }} >
            <span>Login</span>
          </Link>
        </div>
      </div>
      <RegistrationForm history={props.history} />
    </div>
    <RegistrationFooter />
  </div>
);

export default RegistrationPage;
