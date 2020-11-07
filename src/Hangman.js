import React, { Component } from "react";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import { randomChoice } from "./helpers";
import { ENGLISH_WORDS } from "./words";
import "./Hangman.css";

class Hangman extends Component {
  static defaultProps = {
    numGuesses: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      numWrongGuesses: 0,
      guessedLetters: new Set(),
      word: randomChoice(ENGLISH_WORDS),
    };
    // this.getCurrWord = this.getCurrWord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  restartGame() {
    this.setState({
      numWrongGuesses: 0,
      guessedLetters: new Set(),
      word: randomChoice(ENGLISH_WORDS),
    });
  }

  getCurrWord() {
    return this.state.word
      .split("")
      .map((ltr) => (this.state.guessedLetters.has(ltr) ? ltr : "_"));
  }

  handleClick(event) {
    const ltr = event.target.value;
    this.setState((st) => ({
      guessedLetters: st.guessedLetters.add(ltr),
      numWrongGuesses: st.numWrongGuesses + (st.word.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        onClick={this.handleClick}
        disabled={this.state.guessedLetters.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    const won = this.getCurrWord().join("") === this.state.word;
    const gameOver = this.state.numWrongGuesses === this.props.numGuesses;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.numWrongGuesses]}
          alt={`${this.state.numGuesses}/${this.props.numGuesses} guesses`}
        />
        <p className="Hangman-word">
          {!gameOver ? this.getCurrWord() : this.state.word}
        </p>
        {won && <p className="Hangman-win">You Won!</p>}
        {gameOver && <p className="Hangman-lose">You Lose!</p>}
        {!won && !gameOver && (
          <>
            <p>
              {this.props.numGuesses - this.state.numWrongGuesses} attemps left
            </p>
            <p className="Hangman-buttons">{this.generateButtons()}</p>
          </>
        )}
        {(won || gameOver) && (
          <button id="Hangman-restart" onClick={this.restartGame}>
            Restart
          </button>
        )}
      </div>
    );
  }
}

export default Hangman;
