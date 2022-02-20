import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import {
  getContestById,
  goToExpandedDialog,
  changeEditContest,
  changeShowImage,
} from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import ContestPageViewMode from './ContestPageViewMode';
import ContestPageOffer from './ContestPageOffer';

class ContestPage extends React.Component {
  componentWillUnmount() {
    this.props.changeEditContest(false);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { params } = this.props.match;
    this.props.getData({ contestId: params.id });
  };

  findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    const participants = [id, interlocutorId];
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

  goChat = () => {
    const { User } = this.props.contestByIdStore.contestData;
    this.props.goToExpandedDialog({
      interlocutor: User,
      conversationData: this.findConversationInfo(User.id),
    });
  };

  render() {
    const { role } = this.props.userStore.data;
    const {
      contestByIdStore,
      changeShowImage,
      getData,
    } = this.props;
    const {
      isShowOnFull,
      imagePath,
      error,
      isFetching,
      isBrief,
      contestData,
      offers,
    } = contestByIdStore;
    return (
      <div>
        {isShowOnFull && (
          <LightBox
            mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
            onCloseRequest={() => changeShowImage({ isShowOnFull: false, imagePath: null })}
          />
        )}
        <Header />
        {error && <div className={styles.tryContainer}><TryAgain getData={getData} /></div>}
        {isFetching && <div className={styles.containerSpinner}><Spinner /></div>}
        {contestData && <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <ContestPageViewMode />
            {isBrief
              ? <Brief contestData={contestData} role={role} goChat={this.goChat} />
              : <ContestPageOffer />}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
