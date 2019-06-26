import React from 'react';
import "./ChatLayout.css"

class ChatLayout extends React.Component { 
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.sendMessage = props.sendMessage;
    this.state = {
      userList: [],
      chatLog: [],
      message: ''
    }
  }  

  componentDidMount(){
    this.newMessage();
    this.newUser();
  }

  //Контролируемость компонента imput
  onChange = (event) => {
    this.setState({message: event.target.value})
  }

  //Появление нового пользователя, обнавляется список
  newUser = () =>{
    this.socket.on('newUser', ({user, users}) => {
      this.setState({userList: users});
      console.log('Вошёл новый пользователь ' + user);
    });
  }

  //Выход пользователя, обнавляется список
  exitUser = () =>{
    this.socket.on('exitUser', ({user, users}) => {
      this.setState({userList: users});
      console.log('Пользователь ' + user.name + ' вышел из чата');
    });
  }

  //Отслеживание новых сообщений с сервера
  newMessage = () => {
    this.socket.on('newMessage', (objMessage) => {
      this.setState((prevState) => ({
        chatLog: [...prevState.chatLog, objMessage]
      }));
      console.log(objMessage)
    });
  }

  //При отправке формы сообщение уходит на сервер, окошко сообщения очищается
  onSubmit = (event) => {
    const message = this.state.message;
    this.sendMessage(message);
    
    event.preventDefault(); //Блокирование отправки формы
    this.setState({message:''}); //Очищение формы
  }
  
  render(){
    //Представление в виде списка li элементов массива пользователей чата
    const userList = this.state.userList;
    const userListInLi = userList.map((item) => { 
      return <li key={item.id}> {item.name} </li> 
    });

    //Представление в виде списка li элементов массива сообщений
    const chatLog = this.state.chatLog;
    const chatLogInLi = chatLog.map((item) => { 
      const date = item.date.substring(11,19);
      const name = <span className="chat-log-name">{item.name}</span>
      const message = <span className="chat-log-message">{item.message}</span>
      const key = item.key;

      return (
        <li key={key}> 
          {date + ' '} {name}: {message} 
        </li>
      )
    });

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