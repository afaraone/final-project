import React, { Component } from 'react';
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'


export default class Garden extends Component {
  render() {
    const theGarden = this.props.list.map((todo) => {
      if (todo.complete === false) {
      return(<img className='grid-item' key={todo.id} src={sprout} alt='sprout'/>)
    } else {
      return(<img className='grid-item' key={todo.id} src={pink_flower} alt='pink_flower'/>)
    }
    })
    return(
      <div className='garden-div grid-container split right'>
      {theGarden}
      </div>
    )
  }
}
