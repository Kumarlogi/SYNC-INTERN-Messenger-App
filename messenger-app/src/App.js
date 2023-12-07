import React from 'react';
import './App.css';
import Chat from './components/Chat';
import { Nav } from 'react-bootstrap';
import logo from './assets/images/chatlogo.png';

function App() {
  return (
    <div>
      <Nav className='navbar bg-body-tertiary'>
        <Nav.Item className='ps-5 align-self-start'>
          <img src={logo} alt="Logo" style={{ width : '50px'}}/>
        </Nav.Item>
        <Nav.Item className='col align-self-center ps-3'>
          <h2 className='fs-3' 
              style={{ fontFamily: 'sans-serif', color: '#00A6EA', fontWeight: 'bold'}}>
              Messenger App</h2>
        </Nav.Item>
        <Nav.Item>
          <Chat />
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default App;