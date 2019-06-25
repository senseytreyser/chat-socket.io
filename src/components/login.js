import React from 'react';
import './Login.css';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.className = props.className;
    this.setName = props.setName;
    this.enterChat = props.enterChat;

    this.state = {name:''};
  }   

  onChangeName = (event) =>{
    this.setState({name: event.target.value})
  }

  onSubmit = (event) => {
    const name = this.state.name;
    this.setName(name);
    this.enterChat(name);
    event.preventDefault();
  }

  render(){
    const formClasses = this.className + " login";
    
    return (
      <form className={formClasses} onSubmit={this.onSubmit}>
          <label htmlFor="name"> Введите своё имя и нажмите enter</label>        
          <input 
            className="login-name" 
            type="text" 
            name="name"
            autoFocus = {true}
            value={this.state.name}
            onChange={this.onChangeName} 
          />
          <button type="submit" className="login-btn">Войти</button> 
      </form>
    );
  }
}

export default Login;