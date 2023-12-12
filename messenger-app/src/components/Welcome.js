import React from "react";
import { Card } from "react-bootstrap";
import minions from '../img/funny_minions.gif';
import GoogleSignin from "../img/Google.svg";
import Chat from "./Chat";

const Welcome = () => {
  
  return (
    <main className="App welcome">
      <Card className="container-fluid text-center">
        <div>
          <Card.Img alt="Minions" src={minions} style={{ width: 400, marginTop: 50 }} />
        </div>
        <Card.Body>
          <Card.Title className='fs-1'>Welcome to Messenger App</Card.Title>
          <br />
          <Card.Text className='fs-4'>
            Sign in now – because in our chat world, every typo is a potential plot twist,
            <br /> and every emoji is a character with a story to tell! 📖😜
          </Card.Text>
          <br/><br/>
          <Chat/>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Welcome;
