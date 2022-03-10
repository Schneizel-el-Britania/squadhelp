import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import * as actionCreator from '../../../../actions/actionCreator';
import CONSTANTS from '../../../../constants';
import styles from './ChatHeader.module.sass';

const ChatHeader = (props) => {
  const { userId } = props;
  const { interlocutor: { avatar, firstName }, chatData } = useSelector(({ chatStore }) => chatStore);
  const { backToDialogList, changeChatFavorite, changeChatBlock } = bindActionCreators(actionCreator, useDispatch());

  const changeFavorite = (data, event) => {
    changeChatFavorite(data);
    event.stopPropagation();
  };
  const changeBlackList = (data, event) => {
    changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = () => {
    const { participants, favoriteList } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };
  const isBlocked = () => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  const favoriteHandle = (event) => changeFavorite({
    participants: chatData.participants,
    favoriteFlag: !isFavorite(),
  }, event);
  const blockHandle = (event) => changeBlackList({
    participants: chatData.participants,
    blackListFlag: !isBlocked(),
  }, event);

  const favoriteClasses = classNames({
    'far fa-heart': !isFavorite(),
    'fas fa-heart': isFavorite(),
  });
  const blockClasses = classNames({
    'fas fa-user-lock': !isBlocked(),
    'fas fa-unlock': isBlocked(),
  });

  return (
    <div className={styles.chatHeader}>
      <div className={styles.buttonContainer} onClick={() => backToDialogList()}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`} alt="back" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`} alt="user"/>
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i onClick={favoriteHandle} className={favoriteClasses} />
            <i onClick={blockHandle} className={blockClasses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
