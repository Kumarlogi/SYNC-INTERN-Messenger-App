// SignIn.js
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function SignIn() {
    const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
    const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
          const { user, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
          });
      
          if (error) {
            console.error('Error signing in with Google:', error.message);
          }
      
          if (user) {
            // Redirect or navigate to the chat page
            // Example using react-router-dom
            navigate.push('/chat');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      <Outlet/>
      

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
