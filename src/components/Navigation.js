import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          <div style={{fontSize: '2em', textAlign: "center", padding: ".2em"}}>
            <span>👩🏽‍💻</span>
          </div>        
        </Link>
      </li>
      <li>
        <input>
          New Session
        </input>
      </li>
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
export default Navigation;