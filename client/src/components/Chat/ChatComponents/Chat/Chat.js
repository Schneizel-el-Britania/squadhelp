import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import * as actionCreator from '../../../../actions/actionCreator';
import { chatController } from '../../../../api/ws/socketController';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';
import Logo from '../../../Logo';
import CONSTANTS from '../../../../constants';
import styles from './Chat.module.sass';

const Chat = () => {
  const { isExpanded, isShow, isShowCatalogCreation, error, chatMode, isShowChatsInCatalog } = useSelector(({ chatStore }) => chatStore);
  const { data: { id } } = useSelector(({ userStore }) => userStore);
  const { changeChatShow, setPreviewChatMode, getPreviewChat } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => {
    chatController.subscribeChat(id);
    getPreviewChat();
    return () => { chatController.unsubscribeChat(id); };
  }, []);

  const createMenuItem = (mode, text) => {
    const onClickHandle = () => setPreviewChatMode(mode);
    const classes = classNames(styles.button, { [styles.activeButton]: chatMode === mode });
    return (
      <span onClick={onClickHandle} className={classes} >{text}</span>
    );
  };

  const renderDialogList = () => {
    const { NORMAL_PREVIEW_CHAT_MODE, FAVORITE_PREVIEW_CHAT_MODE, BLOCKED_PREVIEW_CHAT_MODE, CATALOG_PREVIEW_CHAT_MODE } = CONSTANTS;
    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            {createMenuItem(NORMAL_PREVIEW_CHAT_MODE, "Normal")}
            {createMenuItem(FAVORITE_PREVIEW_CHAT_MODE, "Favorite")}
            {createMenuItem(BLOCKED_PREVIEW_CHAT_MODE, "Blocked")}
            {createMenuItem(CATALOG_PREVIEW_CHAT_MODE, "Catalog")}
          </div>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? <CatalogListContainer /> : <DialogListContainer userId={id} />}
      </div>
    );
  };

  return (
    <div className={classNames(styles.chatContainer, { [styles.showChat]: isShow })}>
      {error && <ChatError getData={getPreviewChat} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={id} /> : renderDialogList()}
      <div className={styles.toggleChat} onClick={() => changeChatShow()}>
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

export default Chat;
