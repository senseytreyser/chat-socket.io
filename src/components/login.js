import React from 'react';
import './login.css';
import Button from './login-btn'

function Login(props) {  
  const formClasses = props.className + " login";
  const btnClick = props.btnClick;
  
  return (
    <form className={formClasses}>
        <label htmlFor="name"> Для входа в чат введите имя и нажмите кнопку Войти</label>        
        <input className="login-name" type="text" name="name"></input>
        <Button className="login-btn" btnClick={btnClick}/>
    </form>
  );
}

export default Login;