import React, { Component } from 'react';
import './Joke.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <FontAwesomeIcon icon={faArrowUp} onClick= {this.props.upvote} />
          <span>{this.props.votes}</span>
          <FontAwesomeIcon icon={faArrowDown} onClick={this.props.downvote} />
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Joke;