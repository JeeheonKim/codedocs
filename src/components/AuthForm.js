import React, { useState } from "react";
import { authService } from "../firebaseConfig";
import {Input, Button} from '@material-ui/core'

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        ).then( (user)=> {
          //Login is triggered --> line 4 in app.js
          user.sendEmailVerification(); //Send email verification
          console.log('succss'); //Show success message
          authService.signOut(); //Logout is triggered --> line 16 in app.js
        } );
      } else {
        let user = authService.currentUser;
        if(!user.isEmailVerified()){
          console.log("Email is verified");
          return
        }
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="authFormContainer">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
          autoComplete="on"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
          autoComplete="on"
        />
        <Input
          type="submit"
          className="authInput authSubmit"
          id="authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;