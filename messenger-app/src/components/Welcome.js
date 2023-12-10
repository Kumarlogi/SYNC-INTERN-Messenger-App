import React from "react";
import { Card, Button } from "react-bootstrap";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import minions from '../img/funny_minions.gif';
import GoogleSignin from "../img/Google.svg";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="welcome">
      <Card className="container-fluid text-center" style={{ height: '38.6rem', maxWidth: '70%', border: 'none' }}>
        <div>
          <Card.Img alt="Minions" src={minions} style={{ width: 400, marginTop: 50 }} />
        </div>
        <Card.Body>
          <Card.Title className='fs-1' style={{ fontFamily: 'Tahoma', color: '#800080' }}>Welcome to Messenger App</Card.Title>
          <br />
          <Card.Text className='fs-4' style={{ fontFamily: 'Verdana', color: '#1f7a1f' }}>
            Sign in now – because in our chat world, every typo is a potential plot twist,
            and every emoji is a character with a story to tell! 📖😜
          </Card.Text>
          <Button className="sign-in">
            <img
              onClick={googleSignIn}
              src={GoogleSignin}
              alt="sign in with google"
              type="button"
            />
          </Button>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Welcome;
