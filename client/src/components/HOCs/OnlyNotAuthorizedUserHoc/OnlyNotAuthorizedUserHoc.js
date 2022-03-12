import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../actions/actionCreator';
import Spinner from '../../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {

  const HocForLoginSignUp = (props) => {
    const { history } = props;
    const { data, isFetching } = useSelector(({ userStore }) => userStore);
    const { onlyForNotAuthorize } = bindActionCreators(actionCreator, useDispatch());

    useEffect(() => onlyForNotAuthorize(history.replace), []);
    
    return (<>
      {isFetching && <Spinner />}
      {!data && <Component history={history} />}
    </>);
  };

  return HocForLoginSignUp;
};

export default OnlyNotAuthorizedUserHoc;
