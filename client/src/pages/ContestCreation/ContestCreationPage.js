import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ContestCreationHeader from './ContestCreationHeader';
import ContestCreationBody from './ContestCreationBody';
import ContestCreationFooter from './ContestCreationFooter';

const ContestCreationPage = (props) => {
  const { contestType, history, title } = props;
  const { bundle } = useSelector(({ bundleStore }) => bundleStore);
  const { saveContestToStore } = bindActionCreators(actionCreator, useDispatch());

  const formRef = useRef();

  const handleSubmit = (values) => {
    saveContestToStore({ type: contestType, info: values });
    const route = bundle[contestType] === 'payment' ? '/payment' : `${bundle[contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) { formRef.current.handleSubmit(); }
  };

  !bundle && history.replace('/startContest');

  return (
    <div>
      <Header />
      <ContestCreationHeader title={title} />
      <ContestCreationBody formRef={formRef} handleSubmit={handleSubmit} contestType={props.contestType} />
      <ContestCreationFooter submitForm={submitForm} />
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
