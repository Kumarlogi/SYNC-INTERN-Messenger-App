import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

function App() {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/chat" component={Chat} />
      <Route path="/signout" component={SignOut} />
    </Router>
  );
}

export default App;
