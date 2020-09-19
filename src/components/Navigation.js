import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          <div style={{fontSize: '4em', textAlign: "center", padding: ".2em"}}>
          👩🏽‍💻
          </div>        
        </Link>
      </li>
      <li>
        <Link
          to="/document/:id"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
          className="formBtn"
        >
          Start a new session!
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;