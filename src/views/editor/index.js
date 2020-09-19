import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import MODES from './modes';

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
  formControl: {
    minWidth: 120,
    border: '2px solid white',
    borderRadius: '10px',
    padding: '10px',
  },
  label: {
    color: 'white',
    margin: '10px',
  },
  LangInput: {
    color: 'white',
  },
});

const Editor = () => {
  const [lang, setLang] = useState('Javascript');
  const [code, setCode] = useState(
    `import Greeting from 'greetings.js';\n\nconsole.log("hello there",Greeting);`
  );
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Welcome to editor</h2>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Language</InputLabel>
        <Select
          className={classes.LangInput}
          id="demo-simple-select"
          value={lang}
          onChange={(newVal) => {
            setLang(newVal.target.value);
          }}
        >
          <MenuItem value={'Javascript'}>Javascript</MenuItem>
          <MenuItem value={'Python'}>Python</MenuItem>
          <MenuItem value={'C'}>C</MenuItem>
          <MenuItem value={'C++'}>C++</MenuItem>
          <MenuItem value={'Java'}>Java</MenuItem>
        </Select>
      </FormControl>
      <div className={`Editor ${classes.Editor}`}>
        <CodeMirror
          className={`code-mirror-container ${classes.codeMirror}`}
          value={code}
          options={{
            lineNumbers: true,
            mode: MODES.getMode(lang),
            theme: 'material',
            scrollbarStyle: null,
            indentUnit: 2,
            indentWithTabs: true,
            lineWrapping: true,
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
