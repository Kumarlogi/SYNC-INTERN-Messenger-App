// SignOut.js
import React from 'react';
import { useSupabase } from 'react-supabase';
import { useHistory } from 'react-router-dom';

function SignOut() {
  const supabase = useSupabase();
  const history = useHistory();

  const signOut = async () => {
    await supabase.auth.signOut();
    history.push('/');
  };

  return (
    <button onClick={signOut}>Sign Out</button>
  );
}

export default SignOut;
