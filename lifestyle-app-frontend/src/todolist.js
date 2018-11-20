import React, { Component } from 'react';
import moment from 'moment'
import ToDoForm from './todoform'
import TimedToDoForm from './TimedToDoForm'
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'
import dead from './images/dead.png'
import AddToDoButtons from './AddToDoButtons'


export default class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: null,
      isLoaded: false,
      viewToDoForm: false
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

  toggleForm() {
    this.setState({viewToDoForm: !this.state.viewToDoForm})
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
        if (todo.type === "SimpleToDo") {
          return(
            <SimpleToDo
              key={todo.id} data={todo}
              completeClicked={(url) => this.updateToDo(url)}
              deleteClicked={(url) => this.deleteToDo(url)}
            />
          )
        }
        else if (todo.type  === "TimedToDo") {
          return(
            <TimedToDo
              key={todo.id} data={todo}
              completeClicked={(url) => this.updateToDo(url)}
              deleteClicked={(url) => this.deleteToDo(url)}
            />
          )
        }
      })

      return(
        <div className='to-do-complete'>
          {/* Load up a ToDoForm component*/}
          <div className='add-to-do-buttons'>
            <AddToDoButtons formVisible={this.state.viewForm} addClicked={(data) => this.postToDo(data)} showToDoForm={() => this.toggleForm()}/>
          </div>
          <div className='to-do-form'>
            <ToDoForm addClicked={(data) => this.postToDo(data)}/>
          </div>
          <div className='timed-to-do-form'>
            <TimedToDoForm addClicked={(data) => this.postToDo(data)}/>
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
      if (todo.complete === false && new Date(todo.end_time) < new Date() && todo.end_time !== null) {
        return(<img class='grid-item' key={todo.id} src={dead} alt='dead'/>)
      } else if (todo.complete === false) {
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

class SimpleToDo extends Component {
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

class TimedToDo extends Component {
  render() {
    const {title, body, id, complete, start_time, end_time} = this.props.data
    if (!complete){
      return(
        <div>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <p>{moment(start_time).format("MMM Do YY @ h:mm a")}</p>
          <p>{moment(end_time).format("MMM Do YY @ h:mm a")}</p>
          <button onClick={() => this.props.completeClicked(id)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(id)}>Delete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}
