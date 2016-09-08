import React from 'react';
import Message from './components/Message.jsx';
import Input from './components/Input.jsx';
import * as firebase from 'firebase';
import style from './styles/App.less';

// Data to authenticate Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzTLJhoMxTNBADq2AOB83rclB2KIrRcEU",
  authDomain: "chatbox-6e584.firebaseapp.com",
  databaseURL: "https://chatbox-6e584.firebaseio.com",
  storageBucket: "chatbox-6e584.appspot.com",
};

//Initializing Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = React.createClass({
  getInitialState() {
    return {
      messages: [],
      name: 'Brian',
      newMessage: ''
    }
  },
  componentWillMount() {
    //gets reference to Firebase database and listens for changes
    this.messagesRef = firebaseApp.database().ref('messages');
    this.listenForItems(this.messagesRef);
  },

  componentWillUnmount() {
     this.messagesRef.off();
   },

  listenForItems(messagesRef) {
   // When database value changes, we take the snapshot and iterate
   // through each item in the snapshot, and create an array of
   // newMessages
   messagesRef.on('value', (snapshot) => {
     // get children as an array
     var newMessages = [];
     snapshot.forEach((child) => {
       newMessages.push({
         name: child.val().name,
         message: child.val().message,
         key: child.key
       });
     });

     // Update the message list in state, triggering a re-render
     this.setState({
       messages: newMessages
     });
   });
 },

 handleNameChange(event) {
   this.setState({name: event.target.value});
 },

 handleMessageChange(event) {
   this.setState({newMessage: event.target.value});
 },

 handleKeyPress(event) {
   const {name, newMessage} = this.state;
   if(event.key === 'Enter') {
     this.messagesRef.push({name: name, message: newMessage});
     this.setState({newMessage: ''});
   }
 },

 render() {
   // Iterates through the messages in state to create HTML elements
   // for each message
   const messageDivs = this.state.messages.map((message, index) => {
     return <Message key={index} message={message} />;
   });

   const {name, newMessage} = this.state;

   return (
     <div>
       <nav className="navbar">
        <div className="container">
          <h2>ChatMe</h2>
        </div>
       </nav>
       <div className="container">
         <div className="eight columns messages">
            <div className="scrollview">
              {messageDivs}
            </div>
         </div>
         <div className="four columns">
           <Input label={"Message"} value={newMessage} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress}/>
           <Input label={"Name"} value={name} onChange={this.handleNameChange}/>
         </div>
      </div>
     </div>
   );
 }
});

export default App;
