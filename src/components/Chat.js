import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export const Chat = ({username}) => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function socketInitializer() {
    await fetch('/api/socket');

    socket = io();

    socket.on('receive-message', (data) => {
      setAllMessages((history) => [...history, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('emitted');

    socket.emit('send-message', {
      username,
      message,
    });

    setMessage('');
  }

  return (
    <div>
      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name='message'
          placeholder='enter your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button">Send</button>
      </form>
    </div>
  );
};
