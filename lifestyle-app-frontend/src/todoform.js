import React, { Component } from 'react';

export default class ToDoForm extends Component {
  constructor(props) {
    super(props);
    // title and body are vals of text box for form
    this.state = {
      title: '',
      body: '',
    }
  }

  changeTitle(input){
    this.setState({
      title: input
    });
  }

  changeBody(input) {
    this.setState({
      body: input
    });
  }

  resetForm() {
    this.changeTitle('')
    this.changeBody('')
  }

  render() {
    // prepare vals of textbox to send as a param in POST req to API
    const data = {"title": this.state.title, "body": this.state.body}
    return(
      <div>
        <input className='title-input'
          onChange={ (e)=> this.changeTitle(e.target.value)}
          value={this.state.title}
          type="text"
        />
        <input className='body-input'
          onChange={ (e)=> this.changeBody(e.target.value)}
          value={this.state.body}
          type="text"
        />

        <button className='todo-submit'
          onClick={ ()=> {
            this.resetForm()
            this.props.addClicked(data)
            }
          }>
          Submit
        </button>
      </div>
    )
  }
}
