/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-20 21:55:26
 */
import React from 'react';
import {Board} from "../app/gameoflife.js"
import CellComponent from './Cell.js'

const board = new Board(10, 10); // Initialize board of 10x10 cells
board.createBoard(); // create board

const cells = Object.keys(board.cells).map(key => {
  return <CellComponent id={key} key={key} />
});

class BoardComponent extends React.Component {
    render() {
        return <div className="board">{cells}</div>;
    }
}

export default BoardComponent
