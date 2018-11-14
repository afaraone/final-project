import React, { Component } from 'react';

export default class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: null
    }
  }

  getToDos() {
    fetch('http://localhost:3000/to_dos/')
      .then(res => res.json())
      .then(res => this.setState({
        list: res
      }))
  }

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

  deleteToDo(url) {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => this.getToDos())
  }

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

  componentDidMount() {
    this.getToDos()
  }

  render() {
    if (!(this.state && this.state.list)) {
      return (
        <h1>Loading</h1>
      )
    }

    else {
      const todos = this.state.list.map((todo) => {
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
          <div className='to-do-form'>
            <ToDoForm addClicked={(data) => this.postToDo(data)}/>
          </div>
          <div className='to-do-list'>
            {todos}
          </div>
        </div>
      )
    }
  }
}

class ToDoForm extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const data = {"title": this.state.title, "body": this.state.body}
    return(
      <div>
        <input
          onChange={ (e)=> this.changeTitle(e.target.value)}
          value={this.state.title}
          type="text"
        />
        <input
          onChange={ (e)=> this.changeBody(e.target.value)}
          value={this.state.body}
          type="text"
        />

        <button
          onClick={ ()=> {
            this.changeTitle('')
            this.changeBody('')
            this.props.addClicked(data)
            }
          }>
          Submit
        </button>
      </div>
    )
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
