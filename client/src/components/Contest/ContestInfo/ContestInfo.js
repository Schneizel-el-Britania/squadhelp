import React from 'react';
import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';
import CONSTANTS from '../../../constants';
import styles from '../../Brief/Brief.module.sass';
import ContestInfoItem from './ContestInfoItem';

const ContestInfo = (props) => {
  const { changeEditContest, userId, contestData, role, goChat } = props;
  const { typeOfTagline, brandStyle, typeOfName, styleName, contestType,
    title, focusOfWork, targetCustomer, industry, originalFileName,
    fileName, User, status } = contestData;

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <ContestInfoItem label="Contest Type" data={contestType} />
          {(User.id === userId && status !== CONSTANTS.CONTEST_STATUS_FINISHED) &&
            <div onClick={() => changeEditContest(true)} className={styles.editBtn}>Edit</div>}
          {role !== CONSTANTS.CUSTOMER && <i onClick={goChat} className="fas fa-comments" />}
        </div>
        <ContestInfoItem label="Title of the Project" data={title} />
        {contestType === CONSTANTS.NAME_CONTEST &&
          <NameContestSpecialInfo typeOfName={typeOfName} styleName={styleName} />}
        {contestType === CONSTANTS.TAGLINE_CONTEST &&
          <TaglineContestSpecialInfo
            typeOfTagline={typeOfTagline}
            nameVenture={contestData.nameVenture}
          />}
        {contestType === CONSTANTS.LOGO_CONTEST &&
          <LogoContestSpecialInfo brandStyle={brandStyle} nameVenture={contestData.nameVenture} />}
        <ContestInfoItem label="What is your Business/ Brand about?" data={focusOfWork} />
        <ContestInfoItem label="Description target customers of company" data={targetCustomer} />
        <ContestInfoItem label="Industry  of company" data={industry} />
        {originalFileName && <ContestInfoItem
          originalFileName={originalFileName}
          fileName={fileName}
          label="Additional File"
        />}
      </div>
    </div>
  );
};

export default ContestInfo;
