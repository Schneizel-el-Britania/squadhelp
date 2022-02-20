import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import * as actionCreator from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import ContestPageViewMode from './ContestPageViewMode';
import ContestPageOffer from './ContestPageOffer';
import CONSTANTS from '../../constants';
import 'react-image-lightbox/style.css';
import styles from './ContestPage.module.sass';

const ContestPage = (props) => {
  const { data : {id: userId, role} } = useSelector(({ userStore }) => userStore);
  const { contestData, isShowOnFull, imagePath, error, isFetching, isBrief, offers } = useSelector(({ contestByIdStore }) => contestByIdStore);
  const { messagesPreview } = useSelector(({ chatStore }) => chatStore);

  const { getContestById, goToExpandedDialog, changeEditContest, changeShowImage } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => {
    const { params } = props.match;
    getContestById({ contestId: params.id });
    return () => changeEditContest(false);
  }, []);

  const findConversationInfo = (interlocutorId) => {
    const participants = [userId, interlocutorId];
    participants.sort((participant1, participant2) => participant1 - participant2);
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() => changeShowImage({ isShowOnFull: false, imagePath: null })}
        />
      )}
      <Header />
      {error && <div className={styles.tryContainer}><TryAgain getData={getContestById} /></div>}
      {isFetching && <div className={styles.containerSpinner}><Spinner /></div>}
      {contestData && <div className={styles.mainInfoContainer}>
        <div className={styles.infoContainer}>
          <ContestPageViewMode />
          {isBrief
            ? <Brief contestData={contestData} role={role} goChat={goChat} />
            : <ContestPageOffer />}
        </div>
        <ContestSideBar
          contestData={contestData}
          totalEntries={offers.length}
        />
      </div>}
    </div>
  );
};

export default ContestPage;
