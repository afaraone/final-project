import React, { Component } from 'react';
import ToDoForm from './todoform'
import TimedToDoForm from './TimedToDoForm'

export default class FormHandler extends Component {
  constructor(props) {
    super(props)
    this.state = { formVisible: false }
  }

  toggleForm() {
    this.setState({formVisible: !this.state.formVisible})
  }

  render() {
    const formVisible = this.state.formVisible
    return(
      <>
        <FormButton toggleForm={() => this.toggleForm()} />

        {formVisible &&
          <div className='all-todo-forms'>
          <ToDoForm addClicked={(data) => this.props.postToDo(data)} toggleForm={() => this.toggleForm()}/>
          <TimedToDoForm addClicked={(data) => this.props.postToDo(data)} toggleForm={() => this.toggleForm()}/>
          </div>
        }
      </>
    )
  }
}

class FormButton extends Component {
  render() {
    return(
      <div className='form-button'>
      <button onClick={() => this.props.toggleForm()}>Add ToDo</button>
      </div>
    )
  }
}
