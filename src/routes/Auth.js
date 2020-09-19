import React from "react";
import { authService, firebaseInstance } from "../firebaseConfig";
import AuthForm from "../components/AuthForm";
import Button from "@material-ui/core/Button"

const onGoogleClick = async () => {
  const provider = new firebaseInstance.auth.GoogleAuthProvider();
  await authService.signInWithPopup(provider)
    .catch((e)=> console.log(e));
};

const onGithubClick = async () => {
  const provider = new firebaseInstance.auth.GithubAuthProvider();
  await authService.signInWithPopup(provider)
    .catch((e)=> console.log(e));
};

const Auth = () => {
  return (
    <div className="authContainer">
      <div style={{marginBottom: '.5em'}}>
        <div style={{fontSize: '4em', textAlign: "center", padding: ".2em"}}>
          <span role="img">👩🏽‍💻</span>
        </div>
        <h1 style={{fontSize: '2em', color: '#FF4929', textAlign: "center", fontWeight: '700'}}>CodeDoc</h1>
        <h2 style={{fontSize: '12px', color: '#FF4929', fontWeight: '300'}}>Practice coding interviews with your peers</h2>
      </div>
      <AuthForm/>
      <div className="authBtns">
        <GoogleSignInButton/>
        <GithubSignInButton/>      
      </div>
    </div>
  );
};

const GoogleSignInButton = () => (
  <Button name="google" onClick={onGoogleClick} variant="outlined" style={{backgroundColor:"white", marginBottom:'.5em'}}>
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/> Continue with Google
  </Button>
)

const GithubSignInButton = () => (
  <Button name="github" onClick={onGithubClick} variant="outlined" style={{backgroundColor:"white"}}>
    <img className="github-icon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" /> Continue with Github
  </Button>
)

export default Auth;