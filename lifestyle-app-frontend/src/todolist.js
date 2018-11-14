import React, { Component } from 'react';

export default class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      userTitle: '',
      userBody: '',
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

  changeUserTitle(input){
    this.setState({
      userTitle: input
    });
  }

  changeUserBody(input) {
    this.setState({
      userBody: input
    })
  }

  addToList(){
    let body = JSON.stringify({to_do: {title: this.state.userTitle, body: this.state.userBody} })

    fetch("http://localhost:3000/to_dos/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then((response) => {return response.json()})
    .then((to_do)=>{
      this.setState({
        list: this.state.list.concat(to_do)
      })
    })

    this.setState({
      userTitle: '',
      userBody: ''
    })
  }

  componentDidMount() {
    this.getToDos()
  }

  render() {
    if (!(this.state && this.state.list)) {
      return (
        <h1>Loading</h1>
      )
    } else{
      const todos = this.state.list.map((todo) => {
        return(<ToDo title={todo.title} body={todo.body}/>)
      })
      return(
        <div className='to-do-complete'>
        <div className='add-to-do'>
          <input
          onChange={ (e)=> this.changeUserTitle(e.target.value)}
          value={this.state.userTitle}
          type="text"
          />
          <input
          onChange={ (e)=> this.changeUserBody(e.target.value)}
          value={this.state.userBody}
          type="text"
          />
          <button onClick={ ()=> this.addToList(this.state.userInput) }>Submit</button>
        </div>

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
    return(
      <div>
      <h1>{this.props.title}</h1>
      <h2>{this.props.body}</h2>
      </div>
    )
  }
}