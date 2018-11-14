import React, { Component } from 'react';
import './App.css';
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'
export default class App extends Component {
  render() {
    return(
      <ToDoList />
    )
  }
}

class ToDoList extends Component {
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

  addToList(){
    let body = JSON.stringify({to_do: {title: this.state.userTitle, body: this.state.userBody} })

    fetch("http://localhost:3000/to_dos/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then((response) => {return response.json()})
    .then(() => this.getToDos())

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
        return( <ToDo
          key={todo.id} id={todo.id} title={todo.title} body={todo.body} complete={todo.complete}
          completeClicked={() => this.updateToDo(todo.url)}
        />)
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
        <Garden list={this.state.list}/>
        </div>
      )
    }
  }
}

class ToDo extends Component {
  render() {
    if (!this.props.complete){
      return(
        <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.body}</h2>
        <button onClick={() => this.props.completeClicked()}>Complete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}

class Garden extends Component {
  render() {
    const theGarden = this.props.list.map((todo) => {
      if (todo.complete === false) {
      return(<img key={todo.id} src={sprout} alt='sprout'/>)
    } else {
      return(<img key={todo.id} src={pink_flower} alt='pink_flower'/>)
    }
    })
    return(
      <div className='garden-div'>
      {theGarden}
      </div>
    )
  }
}
