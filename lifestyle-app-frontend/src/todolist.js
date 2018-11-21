import React, { Component } from 'react';
import moment from 'moment'
import ToDoForm from './todoform'
import TimedToDoForm from './TimedToDoForm'
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'
import dead from './images/dead.png'
import FormHandler from './FormHandler'
import { SimpleToDo, TimedToDo } from './ToDo.js'


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
  async updateToDo(url) {
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
  async deleteToDo(url) {
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
      let response = await fetch(this.props.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      })
      let railsData = await response.json()
      if (railsData.type !== "SimpleToDo") {
        this.postToCalendar(railsData)
      }
    } catch (error) {
      console.log(error)
    }
    this.getToDos()
  }

  postToCalendar(data) {
    let calendarBody = JSON.stringify({
      "summary": data.title, "start": { "dateTime": data.start_time},
      "end": {"dateTime": data.end_time}})
    fetch('https://www.googleapis.com/calendar/v3/calendars/' + this.props.userDetails.email + '/events', {
      method: 'POST',
      headers: {'Authorization': this.props.session, 'Content-Type': 'application/json' },
      body: calendarBody
    })
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
      return(
        <div className='to-do-complete'>
          <div className='add-to-do-buttons'>
            <FormHandler postToDo={(data) => this.postToDo(data)} />
          </div>
          <div className='to-do-garden'>
            <Garden
             list={this.state.list} updateToDo={(url) => this.updateToDo(url)} deleteToDo={(url) => this.deleteToDo(url)}
            />
          </div>
        </div>
      )
    }
  }
}

class Garden extends Component {
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
