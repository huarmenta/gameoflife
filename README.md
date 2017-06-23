# Game of life
John Conway's "Game of life" made with Javascript ES6

## Getting started

The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.

### Rules

* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

### Installing

Follow the instructions to run the game properly


Installing node/npm (or any package manager of your choice)

```
sudo apt-get install nodejs
```
Check npm version
```
node -v
npm -v
```

Installing GIT

```
sudo apt-get install git
```
Check GIT version
```
git --version
```

Getting a copy of the repository
```
git clone https://github.com/alexharmenta/gameoflife
```
```
cd gameoflife
```

Installing the dependencies
```
npm install
```

## Test
Running tests
```
npm run test
```

### Play the game
This will start a server on localhost:3000 to visualize the game
```
npm start
```


## Built With

* [ReactJS](https://facebook.github.io/react/) - The web framework used
* [ES6](https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla) - Dependency Management

## Authors

* **Alex Armenta** - *Initial work* - [Alex Armenta](https://github.com/alexharmenta)

See also the list of [contributors](https://github.com/alexharmenta/gameoflife/contributors) who participated in this project.
