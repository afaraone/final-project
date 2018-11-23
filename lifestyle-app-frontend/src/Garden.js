import React, { Component } from 'react';
import { SimpleToDo, TimedToDo } from './ToDo.js'

export default class Garden extends Component {
  render() {
    const garden = this.props.list.reverse().map((todo) => {
      if (todo.type === "SimpleToDo") {
        return(
          <SimpleToDo
            key={todo.id} data={todo}
            completeClicked={(url) => this.props.updateToDo(url)}
            deleteClicked={(data) => this.props.deleteToDo(data)}
          />
        )
      } else {
        return(
          <TimedToDo
            key={todo.id} data={todo}
            completeClicked={(url) => this.props.updateToDo(url)}
            deleteClicked={(data) => this.props.deleteToDo(data)}
          />
        )
      }
    })

  return(
      <div className="grid-container">
        {garden}
      </div>
    )
  }
}
