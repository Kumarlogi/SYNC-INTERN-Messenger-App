// SignIn.js
import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Access environment variables
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;

    // Implement your sign-in logic using the API key and URL
    // For example, make a fetch request to the authentication endpoint

    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle the response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  

  return (
    <div>
      <h1>Sign In</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
