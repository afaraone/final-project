import React, { Component } from 'react';
import './styles/App.css';
import ToDoList from './todolist';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

export default class App extends Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }

    const logout = (response) => {
      console.log(response);
    }


    return(
      <>
      <GoogleLogin
        clientId='1079599907119-tgi3sq2anv557ircj50lin80qjqs50o0'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>

      <ToDoList />
      </>
    )
  }
}
