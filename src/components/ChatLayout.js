import React from 'react';
import "./ChatLayout.css"

class ChatLayout extends React.Component { 
  constructor(props) {
    super(props);

    this.sendMessage = props.sendMessage;
    this.state = {
      userList: [{key:1,name:'mary'},{key:2,name:'pipin'}],
      chatLog: [
        {key:'10', date:'01/02/43', userName:'mary', message:'mary'},
        {key:'01', date:'01/02/43', userName:'pipin', message:'mary'}
      ],
      message: ''
    }
  }  

  onChange = (event) => {
    this.setState({message: event.target.value})
  }

  //При отправке формы сообщение уходит на сервер, окошко сообщения очищается
  onSubmit = (event) => {
    const message = this.state.message;
    this.sendMessage(message);
    console.log('Отправка сообщения: ' + message );
    event.preventDefault();
    this.setState({message:''});
  }
  
  render(){
    //Представление в виде списка li элементов массива пользователей чата
    const userList = this.state.userList;
    const userListInLi = userList.map((item) => { 
      return <li key={item.key}> {item.name} </li> 
    });

    //Представление в виде списка li элементов массива сообщений
    const chatLog = this.state.chatLog;
    const chatLogInLi = chatLog.map((item) => { 
      return <li key={item.key}> {`${item.date} ${item.userName}: ${item.message}`} </li> 
    });

    // return (
    //   <form className="chat-input-row" onSubmit={this.onSubmit}>
    //     <input 
    //       type="text" 
    //       className="chat-input"
    //       autoFocus = {true}
    //       value={this.state.message}
    //       onChange={this.onChange}
    //     />
    //     <button type="submit" className="chat-btn">
    //       Отправить
    //     </button>
    //   </form>
    // )

    return (
    <>
      <div className="chat">
          <ul className="chat-log">
            {chatLogInLi}              
          </ul>
          <form className="chat-input-row" onSubmit={this.onSubmit}>
            <input 
              type="text" 
              className="chat-input"
              autoFocus = {true}
              value={this.state.message}
              onChange={this.onChange}
            />
            <button type="submit" className="chat-btn">
              Отправить
            </button>
          </form>
      </div>
      <ul className="user-list">
          <span className="user-list__title">Сейчас в сети:</span>
          {userListInLi}
      </ul>
    </>
    );
}}

export default ChatLayout;