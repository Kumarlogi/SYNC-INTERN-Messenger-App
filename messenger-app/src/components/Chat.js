import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import google from '../img/Google.svg';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Login Success:', codeResponse);
      setUser(codeResponse);
      navigate('/chatbox');
    },
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
    navigate('/');
  };

  return (
    <div>
      {profile ? (
        <div>
          <Dropdown className='dropdown-end'>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className='rounded-5 rounded-circle'>
              <img src={profile.picture} alt="user image" 
                className='rounded-circle mx-auto d-block border border-3 border-warning ' 
                  style={{ width: '40px' }}
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
          <button onClick={() => login()} 
              className="btn btn-light rounded-5 rounded-top"
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables.">
            <img src={google} alt='google' 
              style={{ height: '30' }} />
            <div className='fs-5' 
              style={{ fontFamily: 'sans-serif', color: '#E3BE15', fontWeight: 'bold'}}>
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