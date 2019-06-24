import React from 'react';
import './App.css';
import Login from './components/login';
import Chat from './components/ChatLayout';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inChat: false
    }
  }

  enterChat = () => {
    this.setState(()=>({
      inChat: true
    }))
  }
  
  render(){
    //Выбор интерфейса в зависимости от состояния (в чате или нет)
    const inChat = this.state.inChat;
    const content = (inChat === false ) ? 
      <Login className="App-login" btnClick={this.enterChat} /> 
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
