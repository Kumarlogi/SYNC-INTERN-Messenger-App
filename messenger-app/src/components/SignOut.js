// SignOut.js
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function SignOut() {
    const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
    const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const navigate = useNavigate();

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate.push('/');
    };

    <Outlet/>

  return (
    <button onClick={signOut}>Sign Out</button>
  );
}

export default SignOut;
