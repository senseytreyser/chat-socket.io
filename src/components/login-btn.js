import React from 'react';

class LoginBtn extends React.Component {
    constructor(props){
        super(props)
        this.className = props.className;
        this.btnClick = props.btnClick
    }
    
    render(){
        return (
            <button className={this.className} onClick={this.btnClick}>Войти</button>
        )
    }
}

export default LoginBtn;