import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component) => {

  const Hoc = (props) => {
    const { history, match } = props;
    const { isFetching, data } = useSelector(({ userStore }) => userStore);
    const { getUserAction } = bindActionCreators(actionCreator, useDispatch());
    useEffect(() => {
      if (!data) {
        getUserAction(history.replace);
      }
    }, []);

    return (<>
      {isFetching ? <Spinner /> : <Component history={history} match={match} {...props} />}
    </>);
  };

  return Hoc;
};

export default PrivateHoc;
