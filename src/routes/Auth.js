import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "../firebaseConfig";
import AuthForm from "../components/AuthForm";
import Button from "@material-ui/core/Button"

const Auth = () => {
  console.log('In Auth')
  const onSocialClick = async (event) => {
    console.log(event)
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="authContainer">
      <div style={{marginBottom: '.5em'}}>
        <div style={{fontSize: '4em', textAlign: "center", padding: ".2em"}}>
        👩🏽‍💻
        </div>
        <h1 style={{fontSize: '2em', color: '#FF4929', textAlign: "center", fontWeight: '700'}}>CodeDoc</h1>
        <h2 style={{fontSize: '12px', color: '#FF4929', fontWeight: '300'}}>Practice coding interviews with your peers</h2>
      </div>
      <AuthForm/>
      <div className="authBtns">
        <GoogleSignInButton onClick={onSocialClick}/>
        <GithubSignInButton onClick={onSocialClick}/>        
      </div>
    </div>
  );
};

const GoogleSignInButton = () => (
  <Button name="google" variant="outlined" style={{backgroundColor:"white", marginBottom:'.5em'}}>
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/> Continue with Google
  </Button>
)

const GithubSignInButton = () => (
  <Button name="github" variant="outlined" style={{backgroundColor:"white"}}>
    <img class="github-icon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" /> Continue with Github
  </Button>
)

export default Auth;