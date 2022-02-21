import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actionCreator from '../../actions/actionCreator';
import Logo from '../Logo';
import CONSTANTS from '../../constants';
import styles from './Header.module.sass';

const Header = (props) => {
  const { history } = props;
  const { data, isFetching } = useSelector(({ userStore }) => userStore);
  const { headerRequest: getUser, clearUserStore } = bindActionCreators(actionCreator, useDispatch());

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    history.replace('/login');
  };

  const startContests = () => {
    history.push('/startContest');
  };

  const menuItemsRender = (item) => (
    <li key={item.title}>{
      item.logOut ?
        <span onClick={logOut}>{item.title}</span> :
        <Link to={item.href} >
          <span>{item.title}</span>
        </Link>
    }</li>
  );
  
  const authItemsRender = (item) => (
    <Link key={item.title} to={item.href} >
      <span className={styles.btn}>{item.title}</span>
    </Link>
  );

  const navItemsRender = (item) => (
    <li key={item.title}>
      <span>{item.title}</span>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <ul>{
        item.items.map((item) =>
          <li key={item.value} className={item.selected && styles.last}>
            <a href={item.href}>{item.value}</a>
          </li>
        )
      }</ul>
    </li>
  );

  const listRender = (type, func) => CONSTANTS.HeaderItems[type].map((item) => func(item));

  const renderLoginButtons = () => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={data.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${data.avatar}`}
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
            <ul>{listRender('menu', menuItemsRender)}</ul>
          </div>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt="email" />
        </>
      );
    }
    return (listRender('auth', authItemsRender));
  };

  if (isFetching) { return null; }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
        <a href="#">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <a href="tel:+(877)355-3585">(877)355-3585</a>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} alt="logo" className={styles.logo} />
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>{listRender('nav', navItemsRender)}</ul>
          </div>
          {data && data.role !== CONSTANTS.CREATOR
            && <div className={styles.startContestBtn} onClick={startContests}>START CONTEST</div>}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
