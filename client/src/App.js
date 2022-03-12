import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ContestPage from './pages/ContestPage/ContestPage';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import UserProfile from './pages/UserProfile/UserProfile';
import Home from './pages/Home/Home';
import PrivateHoc from './components/HOCs/PrivateHoc/PrivateHoc';
import OnlyNotAuthorizedUserHoc from './components/HOCs/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import browserHistory from './browserHistory';
import NotFound from './components/NotFound/NotFound';
import CONSTANTS from './constants';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router history={browserHistory}>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={OnlyNotAuthorizedUserHoc(LoginPage)} />
      <Route exact path="/registration" component={OnlyNotAuthorizedUserHoc(RegistrationPage)} />
      <Route exact path="/payment" component={PrivateHoc(Payment)} />
      <Route exact path="/startContest" component={PrivateHoc(StartContestPage)} />
      <Route
        exact
        path="/startContest/nameContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.NAME_CONTEST,
          title: 'Company Name',
        })}
      />
      <Route
        exact
        path="/startContest/taglineContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.TAGLINE_CONTEST,
          title: 'TAGLINE',
        })}
      />
      <Route
        exact
        path="/startContest/logoContest"
        component={PrivateHoc(ContestCreationPage, {
          contestType: CONSTANTS.LOGO_CONTEST,
          title: 'LOGO',
        })}
      />
      <Route exact path="/dashboard" component={PrivateHoc(Dashboard)} />
      <Route exact path="/contest/:id" component={PrivateHoc(ContestPage)} />
      <Route exact path="/account" component={PrivateHoc(UserProfile)} />
      <Route component={NotFound} />
    </Switch>
    <ChatContainer />
  </Router>
);

export default App;
