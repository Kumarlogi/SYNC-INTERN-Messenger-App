// SignIn.js
import React from 'react';
import { useSupabase } from 'react-supabase';
import { useHistory } from 'react-router-dom';

function SignIn() {
  const supabase = useSupabase();
  const history = useHistory();

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    }

    if (user) {
      history.push('/chat');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
