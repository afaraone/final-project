import React, { Component } from 'react';
import { SimpleToDo, TimedToDo } from './ToDo.js'

export default class Garden extends Component {
  render() {
    const garden = this.props.list.map((todo) => {
      if (todo.type === "SimpleToDo") {
        return(
          <SimpleToDo
            key={todo.id} data={todo}
            completeClicked={(url) => this.props.updateToDo(url)}
            deleteClicked={(url) => this.props.deleteToDo(url)}
          />
        )
      } else {
        return(
          <TimedToDo
            key={todo.id} data={todo}
            completeClicked={(url) => this.props.updateToDo(url)}
            deleteClicked={(url) => this.props.deleteToDo(url)}
          />
        )
      }
    })

  return(
      <div>
        {garden}
      </div>
    )
  }
}
