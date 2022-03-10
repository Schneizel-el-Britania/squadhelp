import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import * as actionCreator from '../../../../actions/actionCreator';
import styles from './ChatInput.module.sass';
import CONSTANTS from '../../../../constants';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../validators/validationSchems';

const initialValues = {
  message: ''
};

const ChatInput = (props) => {

  const { interlocutor } = useSelector(({ chatStore }) => chatStore);
  const { data } = useSelector(({ userStore }) => userStore);
  const { sendMessageAction } = bindActionCreators(actionCreator, useDispatch());

  const submitHandler = (values, { resetForm }) => {
    sendMessageAction({
      messageBody: values.message,
      recipient: interlocutor.id,
      interlocutor: interlocutor,
    });
    resetForm();
  };

  const classes = {
    container: styles.container,
    input: styles.input,
    notValid: styles.notValid,
  };

  return (
    <div className={styles.inputContainer}>
      <Formik onSubmit={submitHandler} initialValues={initialValues} validationSchema={Schems.MessageSchema}>
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            classes={classes}
          />
          <button type="submit">
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`} alt="send message" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;
