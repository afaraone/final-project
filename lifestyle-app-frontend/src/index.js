import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      userInput: '',
      list: []
    }
  }

changeUserInput(input){
  this.setState({
    userInput: input
  });
}

addToList(input){
  let listArray = this.state.list;

  listArray.push(input);

  this.setState({
    list: listArray
  })
}

  render() {
    return (
      <div className='to-do-list-main'>
      <input
      onChange={ (e)=> this.changeUserInput(e.target.value)}
       value={this.state.userInput}
       type="text"
       />
       <button onClick={ ()=> this.addToList(this.state.userInput) }>Submit</button>
    );
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


ReactDOM.render(<ToDoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
