import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username : this.props.currentUser.name,
      content : "",
    }

    this.onContent = this.onContent.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
  }

onChangeUserName(event) {
  this.setState({
    username: event.target.value
  })
}  

handleKeyUp(event) {
  if (event.keyCode === 13) {
    this.props.addMessage(this.state.content);
    this.setState({content: ""})
  };
}

onContent(event) {
  this.setState({
    content: event.target.value,
  });
}
render () {
  return (<footer className="chatbar">
  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onName={this.onChangeUserName}/>
  <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onContent} onKeyUp={this.handleKeyUp} value={this.state.content}/>
</footer>);
}

}

export default ChatBar;
