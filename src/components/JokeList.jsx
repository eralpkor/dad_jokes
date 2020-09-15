import React, { Component } from "react";
import Joke from './Joke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';

import { FaSmile } from 'react-icons/fa';

class JokeList extends Component {
  // set default prop for jokes
  static defaultProps = {
    numJokesToGet: 10
  };
  
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    console.log(this.seenJokes);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    // load jokes
    try {
    const jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' }});
      // push jokes to an object so we can add things to it eg. votes, id.
      if (!this.seenJokes.has(res.data.joke)) {
      jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
      } else {
        console.log('Found a dublicate');
        console.log(res.data.joke);
      }
    }
    
    this.setState(st => ({
      loading: false,
      jokes: [...st.jokes, ...jokes]
    }),
    () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
    // window.localStorage.setItem('jokes', JSON.stringify(jokes))
    } catch (error) {
        alert(error)
        this.setState({ loading: false })
    }
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta } : j)
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    )
  }

  // button function
  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    // Loading emoji
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <FaSmile size="15rem" color="yellow" className="spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      )
    }

    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smiley"/>
          <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {jokes.map(joke => (
            // Joke component
            <Joke
              key={joke.id}
              votes= {joke.votes}
              text={joke.text}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;

// If at first you don't succeed, sky diving is not for you