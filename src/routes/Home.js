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
  listItem: {
    border: '1px solid grey'
  }
});

const Home = ({userObj}) => {
  const [docs, setDocs] = useState([]);
  const [docsTitle, setDocsTitle] = useState([]);

  const docIdsToTitles = () => {
    const titles = []
    docs.forEach((doc)=> {
      console.log('doc inside docIdsToTitles', doc)
      const aDoc = dbService.collection("docs").doc(doc).get();
      const title = aDoc.data().title;
      titles.push(title)
    });
    console.log('docIdsTitles called')
    console.log('ㄴ docs ', docs)
    console.log('ㄴ returned titles ', titles)
    return titles;
  }
  useEffect( ()=>{
    const aDocs = [];
    const userRef = dbService
      .collection("users")
      .doc(userObj.uid);
    if (!userRef.exists){
      console.log('no such document!')
    } else {
      aDocs = userRef.data().docs;
      setDocs(aDocs)
    }
    console.log('aDocs',aDocs)
    // aDocs.forEach(
      
    // )
  }, []);
  const classes = useStyles();
  var titles = docIdsToTitles();
  console.log('before return titles', titles)
  console.log('before return titles[0]', titles[0])
  return (
    <div className="container">
      <List className={classes.root} subheader={<li />}>
        {
        docs.map( (doc, i) => {
          if (doc !== undefined){
            console.log('titles type', typeof titles)
            console.log('titles', titles)
            console.log('titles[0]', titles[0])
            console.log('titles[1]', titles[1])

            return (
              <li key={`section-${doc}`} className={classes.listSection}>
                  <a href={`/#/doc/${doc}`}>
                    <ListItem className={classes.listItem} key={`item-${doc}`}>
                      <ListItemText primary={`${titles[i]}`} />
                    </ListItem>
                  </a>
              </li>
            )
          }
        })}
      </List>
      <div className="announcements">
        <b>Soon-to-be-coming Features</b>
        <ol>
          <li>
            Deleting your session
          </li>
          <li>
            Sharing your session with your friend
          </li>
        </ol>
      </div>
    </div>
  );
};
export default Home;
