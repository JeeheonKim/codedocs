import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation, {EditorNavigation} from './Navigation';
import Editor from '../views/editor';

const AppRouter = ({refreshUser, isLoggedIn, userObj, currentLink}) => {
  console.log(isLoggedIn);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
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
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/doc/:id">
              <Editor />
            </Route>
          </div>
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
