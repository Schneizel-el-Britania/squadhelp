import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreator from '../../actions/actionCreator';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import Error from '../../components/Error/Error';
import CONSTANTS from '../../constants';
import styles from './ContestPage.module.sass';

const ContestPageOffer = () => {
  const { data: { role, id: userId } } = useSelector(({ userStore }) => userStore);
  const { contestData, offers, setOfferStatusError } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { setOfferStatus, clearSetOfferStatusError } = bindActionCreators(actionCreator, useDispatch());

  const setOfferStatusFunc = (creatorId, offerId, command) => {
    clearSetOfferStatusError();
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    setOfferStatus(obj);
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const contestStatus = contestData.status;
    return (contestCreatorId === userId && contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE && offerStatus === CONSTANTS.OFFER_STATUS_PENDING);
  };

  const setOffersList = () => {
    const array = new Array(offers.length).fill(null).map((_, i) =>
      <OfferBox
        data={offers[i]}
        key={offers[i].id}
        needButtons={needButtons}
        setOfferStatus={setOfferStatusFunc}
        contestType={contestData.contestType}
        date={new Date()}
      />
    );
    return array.length !== 0 ? array : <div className={styles.notFound}>There is no suggestion at this moment</div>;
  };

  return (
    <div className={styles.offersContainer}>
      {(role === CONSTANTS.CREATOR && contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE)
        && (
          <OfferForm
            contestType={contestData.contestType}
            contestId={contestData.id}
            customerId={contestData.User.id}
          />
        )}
      {setOfferStatusError && (
        <Error
          data={setOfferStatusError.data}
          status={setOfferStatusError.status}
          clearError={clearSetOfferStatusError}
        />
      )}
      <div className={styles.offers}>{setOffersList()}</div>
    </div>
  );
};

export default ContestPageOffer;