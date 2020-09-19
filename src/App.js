import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Editor from './views/editor';

function App() {
  let routes;

  const [auth, setAuth] = useState(true);

  if (auth) {
    routes = (
      <Switch>
        <Route exact path="/" component={Editor} />
      </Switch>
    );
  } else {
  }
  return (
    <BrowserRouter>
      <div className="App">{routes}</div>
    </BrowserRouter>
  );
}

export default App;
