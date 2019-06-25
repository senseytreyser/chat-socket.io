import React from 'react';
import "./ChatLayout.css"

class ChatLayout extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      userList: [{key:1,name:'mary'},{key:2,name:'mary'}],
      chatLog: [],
      message: ''
    }
  }  
  
  render(){
    //const userList = this.state.userList.map((item)=>{<li>{item.name}</li>})

    return (
    <>
      <div className="chat">
          <ul className="chat-log">
              
          </ul>
          <input type="text" className="chat-input"></input>
          <button className="chat-btn">Отправить</button>
      </div>
      <ul className="user-list">
          <span className="user-list__title">Сейчас в сети:</span>
          
      </ul>
    </>
    );
}}

export default ChatLayout;