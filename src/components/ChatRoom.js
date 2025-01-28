import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './ChatRoom.css';

const socket = io('https://chatapp-backend-1-j2pl.onrender.com');

function ChatRoom() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const messageListRef = useRef(null);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('joinRoom', { username, room });
    }
  };

  const sendMessage = () => {
    if (message) {
      const messageData = { username, room, message };
      socket.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', username);
  };

  useEffect(() => {
    socket.on('message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on('userList', (usersList) => {
      setUsers(usersList);
    });

    socket.on('typingIndicator', (username) => {
      setTypingUser(username);
      setTimeout(() => {
        setTypingUser(null);
      }, 3000);
    });

    return () => {
      socket.off('message');
      socket.off('userList');
      socket.off('typingIndicator');
    };
  }, [username]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chat-app-container'>
      <div className="chat-room-container">
        <h1 className='chat-head'>Chat Room</h1>
        <div className="input-section">
          <label className='chat-label' htmlFor='username'>USERNAME</label>
          <input
            type="text"
            id='username'
            className='room-input'
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className='chat-label' htmlFor='roomName'>ENTER ROOM NAME</label>
          <input
            type="text"
            id='roomName'
            className='room-input'
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom} className='join-btn'>Join Room</button>
        </div>
        <div className="user-list">
          <h3>Active Users</h3>
          {users.length > 0 && (
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="message-list" ref={messageListRef}>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className={msg.username === username ? 'sent' : 'received'}>
                <div className={`message-box ${msg.username === username ? 'sent' : 'received'}`}>
                  <p className='username-msg'>{msg.username}</p>
                  <p className='user-msg'>{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="typing-indicator">
          {typingUser && <p>{typingUser} is typing...</p>}
        </div>
        <div className="message-input-area">
          <input
            type="text"
            className='msg-input'
            value={message}
            placeholder="Type a message"
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
          />
          <button onClick={sendMessage} className='send-btn'>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
