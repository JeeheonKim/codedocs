import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../firebaseConfig";

const Home = ({ userObj }) => {
  console.log(userObj)
  return (
    <div className="container">
      Hello 
    </div>
  );
};
export default Home;