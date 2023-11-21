// Chat.js
import React, { useState, useEffect } from 'react';
import { useSupabase } from 'react-supabase';

function Chat() {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    if (!user) {
      supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });
    }
  }, [supabase]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error.message);
      }

      setMessages(data ?? []);
    };

    fetchMessages();

    const subscription = supabase
      .from('messages')
      .on('INSERT', (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const { error } = await supabase
      .from('messages')
      .upsert([
        {
          user_id: user.id,
          text: message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error sending message:', error.message);
    }

    setMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.user_id}:</strong> {msg.text}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Please sign in to join the chat.</p>
      )}
    </div>
  );
}

export default Chat;
