import React from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {
  const messages = props.message.map(message => {
    switch (message.type) {
      case "incomingNotification":
        return <div key={message.id} className="notification">
        <span className="notification-content">{message.content}</span>
              </div>
      case "incomingMessage":
        return <Message key={message.id} userName={message.username} content={message.content}/>
    }
  })
  return (
    <main className="messages">
      {messages}
    </main>
  );
}


