import React, { Component } from 'react';
import ToDoForm from './todoform'

export default class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: null,
      isLoaded: false
    }
  }

  // gets all the todos from API
  getToDos() {
    fetch('http://localhost:3000/to_dos/')
      .then(res => res.json())
      .then(res => this.setState({
        list: res,
        isLoaded: true
      }))
  }

  // Sets a todo to complete using PUT req to API
  updateToDo(url) {
    const body = JSON.stringify({"to_do": {"complete": true}})
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(() => this.getToDos())
  }

  // Deletes ToDo by sending DELETE req to API
  deleteToDo(url) {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => this.getToDos())
  }

  // Adds new todo by sending POST req to API
  postToDo(data){
    let body = JSON.stringify({to_do: data })

    fetch("http://localhost:3000/to_dos/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then((response) => {return response.json()})
    .then(() => this.getToDos())
  }

  // Runs automatically when component is loaded
  componentDidMount() {
    this.getToDos()
  }

  render() {
    const list = this.state.list
    const notLoaded = !(this.state && this.state.isLoaded)
    // If list is not loaded yet(ie before fetch is done) do the following
    if (notLoaded) {
      return (
        <h1>Loading</h1>
      )
    }

    else {
      // Get the list and map each element onto a ToDo component
      const todos = list.map((todo) => {
        // Each ToDo comp is given a key, completeClicked fn and deleteClicked fn
        return(
          <ToDo
            key={todo.id} data={todo}
            completeClicked={(url) => this.updateToDo(url)}
            deleteClicked={(url) => this.deleteToDo(url)}
          />
        )
      })

      return(
        <div className='to-do-complete'>
          {/* Load up a ToDoForm component*/}
          <div className='to-do-form'>
            <ToDoForm addClicked={(data) => this.postToDo(data)}/>
          </div>
          {/* Load up the group of ToDo comps made in line 76*/}
          <div className='to-do-list'>
            {todos}
          </div>
        </div>
      )
    }
  }
}

class ToDo extends Component {
  render() {
    const {title, body, url, complete} = this.props.data
    if (!complete){
      return(
        <div>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <button onClick={() => this.props.completeClicked(url)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(url)}>Delete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}
