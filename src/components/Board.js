/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-21 23:49:29
 */
import React from 'react';
import {Board} from "../app/gameoflife.js"
import CellComponent from "./Cell"

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.board = new Board(50, 50);
        this.board.createBoard();
        this.state = {cells: this.board.cells}
    }
    /*componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.board.nextGeneration();
        this.setState({cells: this.board.cells});
    }*/
    rowCells() {
      let rows = [...Array(this.board.rows).keys()];
      let cols = [...Array(this.board.rows).keys()];
      return rows.map((row) => {
       return <div key={row} className="row">
          {
            cols.map((col) => {
              let cell = this.board.getCell(row, col);
              return <CellComponent id={cell.getFormatteCell()} key={cell.getFormatteCell()} cell={cell}/>
            })
          }
          </div>

      })
    }
    render() {
        return (
            <div id="board" className={this.props.className}>
                {this.rowCells()}
            </div>
        );
    }
}

export default BoardComponent;
