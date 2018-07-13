import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfUsers : 0,
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.sendChangeName = this.sendChangeName.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(event) {
    const data = JSON.parse(event.data);
    const messages = this.state.messages.concat(data);
    console.log(data)
    switch(data.type) {
      case "incomingMessage":
        this.setState({ messages: messages });
        break;
      case "incomingNotification":
        this.setState({ messages: messages });
        break;  
      case 'connectedUser':
        this.setState({ numberOfUsers: data.numberOfUsers})  
        break;
      default:
      throw new Error("Unknown event type " + data.type);
    }  
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = this.onMessage;
  }

  sendChangeName(newName) {
    const sendNewName = {type:"postNotification", content:`${this.state.currentUser.name} has changed their name to ${newName}.`};
    this.setState({currentUser: {name: newName}})
    this.socket.send(JSON.stringify(sendNewName));
  }


  addMessage(content) {
    const newMessage = { username: this.state.currentUser, content: content, type: "postMessage" };
    this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className={'userCount'}>{this.state.numberOfUsers} Users online</span>
        </nav>
        <MessageList message={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} sendChangeName={this.sendChangeName} />
      </div>
    );
  }
}
export default App;
