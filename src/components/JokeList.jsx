import React, { Component } from "react";
import Joke from './Joke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';

class JokeList extends Component {
  // set default prop for jokes
  static defaultProps = {
    numJokesToGet: 10
  };
  
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {

    const jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' }});
      // push jokes to an object so we can add things to it eg. votes, id.
      jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
    }
    
    this.setState({ jokes: jokes })
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta } : j)
      })
    )
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smiley"/>
          <button className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(joke => (
            <Joke
              key={joke.id}
              votes= {joke.votes}
              text={joke.text}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;

// If at first you don't succeed, sky diving is not for you