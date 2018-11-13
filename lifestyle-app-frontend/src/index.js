import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

export default class App extends React.Component {
  render() {
    return(
      <ToDoList />
    )
  }
}

class ToDoList extends React.Component {
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
      const todos = this.state.list.map((val) => {
        return(<li>{val.title}</li>)
      })
      return(
        <div className='to-do-list-main'>
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

          <ul>
            {todos}
          </ul>
        </div>
      )
    }
  }
}



// class Home extends React.Component {
//   render() {
//     return (
//       <div>
//       <ToDoForm />
//       <ToDoList />
//       </div>
//     )
//   }
// }
//
// class ToDoList extends React.Component {
//   render() {
//     return (
//       <ToDoForm />
//     )
//   }
// }
//
// class ToDoForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: 'Add your ToDo'};
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }
//
//   handleSubmit(event) {
//     alert('A ToDo was submitted: ' + this.state.value);
//     event.preventDefault();
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <textarea value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
