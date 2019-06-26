import React from 'react';
import './App.css';
import Login from './components/Login';
import ChatLayout from './components/ChatLayout';
import io from 'socket.io-client';

const socketUrl = "http://192.168.1.65:8082";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inChat: false,
      socket: null
    }
  }

  componentDidMount(){
    this.initSocket();
  }

  //Создание сокета
  initSocket = () =>{
    const socket = io(socketUrl);
    socket.on('connect',()=>{
      console.log('Успешное подключение')
    });
    this.setState({socket})
  }

  //Изменение сотояния для входа в чат и отправка соответствующего события на сервер
  enterChat = (name) => {
    this.setState({inChat: true});
    const socket = this.state.socket; 
    socket.emit('enterChat', {id:socket.id, name:name});
    console.log('Вход в чат под именем ' + name)
  }

  //Отправка сообщения
  sendMessage = (message) => {
    const socket = this.state.socket;
    const date = new Date();
    socket.emit('sendMessage', {id:socket.id, message, date});
    console.log(date + '\n Отправлено сообщение: ' + message);
  }
  
  render(){
    //Выбор интерфейса в зависимости от состояния (в чате или нет)
    const inChat = this.state.inChat;
    const content = (inChat === false ) ? 
      <Login className="App-login" enterChat={this.enterChat} setName={this.setName} /> 
      :   
      <ChatLayout sendMessage={this.sendMessage} socket={this.state.socket}/>  
    
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;