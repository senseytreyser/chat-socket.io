import React from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/ChatLayout';
import io from 'socket.io-client';

const socketUrl = "http://192.168.1.65:3231";

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
  enterChat = () => {
    this.setState({inChat: true});
    const socket = this.state.socket; 
    socket.emit('enterChat',socket);
  }

  //Отправка на сервер события с введённым именем
  setName = (name) => {
    const socket = this.state.socket;
    socket.emit('setUserName', name);
  }
  
  render(){
    //Выбор интерфейса в зависимости от состояния (в чате или нет)
    const inChat = this.state.inChat;
    const content = (inChat === false ) ? 
      <Login className="App-login" enterChat={this.enterChat} setName={this.setName} /> 
      :   
      <Chat/>  
    
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
