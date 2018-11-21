import React, { Component } from 'react';
import moment from 'moment'
import sprout from './images/sprout.png'
import pink_flower from './images/pink_flower.png'
import dead from './images/dead.png'

export class SimpleToDo extends Component {
  render() {
    const { title, body, url, complete, end_time } = this.props.data
    if (!complete){
      return(
        <div>
          <img className='grid-item' src={sprout} alt='sprout'/>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <button onClick={() => this.props.completeClicked(url)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(url)}>Delete</button>
        </div>
      )
    } else {
      return(
        <div>
        <img className='grid-item' src={pink_flower} alt='pink_flower'/>
      <h1>{title}</h1>
      </div>
    )
    }
  }
}

export class TimedToDo extends Component {
  render() {
    const {title, body, url, complete, start_time, end_time} = this.props.data
    if (new Date(end_time) < new Date() && end_time !== null){
      return(
        <div>
          <img className='grid-item' src={dead} alt='dead'/>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <p>{moment(start_time).format("MMM Do YY @ h:mm a")}</p>
          <p>{moment(end_time).format("MMM Do YY @ h:mm a")}</p>
          <button onClick={() => this.props.deleteClicked(url)}>Delete</button>
        </div>
      )
    } else if (!complete) {
      return(
        <div>
          <img className='grid-item' src={sprout} alt='sprout'/>
          <h1>{title}</h1>
          <h2>{body}</h2>
          <p>{moment(start_time).format("MMM Do YY @ h:mm a")}</p>
          <p>{moment(end_time).format("MMM Do YY @ h:mm a")}</p>
          <button onClick={() => this.props.completeClicked(url)}>Complete</button>
          <button onClick={() => this.props.deleteClicked(url)}>Delete</button>
        </div>
      )
    } else {
      return(null)
    }
  }
}
