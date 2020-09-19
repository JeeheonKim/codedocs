import React, {useState, useEffect} from 'react';
import {dbService, storageService} from '../firebaseConfig';
import Editor from '../views/editor';
const Home = ({userObj}) => {
  console.log('at Home');
  return (
    <div className="container">
      <Editor />
    </div>
  );
};
export default Home;
