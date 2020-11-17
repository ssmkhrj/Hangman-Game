# Hangman Game

> Live Demo: https://hangman-react-ssm.netlify.app/

# Understanding the code

### Components

**1. Hangman**

- State
  - `numWrongGuesses`: Stores the number of wrong guesses the user has made. Initial value is `0`.
  - `guessedLetters`: A set that stores all the letters guessed by the user. Intial value is `new Set()`.
  - `word`: Stores the word that the user has to guess. Initial value is a word from the array exported from the `words.js` file picked randomly using the `randomChoice()` function exported from the `helpers.js` file.
- Props
  - `numGuesses`: Stores the number of guesses that the user can make. Default is `6`.
  - `images`: An array that stores images for each wrong guess. Default array has 6 images.
- Methods
  - `restartGame()`: Simply resets all the three properties in the state.
  - `getCurrWord()`: Splits the `word` into an array and then maps the elements of the array to either a letter or an underscore depending whether the letter is present in `guessedLetters` set or not. **NOTE**: The array is directly put for rendering it doesn't need to be converted back to a string, because if an array is put inside some JSX tags then it is parsed and the elements of the array are laid out one by one automatically.
  - `handleClick(event)`: This is triggered when any button is clicked, and it updates the state accordingly. Adds the letter to the `guessedLetters` set and increments the `numWrongGuesses` by one if the `word` does not include the letter.
  - `generateButtons()`: Simply maps all english alphabets into a button. The button has a `disabled` attribute that is enabled when the letter corresponding to the button is present in the `guessedLetters` set. _Code:_ `disabled={this.state.guessedLetters.has(ltr)}`.
- Rendering: There's alot of conditional rendering in this component that is based on two conditions whether the game is won or not and whether the game is over or not.
  - If `!gameover` then display the array that is returned by the `getCurrWord()` method otherwise display the `word`.
  - If `won` then display _You won_.
  - If `gameover` then display _You Lose_.
  - If `!won && !gameOver` then display the buttons and the number of attempts left.
  - If `won || gameOver` then display the restart button.

**NOTE**:

- We are using the `this` keyword in these three methods - `getCurrWord()`, `handleClick(event)`, `restartGame()`, but we need to bind only the last two, there's no need to bind the `getCurrWord()` method, this is because the `getCurrWord()` method is being called from the component itself, whereas the other two methods are actually being passed as callbacks to click events, which is actually modifying the `this` keyword.
- And this is the reason why using an inline function resolves the issue because there we dont pass the function as a callback which doesn't change the this context, `<button onClick={() => this.restartGame()} />`.
- Also we need to use an arrow function for doing this because if we don't use an arrow function then we will not be able to call the `restartGame()` method because the `this` context will change.
