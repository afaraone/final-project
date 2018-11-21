import React, { Component } from 'react';
import ToDoForm from './todoform'
import TimedToDoForm from './TimedToDoForm'

export default class FormHandler extends Component {
  constructor(props) {
    super(props)
    this.state = { showButton: true }
  }
  hideButton() {
    this.setState({showButton: false})
  }
  render() {
    if (this.state.showButton) {
      return(<FormButton hideButton={() => this.hideButton()} />)
    } else {
      return (
        <div>
        <div className='to-do-form'>
          <ToDoForm addClicked={(data) => this.props.postToDo(data)}/>
        </div>
        <div className='timed-to-do-form'>
          <TimedToDoForm addClicked={(data) => this.postToDo(data)}/>
        </div>
        </div>
      )
    }
  }
}


class FormButton extends Component {
  render() {
    return(
      <button onClick={() => this.props.hideButton()}>Add ToDo</button>
    )
  }
}
