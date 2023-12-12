import React from 'react';
import './App.css';
import Chat from './components/Chat';
import logo from './img/chatlogo.png';
import Message from './components/Message';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <Router>
      <div className='App'>
        <nav className='nav-bar'>
          <div className='ps-5 align-self-start'>
            <img src={logo} alt="Logo" style={{ width : '50px'}}/>
          </div>
          <div className='col align-self-center ps-3'>
            <h2 className='fs-3' 
                style={{ fontFamily: 'sans-serif', color: '#00A6EA', fontWeight: 'bold'}}>
                Messenger App</h2>
          </div>
          <div>
            <Chat />
          </div>
        </nav>
        <Routes>
          <Route path="/message" element={<Message />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/"  element={<Welcome/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;