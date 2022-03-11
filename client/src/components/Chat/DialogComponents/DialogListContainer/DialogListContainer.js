import React from 'react';
import { useSelector } from 'react-redux';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = (props) => {
  const { userId } = props;
  const { messagesPreview } = useSelector(({ chatStore }) => chatStore);
  return <DialogList preview={messagesPreview} userId={userId} />;
};

export default DialogListContainer;
