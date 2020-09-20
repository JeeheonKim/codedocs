import React, {useState} from "react";
import { Link } from "react-router-dom";
import {NativeSelect} from '@material-ui/core';

const menus = ["home", "createSession"]
const sessions = [undefined, "started", "ended"]

const Navigation = ({userObj}) => {
  const [menu, setMenu] = useState('');
  const [session, setSession] = useState(undefined);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = React.useState(0);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const secondsToHMS = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
  }

  const Timer = ({started}) => {

    console.log('started', started);
  
    const id =React.useRef(null);
    const clear= () => {
        window.clearInterval(id.current);
    }
    React.useEffect(()=>{
       id.current = window.setInterval(()=>{
        setTimer((time) => time-1)
      }, 1000)
      return () => clear();
    },[])
    React.useEffect(()=>{
        if(timer === 0){
          clear()
        }
      },[timer])
  
    const secondsToHMS = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
    
    let i = 0; let options60=[]; let options3=[]; let MenuItem;
    for (i = 0; i < 60; ++i){
        if (i<3) { options3.push(i)}
        options60.push(i)
    }
    const handleChange = (event) => {
        const id = event.target.id
        console.log(id)
        const value = event.target.value
        if (id ==="select-hours"){
            setHour(value);
        } else if (id === "select-minutes"){
            setMinute(value);
        } else {
            setSecond(value);
        }
    };
  
    return !started ? (
        <span className="timer" style={{display: "inline-block"}}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-hours" label="hours" value={hour}>
                            {options3.map((o) => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                    <td>:</td>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-minutes" label="minutes" value={minute}>
                            {options60.map(o => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                    <td>:</td>
                    <td>
                        <NativeSelect onChange={handleChange} id="select-seconds" label="seconds" value={second}>
                            {options60.map(o => {
                                return <option value={o}>{("0" + o).slice(-2)}</option>;
                            })}
                        </NativeSelect>
                    </td>
                </tr>
                </tbody>
            </table>
        </span>
        ): ( <span className="timer" style={{display: "inline-block"}}>
            {secondsToHMS(timer)}
        </span> ) 
  };

  return (
    <nav>
      <Link to="/" className="logo" menu="home" onClick={() => {setSession(undefined); setMenu("home")}}>
        <div style={{fontSize: '2em', textAlign: "center", padding: ".2em", color: '#FF4929', marginRight: '1em'}}>
          <span>👩🏽‍💻</span>
          <span style={{fontSize: '.7em', color: '#FF4929', verticalAlign: "center", fontWeight: '700', lineHeight: '2em', padding:'.35em', }}>CodeDoc</span>
        </div>        
      </Link>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 5}}>
          { !(menu === "createSession") ?
          (
          // not in doc
          <li>
            <Link
              to="/create"
              onClick={() => {
                setSession(undefined); setMenu("createSession"); 
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 12,
                lineHeight: '2em'
              }}
              className="formBtn"
            >
              Start a new session! </Link>
          </li>) : ( 
            // already in doc
            session === undefined ? (
            <>
            <li>
              <Timer started={started}/>
            </li>
            <li>
              <Link
                  onClick={() => {
                    setSession(true);
                    // TODO: triggerTimer
                    setStarted(true);
                    setTimer(hour*60*60+minute*60+second)
                  }}
                  // to="/create/start"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
              <Timer started={started}/>

              {/* <span className='timer' style={{lineHeight: '2.5em', color:'black'}}>
                {secondsToHMS(timer)}
              </span> */}
            </li>
            <li>
              <Link
                  onClick={() => {
                    setSession(undefined);
                    setStarted(false);
                  }}
                  to="/create/submitted"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 12,
                    lineHeight: '2em',
                  }}
                  className="formBtn"
                >
                  Finish session
              </Link>
            </li>
          </>)
        )}
      </ul>
      <a className="authSwitch" style={{lineHeight: '3.5em', margin: '0 0 0 auto', paddingRight: '1em'}}>Share Link</a>
      <div style={{lineHeight: '3.5em', verticalAlign: "center", paddingRight: "1em"}}>
        <span> Hello, {userObj.displayName ? userObj.displayName : "User"} </span>
      </div>
    </nav>
  )
}



export default Navigation;