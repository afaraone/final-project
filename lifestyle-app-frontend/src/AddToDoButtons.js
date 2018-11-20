import React, { Component } from 'react';
import ToDoForm from './todoform'

export default class AddToDoButtons extends Component {
  render() {
    if (this.props.formVisible) {
      <ToDoForm addClicked={(data) => this.props.addClicked(data)}/>
    } else {
      return (
        <button onClick={() => this.props.showToDoForm()}>Add ToDo</button>
      )
    }
  }
}
