import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StartContestHeader from './StartContestHeader';
import StartContestBaseBundle from './StartContestBaseBundle';
import StartContestCombinedBundles from './StartContestCombinedBundles';
import CONSTANTS from '../../constants';

const StartContestPage = (props) => {
  const { data } = useSelector(({ userStore }) => userStore);
  const { selectBundle } = bindActionCreators(actionCreator, useDispatch());

  if (data?.role !== CONSTANTS.CUSTOMER) { props.history.replace('/'); }

  const setBundle = (bundleStr) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = {};
    for (let i = 0; i < array.length; i++) {
      bundleList[array[i]] = i === array.length - 1 ? 'payment' : array[i + 1];
    }
    selectBundle(bundleList);
    props.history.push(`/startContest/${array[0]}Contest`);
  };

  return (
    <div>
      <Header />
      <StartContestHeader />
      <StartContestBaseBundle setBundle={setBundle} />
      <StartContestCombinedBundles setBundle={setBundle} />
      <Footer />
    </div>
  );
};

export default StartContestPage;
