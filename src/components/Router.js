import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation, {EditorNavigation} from './Navigation';
import Editor from '../views/editor';
import Session from './Session';

const AppRouter = ({refreshUser, isLoggedIn, userObj, currentLink}) => {
  console.log(isLoggedIn);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <div
                style={{
                  maxWidth: 890,
                  width: '100%',
                  margin: '0 auto',
                  marginTop: 80,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Home userObj={userObj} />
              </div>
            </Route>
            <Route exact path="/doc/:id">
              <Session />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
