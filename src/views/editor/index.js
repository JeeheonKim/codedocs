import React, {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Select,
  Switch,
} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {dbService} from '../../firebaseConfig';
import {purple} from '@material-ui/core/colors';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
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
  },
  codeMirror: {
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    padding: '20px',
    fontSize: '20px',
    minWidth: '700px',
    fontSize: '1em',
  },
  formControlGroup: {
    border: '2px solid white',
    borderRadius: '10px',
    padding: '.4em',
  },
  formControl: {
    minWidth: '110px',
  },
  selectGroup: {
    borderRadius: '10px',
    paddingLeft: '1em',
  },
  formControlLabel: {
    height: '2em',
    color: 'white',
  },
  label: {
    color: 'white',
    margin: '10px',
  },
  LangInput: {
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const getDataFromFirestore = async (id) => {
  let x = '';
  await dbService
    .collection('docs')
    .doc(id)
    .get()
    .then((ref) => {
      x = ref.data();
    })
    .catch((err) => console.log('err occured', err));
  return x;
};

const Editor = (props) => {
  const {id} = useParams();
  const [highlight, setHighlight] = useState(true);
  const [theme, setTheme] = useState('material');
  const [lang, setLang] = useState('Javascript');
  const [save, setSave] = useState(true);
  const [code, setCode] = useState(
    `import Greeting from 'greetings.js';\n\nconsole.log("hello there", Greeting);`
  );

  useEffect(() => {
    dbService
      .collection('docs')
      .doc(id)
      .onSnapshot((doc) => {
        let data = doc.data();
        setLang(data.language);
        setCode(data.content);
        setHighlight(data.syntax_highlighting);
      });
  }, []);

  useEffect(() => {
    syncWithFirestore();
  }, [code]);
  const syncWithFirestore = async () => {
    let x = save;
    console.log('hee', x);
    if (!save) {
      console.log('hee');
      await dbService.collection('docs').doc(id).update({
        theme,
        syntax_highlighting: highlight,
        language: lang,
        content: code,
      });
      setSave(true);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <h2 className={classes.heading}>Welcome to editor</h2> */}
      <div className={[classes.formControlGroup, 'toolbar'].join(' ')}>
        <FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <div style={{paddingLeft: '1em'}}>
                <PurpleSwitch
                  checked={highlight}
                  onChange={() => {
                    setHighlight(!highlight);
                    setSave(false);
                  }}
                  name="syntaxHighlight"
                />
                <span style={{lineHeight: '2em'}}>Syntax Highlighting</span>
              </div>
            }
          />
        </FormControl>
        <div className={classes.selectGroup}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label}>Language</InputLabel>
            <Select
              className={classes.LangInput}
              id="demo-simple-select"
              value={lang}
              onChange={(newVal) => {
                if (highlight) {
                  setLang(newVal.target.value);
                  setSave(false);
                }
              }}
            >
              <MenuItem value={'Javascript'}>Javascript</MenuItem>
              <MenuItem value={'Python'}>Python</MenuItem>
              <MenuItem value={'C'}>C</MenuItem>
              <MenuItem value={'C++'}>C++</MenuItem>
              <MenuItem value={'Java'}>Java</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label}>Theme</InputLabel>
            <Select
              className={classes.LangInput}
              value={theme}
              onChange={(newVal) => {
                setTheme(newVal.target.value);
              }}
            >
              <MenuItem value={'material'}>Material</MenuItem>
              <MenuItem value={'dracula'}>Dracula</MenuItem>
              <MenuItem value={'monokai'}>Monokai</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {console.log(save)}
      <div className="saving">{save ? 'Saved' : 'Saving...'}</div>
      <div className={`Editor ${classes.Editor}`}>
        <CodeMirror
          className={`code-mirror-container ${classes.codeMirror}`}
          value={code}
          options={{
            lineNumbers: true,
            mode: highlight ? MODES.getMode(lang) : 'text/plain',
            theme: theme,
            scrollbarStyle: null,
            indentUnit: 2,
            indentWithTabs: true,
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, code) => {
            setCode(code);
            setSave(false);
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
