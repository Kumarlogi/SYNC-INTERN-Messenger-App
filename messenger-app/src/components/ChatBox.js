import React, { useEffect, useRef, useState } from "react";
import { Firestore } from "@google-cloud/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    // Path to the service account key file downloaded from the Google Cloud Console
    const serviceAccountKey = require("../client_secret_367515410868-aiejbe213c462t0c2dqaa2eth2vbl1ik.apps.googleusercontent.com.json"); //../path/to/your/serviceAccountKey.json

    // Initialize Firestore with the service account key
    const firestore = new Firestore({
      projectId: '367515410868-aiejbe213c462t0c2dqaa2eth2vbl1ik.apps.googleusercontent.com', //ur_project_id
      credentials: serviceAccountKey,
    });

    const fetchData = async () => {
      try {
        // Query documents from the collection
        const querySnapshot = await firestore.collection("messages").orderBy("createdAt", "desc").limit(50).get();

        // Process the query results
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });

        // Sort the messages by createdAt
        const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);

        // Update the state with the sorted messages
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  
    // Set up real-time updates (if needed)
    const unsubscribe = firestore.collection("messages").onSnapshot((snapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;