import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <FontAwesomeIcon icon={faArrowUp} />
          <span>{this.props.votes}</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Joke;