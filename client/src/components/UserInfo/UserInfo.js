import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import * as actionCreator from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const UserInfo = () => {
  const { data, data: { avatar, role } } = useSelector(({ userStore }) => userStore);
  const { isEdit } = useSelector(({ userProfile }) => userProfile);
  const { updateUserData, changeEditModeOnUserProfile } = bindActionCreators(actionCreator, useDispatch());

  const updateUserDataHandle = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    updateUserData(formData);
  };

  const getInfoBlock = (values) => (
    <div key={values.label} className={styles.infoBlock}>
      <span className={styles.label}>{values.label}</span>
      <span className={styles.info}>{values.name}</span>
    </div>
  );

  const displayUserInfo = () =>
    CONSTANTS.UserInfoItems.map((values) => {
      const { label, name, onlyCreator } = values;
      if (!label || (role !== CONSTANTS.CREATOR && onlyCreator)) return;
      return (onlyCreator ? getInfoBlock({ label, name: data[name] + '$' }) : getInfoBlock({ label, name: data[name] }));
    });

  return (
    <div className={styles.mainContainer}>
      {isEdit ? <UpdateUserInfoForm onSubmit={updateUserDataHandle} />
        : (
          <div className={styles.infoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
              className={styles.avatar}
              alt="user"
            />
            <div className={styles.infoContainer}>{displayUserInfo()}</div>
          </div>
        )}
      <div
        onClick={() => changeEditModeOnUserProfile(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
};

export default UserInfo;
