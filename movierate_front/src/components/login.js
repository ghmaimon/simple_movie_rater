import React, { Component } from 'react';
import {withCookies} from "react-cookie";
var FontAwsom = require('react-fontawesome')
class Login extends Component {
    state = { 

     }
    state = {
        credential:{
            username:'',
            password:''
        }
    }
    changed = evt =>{
        let cred = this.state.credential;
        cred[evt.target.name] = evt.target.value;
        this.setState({credential:cred});
    }
    loginClicked = evt =>{
        console.log(this.state.credential)
        fetch(`${process.env.REACT_APP_API_URL}/auth/`,{
            method:'POST',
            headers:{'Content-Type' : "application/JSON",},
            body:JSON.stringify(this.state.credential)
        }).then(res => res.json()).then(res =>{
            this.props.cookies.set('mr-token',res.token)
            window.location.href="/movies/"
        }).catch(err=>console.log(err))
    }

    Isdisabled = this.state.credential.username.length === 0 || this.state.credential.password.length === 0

    componentDidUpdate(prevProps, prevState) {       
        this.Isdisabled = this.state.credential.username.length === 0 || this.state.credential.password.length === 0
    }
    render() { 
        return ( <div >
            <header className="header">
              <div className="text-box">
              <h1>
                <span>Movie Rate</span>
                <FontAwsom  name="far fa-film fa-2x" />
              </h1> 
              <a href="#login" className = "btn btn-white">Rate Now</a>
              </div>
            </header>
            <div id="login" className='login-form-container'>
                <h1 className="top">LogIn</h1>
                <div>
                    _____________
                </div>
                <span className='form-title'>Username</span><br/>
                <input name='username' value={this.state.credential.username} onChange={this.changed} type='text'/><br/>
                <span className='form-title'>Password</span><br/>
                <input name='password' value={this.state.credential.password} onChange={this.changed} type='password'/><br/>
                <button className='btn-form' disabled={this.Isdisabled} onClick = {this.loginClicked}>LogIn</button>
            </div>
        </div> );
    }
}
 
export default withCookies(Login);