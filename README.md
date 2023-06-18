# Puyo Puyo Tetramemo

A React memory card app [Puyo Puyo Tetris](https://puyonexus.com/wiki/Puyo_Puyo_Tetris_2) themed game featuring over 40 unique characters. Cards start at 4, but increase by 2 with unique cards each time. Your goal is to click all the cards without clicking it more than once to win the game.

[Live Demo](https://ccolds.github.io/puyo-puyo-tetramemo/)

## Preview

![Preview Image](public/assets/puyo-puyo-tetramemo.png "Preview Image")

## Getting started

```bash
git clone https://github.com/cColds/puyo-puyo-tetramemo.git
cd puyo-puyo-tetramemo
npm install
npm start
```

## Built with

- React
- Hooks
- PropTypes
- SCSS
- Webpack
- ESLint
- Prettier
- uuid

## Features

- Current score
- Best Score
- Shuffle cards using [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
- Lose screen
- Win screen
- Increment cards by 2 per level

## What I learned

- useEffect to set a timer on a dependency, e.g., currentScore or bestScore
- useRef to target the element and add/remove classes to animate it
- forwardRef to pass the parent ref down to a child component
- Use a variable to update the current state and pass it to multiple functions/hooks in one render
