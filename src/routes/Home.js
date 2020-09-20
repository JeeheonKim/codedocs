import React, {useState, useEffect} from 'react';
import {dbService, storageService} from '../firebaseConfig';

const Home = ({userObj}) => {
  console.log(userObj);
  return (
    <div className="container">
      <table>
        <tr>
          <td>Recent Document</td>
        </tr>
        <tr>
          <td>Dynamic Programming</td>
          <td>Interviewed on 2020-09-19</td>
          <td>Last Seen 2021-01-01</td>
        </tr>
      </table>
    </div>
  );
};
export default Home;
