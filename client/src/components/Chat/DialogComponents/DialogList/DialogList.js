import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as actionCreator from '../../../../actions/actionCreator';
import DialogBox from '../DialogBox/DialogBox';
import CONSTANTS from '../../../../constants';
import styles from './DialogList.module.sass';

const DialogList = (props) => {
  const { preview, userId } = props;
  const { chatMode, removeChat } = useSelector(({ chatStore }) => chatStore);
  const { goToExpandedDialog, changeChatFavorite, changeChatBlock, changeShowAddChatToCatalogMenu } = bindActionCreators(actionCreator, useDispatch());

  const changeFavorite = (data, event) => {
    changeChatFavorite(data);
    event.stopPropagation();
  };
  const changeBlackList = (data, event) => {
    changeChatBlock(data);
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (event, chatId) => {
    changeShowAddChatToCatalogMenu(chatId);
    event.stopPropagation();
  };

  const onlyFavoriteDialogs = (chatPreview, userId) => chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];
  const onlyBlockDialogs = (chatPreview, userId) => chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const getTimeStr = (time) => {
    const currentTime = moment();
    if (currentTime.isSame(time, 'day')) return moment(time).format('HH:mm');
    if (currentTime.isSame(time, 'week')) return moment(time).format('dddd');
    if (currentTime.isSame(time, 'year')) return moment(time).format('MM DD');
    return moment(time).format('MMMM DD, YYYY');
  };

  const renderPreview = (filterFunc) => {
    const arrayList = [];
    preview.forEach((chatPreview, index) => {
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          getTimeStr={getTimeStr}
          changeFavorite={changeFavorite}
          changeBlackList={changeBlackList}
          chatMode={chatMode}
          catalogOperation={chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE ? removeChat : changeShowCatalogCreation}
          goToExpandedDialog={goToExpandedDialog}
        />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });
    return arrayList.length ? arrayList : <span className={styles.notFound}>Not found</span>;
  };

  const renderChatPreview = () => {
    const { FAVORITE_PREVIEW_CHAT_MODE, BLOCKED_PREVIEW_CHAT_MODE } = CONSTANTS;
    switch (chatMode) {
      case FAVORITE_PREVIEW_CHAT_MODE: return renderPreview(onlyFavoriteDialogs);
      case BLOCKED_PREVIEW_CHAT_MODE: return renderPreview(onlyBlockDialogs);
      default: return renderPreview();
    }
  };

  return (
    <div className={styles.previewContainer}>
      {renderChatPreview()}
    </div>
  );
};

export default DialogList;
