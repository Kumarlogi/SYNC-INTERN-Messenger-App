import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SignIn/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/signout" element={<SignOut/>} />
      </Routes>
      <Outlet/>
    </Router>
  );
}

export default App;
