import React, { Component } from 'react';
import './styles/App.css';
import ToDoList from './todolist';
import Google from './google'

export default class App extends Component {
  render() {
    return(
      <>
      <ToDoList />
      <Google />
      </>
    )
  }
}
