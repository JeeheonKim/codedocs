import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ userObj }) => (
  <nav style={{display: 'flex', backgroundColor: 'black'}}>
    <Link to="/" style={{ marginRight: 10 }}>
      <div style={{fontSize: '2em', textAlign: "center", padding: ".2em", color: '#FF4929'}}>
        <span>👩🏽‍💻</span>
        <span style={{fontSize: '.7em', color: '#FF4929', verticalAlign: "center", fontWeight: '700', lineHeight: '2em', padding:'.35em', }}>CodeDoc</span>
      </div>        
    </Link>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 5,}}>
      <li>
        <Link
          to="/create"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
            lineHeight: '2em'
          }}
          className="formBtn"
        >
          Start a new session!
        </Link>
      </li>
      <li>
        Hello, {userObj.displayName}
      </li>
    </ul>
  </nav>
);

export const EditorNavigation = ({ userObj }) => (
  <nav style={{display: 'flex', backgroundColor: 'black'}}>
    <Link to="/" style={{ marginRight: 10 }}>
      <div style={{fontSize: '2em', textAlign: "center", padding: ".2em", color: '#FF4929'}}>
        <span>👩🏽‍💻</span>
        <span style={{fontSize: '.7em', color: '#FF4929', verticalAlign: "center", fontWeight: '700', lineHeight: '2em', padding:'.35em', }}>CodeDoc</span>
      </div>        
    </Link>
    <div  style={{padding: ".2em"}}>
          <input value="New Session" onfocus="this.value=''" style={{lineHeight: '2em', padding:'.35em', verticalAlign: 'center'}}>
          </input>
    </div>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 5,}}>
      <li className="timer">
        00:00:00
      </li>
      <li>
        <Link
            to="/create/submit"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
              lineHeight: '2em',
            }}
            className="formBtn"
          >
            End session
        </Link>
      </li>
      <li>
        Hello, {userObj.displayName}
      </li>
    </ul>
  </nav>
);

export default Navigation;