import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
    };  
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
    this.onMessage = this.onMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  onMessage(event) {
    const parsedData = JSON.parse(event.data);
    const messages = this.state.messages.concat(parsedData);
     this.setState({messages: messages});
     }

  componentDidMount() {
   function onConnection(event) {
      console.log('Connected to server')
    }
  this.socket.addEventListener('open', onConnection);
  this.socket.onmessage = this.onMessage;
  }

  changeName(newName) {
    this.setState({
      currentUser: {name: newName},
    })
  }

  addMessage(content) {
    const newMessage = {username: this.state.currentUser.name, content:content};
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    return (
      <div>
      <nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav>
<MessageList message={this.state.messages}/>
<ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} changeName={this.changeName}/>
</div>
    );
  }
}
export default App;
