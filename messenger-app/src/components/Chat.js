import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import google from '../assets/images/Google.svg';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null); // Ensure the user state is set to null as well
  };

  return (
    <div>
      {profile ? (
        <div>
          <Dropdown className='dropdown-end'>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className='rounded-5 rounded-top'>
              <img src={profile.picture} alt="user image" 
                className='rounded-circle mx-auto d-block border border-4 border-warning' 
                  style={{ width: '60px' }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <h3>User Logged in</h3>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <p>Name: {profile.name}</p>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <p>Email Address: {profile.email}</p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">
                <div onClick={logOut}>Log out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <div>
          <button onClick={() => login()} class="btn btn-light rounded-5 rounded-top">
            <img src={google} alt='google' 
              style={{ height: '30' }} />
            <div className='fs-5' 
              style={{ fontFamily: 'sans-serif', color: '#E3BE15', fontWeight: 'bold'}}>
              Login
            </div>
          </button>
          {login.loading && <p>Loading...</p>}
          {login.error && <p>Login Failed. Please try again.</p>}
        </div>
      )}
    </div>
  );
};

export default Chat;