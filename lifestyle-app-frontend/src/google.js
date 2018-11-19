import React, { Component } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

export default class Google extends Component {
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
        session: response.accessToken
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
    return(
      <>
      <GoogleLogin
        clientId='1079599907119-tgi3sq2anv557ircj50lin80qjqs50o0'
        buttonText='Login'
        onSuccess={this.authLogin}
        onFailure={this.authLogin}
      />

      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.logout}
      >
      </GoogleLogout>
      </>
    )
  }
}
