import React, { Component } from 'react';
import { FormHandler } from './FormHandler'
import Garden from './Garden'
import Title from './Title'


export default class ToDoHandler extends Component {
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
  async deleteToDo(data) {
    try {
      await fetch(data.url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
      if (data.type === "TimedToDo") {
        this.deleteFromCalendar(data.event)
      }

    } catch (error) {
      console.log(error)
    }
    this.getToDos()
  }

  async deleteFromCalendar(eventId) {
    fetch('https://www.googleapis.com/calendar/v3/calendars/' + this.props.userDetails.email + '/events/' + eventId, {
      method: 'DELETE',
      headers: {'Authorization': this.props.session, 'Content-Type': 'application/json' }
    })
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
      let todoObj = await response.json()
      if (todoObj.type !== "SimpleToDo") {
        let calendarJson = await this.postToCalendar(todoObj)
        this.putCalendarDetails(todoObj, calendarJson)
      }
    } catch (error) {
      console.log(error)
    }
    this.getToDos()
  }

  async putCalendarDetails(todo, calendarJson) {
    fetch(todo.url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"to_do": calendarJson})
    })
  }

  async postToCalendar(data) {
    let calendarBody = JSON.stringify({
      "summary": data.title, "start": { "dateTime": data.start_time},
      "end": {"dateTime": data.end_time}})
    let response = await fetch('https://www.googleapis.com/calendar/v3/calendars/' + this.props.userDetails.email + '/events', {
      method: 'POST',
      headers: {'Authorization': this.props.session, 'Content-Type': 'application/json' },
      body: calendarBody
    })
    let json = await response.json()
    console.log(json.htmlLink)
    console.log(json.id)
    return {calendar: json.htmlLink, event: json.id}
  }

  // Runs automatically when component is loaded
  componentDidMount() {
    this.getToDos()
  }

  render() {
    const list = this.state.list
    const notLoaded = !(this.state && this.state.isLoaded)
    // If list is not loaded yet(ie before fetch is done) do the following
    return(
      <>
      { notLoaded && <h1>Loading</h1> }
      { !notLoaded &&
        <>
          <FormHandler postToDo={(data) => this.postToDo(data)} />
          <Title />
          <Garden
            list={list} updateToDo={(url) => this.updateToDo(url)} deleteToDo={(url) => this.deleteToDo(url)}
          />
        </>
      }
      </>
    )
  }
}
