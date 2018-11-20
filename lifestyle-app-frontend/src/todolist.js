import React, { Component } from 'react';
import ToDoForm from './todoform'
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'


export default class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: null,
      isLoaded: false
    }
  }

  // gets all the todos from API
  async getToDos() {
    try {
      let response = await fetch(this.props.url)
      let json = await response.json()
      this.setState({list: json, isLoaded: true})
    } catch (error) {
      console.log(error)
    }
  }

  // Sets a todo to complete using PUT req to API
  async updateToDo(id) {
    let url = this.props.url + '/' + id
    let body = JSON.stringify({"to_do": {"complete": true}})
    try {
      await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: body
      })
    } catch (error) {
      console.log(error)
    }
    this.getToDos()
  }

  // Deletes ToDo by sending DELETE req to API
  async deleteToDo(id) {
    let url = this.props.url + '/' + id
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.log(error)
    }
    this.getToDos()
  }

  // Adds new todo by sending POST req to API
  async postToDo(data){
    let body = JSON.stringify({to_do: data })
    try {
      await fetch(this.props.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      })
    } catch (error) {
      console.log(error)
    }
    this.getToDos()
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
          <div className='to-do-garden'>
            <Garden list={this.state.list}/>
          </div>
        </div>
      )
    }
  }
}

class Garden extends Component {
  render() {
    const theGarden = this.props.list.map((todo) => {
      if (todo.complete === false) {
      return(<img class='grid-item' key={todo.id} src={sprout} alt='sprout'/>)
    } else {
      return(<img class='grid-item' key={todo.id} src={pink_flower} alt='pink_flower'/>)
    }
    })
    return(
      <div className='garden-div grid-container split right'>
      {theGarden}
      </div>
    )
  }
}

class ToDo extends Component {
  render() {
    const {title, body, id, complete} = this.props.data
    if (!complete){
      return(
        <div>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <button onClick={() => this.props.completeClicked(id)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(id)}>Delete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}
