import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../firebaseConfig";

const Home = ({ userObj }) => {
  console.log(userObj)
  return (
    <div className="container">
      Recent Documents
    </div>
  );
};
export default Home;
