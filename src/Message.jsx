import React from 'react';

export default function Message(props){
  return (<div className="message">
  <span className="message-username">{props.userName}</span>
  <span className="message-content">{props.content}</span>
</div>);
}
