import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import ToDoList from './todolist'


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


ReactDOM.render(<ToDoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
