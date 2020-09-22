import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../firebaseConfig";
import {CircularProgress} from '@material-ui/core';
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
        console.log('statechanged')
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  console.log('App', init)
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          setUserObj={setUserObj}
        />
      ) : (
          <CircularProgress style={{position: 'absolute', top: '50%', left:'50%'}}/>
      )}
    </>
  );
}

export default App;