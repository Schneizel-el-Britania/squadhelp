import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../../../actions/actionCreator';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = () => {
  const { currentCatalog, messagesPreview, catalogList, isShowChatsInCatalog } = useSelector(({ chatStore }) => chatStore);
  const { data: { id } } = useSelector(({ userStore }) => userStore);
  const { getCatalogList, removeChatFromCatalog } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => getCatalogList(), []);

  const removeChatFromCatalogHandle = (event, chatId) => {
    const { _id } = currentCatalog;
    removeChatFromCatalog({ chatId, catalogId: _id });
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { chats } = currentCatalog;
    const dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < chats.length; j++) {
        if (chats[j] === messagesPreview[i]._id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  return (
    <>{
      isShowChatsInCatalog
        ? <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalogHandle}
        />
        : <CatalogList catalogList={catalogList} />
    }</>
  );
};

export default CatalogListContainer;
