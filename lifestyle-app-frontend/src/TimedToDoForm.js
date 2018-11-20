import React, { Component } from 'react';

export default class TimedToDoForm extends Component {
  constructor(props) {
    super(props);
    // title and body are vals of text box for form
    this.state = {
      title: '',
      body: '',
      start_time: '',
      duration: ''
    }
  }

  changeValue(field, input) {
    this.setState({
      [field]: input
    });
  }

  calculateEndTime() {
    if (this.state.start_time == '' || this.state.duration == '') { return }
    let d = new Date(this.state.start_time)
    d.setMinutes(d.getMinutes() + this.state.duration)
    return d.toISOString()
  }

  resetForm() {
    this.changeValue('title', '')
    this.changeValue('body', '')
    this.changeValue('start_time', '')
    this.changeValue('duration', '')
  }

  render() {
    // prepare vals of textbox to send as a param in POST req to API
    const data = {"title": this.state.title,
                   "body": this.state.body,
              "start_time": this.state.start_time,
                "end_time": this.calculateEndTime(),
                   "type": "TimedToDo"}
    return(
      <div>
        <input
          onChange={ (e)=> this.changeValue('title', e.target.value)}
          value={this.state.title}
          type="text"
        />
        <input
          onChange={ (e)=> this.changeValue('body', e.target.value)}
          value={this.state.body}
          type="text"
        />
        <input
          onChange={ (e)=> this.changeValue('start_time', e.target.value)}
          value={this.state.start_time}
          type="datetime-local"
        />
        <input
          onChange={ (e)=> this.changeValue('duration', e.target.value)}
          value={this.state.duration}
          type="number"
        />
        <button
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