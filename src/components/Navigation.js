import {Link, useHistory} from 'react-router-dom';
import {authService, dbService, firebaseInstance} from '../firebaseConfig';
import React, {useState} from 'react';
import {NativeSelect, Button, ButtonBase, ButtonGroup, Menu, MenuItem} from '@material-ui/core';
import {NavLogo} from './Logo';

const addDocToFireStore = async (id) => {
  let docId, docRef;
  try {
    docId = dbService.collection('docs').doc().id;
    docRef = await dbService
      .collection('docs')
      .doc(docId)
      .set({
        title: 'Untitled',
        content: '',
        language: 'Javascript',
        syntax_highlighting: true,
        users: [
          {
            access: 'owner',
            userId: id,
          },
        ],
        createdAt: Date.now(),
      });
      await dbService
      .collection('users').doc(id).update({
        docs: firebaseInstance.firestore.FieldValue.arrayUnion(docId)
      })
  
  } catch (err) {
    console.log('error occured', err);
  }
  return docId;
};

const sessions = [undefined, 'started', 'ended'];

const Navigation = ({userObj, setLoggedIn, setUserObj}) => {
  const [session, setSession] = useState(undefined); //undefined, false, true
  const [timer, setTimer] = React.useState(0);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const secondsToHMS = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    return (
      ('0' + h).slice(-2) +
      ':' +
      ('0' + m).slice(-2) +
      ':' +
      ('0' + s).slice(-2)
    );
  };

  const Timer = ({started}) => {
    const id = React.useRef(null);
    const clear = () => {
      window.clearInterval(id.current);
    };
    React.useEffect(() => {
      id.current = window.setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
      return () => clear();
    }, []);
    React.useEffect(() => {
      if (timer === 0) {
        clear();
      }
    }, [timer]);

    const secondsToHMS = (d) => {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);
      const timeObj = {'hour': h, 'minute': m, 'second':s}
      //TODO: timeObj to select object
      return (
        ('0' + h).slice(-2) +
        ':' +
        ('0' + m).slice(-2) +
        ':' +
        ('0' + s).slice(-2)
      );
    };

    let i = 0;
    let options60 = [];
    let options3 = [];
    for (i = 0; i < 60; ++i) {
      if (i < 3) {
        options3.push(i);
      }
      options60.push(i);
    }
    const handleChange = (event) => {
      const id = event.target.id;
      const value = event.target.value;
      if (id === 'select-hours') {
        setHour(value);
      } else if (id === 'select-minutes') {
        setMinute(value);
      } else {
        setSecond(value);
      }
    };

    return (session === undefined)? (
      <span></span>
    ) : ( (session === false) ? (
      <span className="timer" style={{display: 'inline-block'}}>
        <table>
          <tbody>
            <tr>
              <td>
                <NativeSelect
                  onChange={handleChange}
                  id="select-hours"
                  label="hours"
                  value={hour}
                >
                  {options3.map((o) => {
                    return <option value={o}>{('0' + o).slice(-2)}</option>;
                  })}
                </NativeSelect>
              </td>
              <td>:</td>
              <td>
                <NativeSelect
                  onChange={handleChange}
                  id="select-minutes"
                  label="minutes"
                  value={minute}
                >
                  {options60.map((o) => {
                    return <option value={o}>{('0' + o).slice(-2)}</option>;
                  })}
                </NativeSelect>
              </td>
              <td>:</td>
              <td>
                <NativeSelect
                  onChange={handleChange}
                  id="select-seconds"
                  label="seconds"
                  value={second}
                >
                  {options60.map((o) => {
                    return <option value={o}>{('0' + o).slice(-2)}</option>;
                  })}
                </NativeSelect>
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    ) : (
      <span className="timer" style={{display: 'inline-block'}}>
        {secondsToHMS(timer)}
      </span>
    ))
  };

  const handleClick = async (e) => {
    let op = await addDocToFireStore(userObj.uid);
    return op;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickForSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseForSetting = () => {
    setAnchorEl(null);
  };

  const handleClickForLogout = () => {
    setUserObj(null);
    authService.signOut();
  }

  const history = useHistory();
  return (
    <nav>
      <Link
        to="/"
        className="logo"
        onClick={() => {
          setSession(undefined);
        }}
      >
        <NavLogo/>
      </Link>
      <ul style={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
        {(session === undefined) ? (
          // not in doc
          <li>
            <button
              onClick={async (e) => {
                setSession(false);
                let id = await handleClick(e);
                history.push(`/doc/${id}`);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 12,
                lineHeight: '2em',
              }}
              className="navBtn"
            >
              Create a new session!
            </button>
          </li>
        ) : (// already in doc
        <>
        <li>
          <Timer started={session}/>
        </li>
        {(session === false) ? (
          <>
            <li>
              <Link
                onClick={() => {
                  setSession(true);
                  // TODO: triggerTimer
                  setTimer(hour * 60 * 60 + minute * 60 + second);
                }}
                // to="/create/start"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: 12,
                  lineHeight: '2em',
                }}
                className="formBtn"
              >
                Start session
              </Link>
            </li>
          </>
        ) : (
          // after start
          <>
            <li>
              <button
                onClick={() => {
                  setSession(undefined);
                }}
                to="/"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: 12,
                  lineHeight: '2em',
                }}
                className="navBtn"
              >
                Finish session
              </button>
            </li>
          </>
        )}
        </>
        )}
      </ul>
      <a
        className="authSwitch"
        style={{lineHeight: '3.5em', margin: '0 0 0 auto', paddingRight: '1em'}}
      >
        Share Link
      </a>
      <div
        style={{
          lineHeight: '3.5em',
          verticalAlign: 'center',
        }}
      >
        <span>
          {' '}
          Hello, {userObj.displayName ? userObj.displayName : 'User'}
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickForSetting} style={{fontSize: '1.5em', }}>
            ⚙️
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseForSetting}
          >
            {/* <MenuItem onClick={handleCloseForSetting}>Profile</MenuItem>
            <MenuItem onClick={handleCloseForSetting}>My account</MenuItem> */}
            <MenuItem onClick={handleClickForLogout}>Logout</MenuItem>
          </Menu>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
