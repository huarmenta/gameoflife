import React from 'react';
import ReactDOM from 'react-dom';
import BoardComponent from './components/Board'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Title component
class Title extends React.Component {
  render() {
    let title = "_ Game of life _";
    return <h1>{title}</h1>;
  }
}
ReactDOM.render(<Title/>, document.getElementById('top_right'));

// Rules component
class Rules extends React.Component {
  render() {
    let title = "John Conway's Game of life";
    return (
      <div>
        <h3>{title}</h3>
        <p>
          The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970 <br/>
          The "game" is a zero-player game, meaning that its evolution is determined by its initial state, <br/>
          requiring no further input. <br/>
          One interacts with the Game of Life by creating an initial configuration and observing how it evolves, <br/>
          or, for advanced "players", by creating patterns with particular properties.
        </p>
        <ul>
          <h4>Rules</h4>
          <li>Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ul>
      </div>
    );
  }
}
ReactDOM.render(<Rules />, document.getElementById('bottom_right'));

// Render board component
let board = (<BoardComponent className="board"/>);
ReactDOM.render(board, document.getElementById('top_left'));

registerServiceWorker();
