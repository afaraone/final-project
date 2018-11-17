import React, { Component } from 'react';

export default class ToDo extends Component {
  render() {
    const {title, body, url, complete} = this.props.data
    if (!complete){
      return(
        <div className="todo">
          <h1 className='todo-title'>{title}</h1>
          <h2 className='todo-body'>{body}</h2>
          <button onClick={() => this.props.completeClicked(url)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(url)}>Delete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}
