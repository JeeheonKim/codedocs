import React, {useState, useEffect} from 'react';
import {dbService, storageService} from '../firebaseConfig';
import {List, ListItem, ListSubheader, ListItemText} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
  },
  listItemSelected:{
    backgroundColor: "#ff0000",
  },
});

const Home = ({userObj}) => {
  const [docs, setDocs] = useState([]);
  if (userObj){
    dbService
      .collection("users")
      .doc(userObj.uid)
      .get().then( (result) => {
        setDocs(result.data().docs)
      })
  }
  const classes = useStyles();
  return (
    <div className="container">
      <List className={classes.root} subheader={<li />}>
        {docs.map((sectionId) => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul} >
              <a href={`/#/doc/${sectionId}`}>
                <ListItem key={`item-${sectionId}`}>
                  <ListItemText primary={`${sectionId}`} />
                </ListItem>
              </a>
            </ul>
          </li>
        ))}
      </List>
    </div>
  );
};
export default Home;
