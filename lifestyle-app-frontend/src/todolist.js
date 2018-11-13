import React from 'react';

export default class ToDoList extends React.Component {
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
    list: listArray,
    userInput: ''
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
       <ul>
        {this.state.list.map( (val, i) => <li key={i} className="todo">{val}</li>)}
       </ul>
      </div>
    );
  }
}
