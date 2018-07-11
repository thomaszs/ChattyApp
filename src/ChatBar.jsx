import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content : "",
    }
    this.onContent = this.onContent.bind(this);
    this.onSubmitContent = this.onSubmitContent.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    // this.onUser = this.onUser.bind(this);
  }

onChangeUserName(event) {
  if(event.keyCode === 13) {
    this.props.changeName(event.target.value)
  }
}  

// onUser(event) {
//   this.setState({
//     username: event.target.value,
//   });
// }

onSubmitContent(event) {
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
  <input className="chatbar-username" placeholder="Your Name (Optional)"  defaultValue={this.props.currentUser} onKeyUp={this.onChangeUserName}/>
  <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onContent} onKeyUp={this.onSubmitContent} value={this.state.content}/>
</footer>);
}

}

export default ChatBar;
