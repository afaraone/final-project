import React, { Component } from 'react';
import './styles/App.css';
import ToDoList from './todolist';
import User from './user'

export default class App extends Component {
  render() {
    return(
      <>
      <User />
      </>
    )
  }
}
