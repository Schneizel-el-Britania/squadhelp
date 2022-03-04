import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import * as actionCreator from '../../actions/actionCreator';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBox = (props) => {
  const { contestType, data: { User, User: { id: userId, avatar, firstName, lastName, email, rating }, status, mark, fileName, text } } = props;
  const { data: { id, role } } = useSelector(({ userStore }) => userStore);
  const { messagesPreview } = useSelector(({ chatStore }) => chatStore);
  const { changeMark, clearChangeMarkError, goToExpandedDialog, changeShowImage } = bindActionCreators(actionCreator, useDispatch());

  const findConversationInfo = () => {
    const participants = [id, userId];
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

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(userId, id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(userId, id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMarkFunc = (value) => {
    clearChangeMarkError();
    changeMark({
      mark: value,
      offerId: id,
      isFirst: !mark,
      creatorId: userId,
    });
  };

  const offerStatus = () => {
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return <i className={classNames('fas fa-times-circle reject', styles.reject)} />;
    } if (status === CONSTANTS.OFFER_STATUS_WON) {
      return <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />;
    }
    return null;
  };

  const goChat = () => goToExpandedDialog({ interlocutor: User, conversationData: findConversationInfo() });

  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              )}
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST
            ? (
              <img
                onClick={() => changeShowImage({ imagePath: fileName, isShowOnFull: true })}
                className={styles.responseLogo}
                src={`${CONSTANTS.publicURL}${fileName}`}
                alt="logo"
              />
            )
            : <span className={styles.response}>{text}</span>}
          {userId !== id && (
            <Rating
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star" />}
              onClick={changeMarkFunc}
              placeholderRating={mark}
            />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && <i onClick={goChat} className="fas fa-comments" />}
      </div>
      {props.needButtons(status) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>Resolve</div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>Reject</div>
        </div>
      )}
    </div>
  );
};

export default withRouter(OfferBox);
