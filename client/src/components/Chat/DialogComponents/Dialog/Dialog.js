import React, { useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import * as actionCreator from '../../../../actions/actionCreator';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import styles from './Dialog.module.sass';

const Dialog = (props) => {
  const { userId } = props;
  const {
    interlocutor: { id: interlocutorId },
    chatData: { blackList, participants },
    chatData, messages
  } = useSelector(({ chatStore }) => chatStore);
  const { getDialogMessages, clearMessageList } = bindActionCreators(actionCreator, useDispatch());
  const messagesEnd = useRef();

  useEffect(() => {
    getDialogMessages({ interlocutorId });
    return () => clearMessageList();
  }, [interlocutorId]);

  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEnd.current]);

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>,
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(userId === message.sender ? styles.ownMessage : styles.message)}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>{moment(message.createdAt).format('HH:mm')}</span>
          <div ref={messagesEnd} />
        </div>,
      );
    });
    return (
      <div className={styles.messageList}>
        {messagesArray}
      </div>
    );
  };

  const blockMessage = () => {
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return (
      <span className={styles.messageBlock}>{message}</span>
    );
  };


  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {(chatData && blackList.includes(true)) ? blockMessage() : <ChatInput />}
    </>
  );
};

export default Dialog;
