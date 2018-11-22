import React, { Component } from 'react';
import ToDoForm from './todoform'
import TimedToDoForm from './TimedToDoForm'

export class FormHandler extends Component {
  constructor(props) {
    super(props)
    this.state = { showButton: true }
  }
  hideButton() {
    this.setState({showButton: false})
  }

  showButton() {
    this.setState({showButton: true})
  }

  render() {
    const showButton = this.state.showButton
    return(
      <>
        {showButton && <FormButton hideButton={() => this.hideButton()} />}
        {!showButton &&
          <div className='all-todo-forms'>
          <ToDoForm addClicked={(data) => this.props.postToDo(data)} showButton={() => this.showButton()}/>
          <TimedToDoForm addClicked={(data) => this.props.postToDo(data)} showButton={() => this.showButton()}/>
          </div>
        }
      </>
    )
  }
}

export class FormButton extends Component {
  render() {
    return(
      <div className='form-button'>
      <button onClick={() => this.props.hideButton()}>Add ToDo</button>
      </div>
    )
  }
}
