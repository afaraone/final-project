import React, { Component } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import ToDoHandler from './ToDoHandler'

export default class User extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loggedIn: false,
        session: '',
        userDetails: {}
      }
      this.authLogin = this.authLogin.bind(this)
      this.logout = this.logout.bind(this)
    }

    async authLogin(response) {
      console.log(response)
      let body = JSON.stringify({user: response.profileObj})
      let res = await fetch("/api/users/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      })
      let json = await res.json()
      this.setState({
        loggedIn: true,
        userDetails: json,
        session: 'Bearer ' + response.accessToken
      })

    }

    async logout(response) {
      this.setState({
        loggedIn: false,
        userDetails: {},
        session: ''
      })
    }

  render() {
    const loggedIn = this.state.loggedIn
    const toDoUrl = 'http://localhost:3000/api/users/' + this.state.userDetails.id + '/to_dos/'
    const userDetails = this.state.userDetails
    if (loggedIn) {
      return(
        <>
        <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.logout}/>
        <ToDoHandler userDetails={userDetails} url={toDoUrl} session={this.state.session} />
        </>
      )
    } else {
      return(
        <GoogleLogin
        clientId='1079599907119-tgi3sq2anv557ircj50lin80qjqs50o0'
        buttonText='Login'
        scope='https://www.googleapis.com/auth/calendar'
        onSuccess={this.authLogin}
        onFailure={this.authLogin}
        />
      )
    }
  }
}
