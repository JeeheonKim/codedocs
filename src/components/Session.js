import React, { useState, useEffect } from "react";
import Editor from '../views/editor';
import {dbService} from '../firebaseConfig';
import { Input, Button, TextField, MenuItem, NativeSelect} from '@material-ui/core';

const Session = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', marginTop: '1.5em'}} className="fullScreen">
            <SessionLeftPanel/>
            <div style={{marginTop: '1em',  width: '100%'}}>
                <Editor/>
            </div>
        </div>
    )
}

const SessionLeftPanel = () => {
    const [navItem, setNavItem] = useState("problem");
    const BlockListItem = ({text, navItem}) => (
        <li style={{width: '6em', lineHeight: '3em', fontWeight: '700', borderBottom: '1px solid #5CDB95', textAlign: 'center', marginRight: '1em'}}>
            <Button onClick={() => {setNavItem(navItem)}} style={{cursor: 'pointer', background: 'transparent', textDecoration: 'none', color: 'white', border: 'none' }}>
                {text}
            </Button>
        </li>
    )
    return( 
    <div style={{display: 'flex', alignItems: 'normal', backgroundColor: '#191919'}}>
        <ul>
            <BlockListItem text="Problem" navItem="problem" />
            <BlockListItem text="Feedback" navItem="feedback"/>
        </ul>
        {navItem === "problem"? (
            <div id="problemText">
                <textarea placeholder="Write a problem..."/>
                <a className="authSwitch" href="#" style={{display:'block',  margin: '1em'}} >See attachment</a>
            </div>):(
            <div id="FeedbackText">
                <textarea placeholder="Give feedback on interviewee..."/>
                <a className="authSwitch" href="#" style={{display:'block',  margin: '1em'}} >See attachment</a>
            </div>)
        }
    </div>)
}



export default Session;