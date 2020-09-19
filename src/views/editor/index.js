import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  heading: {
    color: 'white',
  },
  Editor: {
    display: 'inline-block',
    width: '80%',
  },
  codeMirror: {
    display: 'flex',
    height: '400px !important',
    flexDirection: 'column',
    padding: '20px',
    fontSize: '20px',
  },
});

const Editor = () => {
  const [code, setCode] = useState('hello');
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Welcome to editor</h2>
      <div className={`Editor ${classes.Editor}`}>
        <CodeMirror
          className={`code-mirror-container ${classes.codeMirror}`}
          value={code}
          options={{
            lineNumbers: true,
            mode: 'javascript',
            theme: 'material',
            scrollbarStyle: null,
            indentUnit: 2,
            indentWithTabs: true,
          }}
          onBeforeChange={(editor, data, code) => {
            setCode(code);
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
