/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-23 00:21:26
 */
import React from 'react';
import {Board} from "../app/gameoflife.js"
import CellComponent from "./Cell"
import classNames from 'classnames'

class BoardComponent extends React.Component {
    /**
     * [Class to create Board component,
     * this component has rows and cells rendered too,
     * and buttons that manage its cell states]
     * @param  {[board]} board   [Board object]
     */
    constructor(props) {
        super(props);
        this.board = new Board(50, 50);
        this.board.createBoard(); // Creates cells on board
        this.state = {
            board: this.board,
            running: false,
            generation: 0
        }
        this.tick = this.tick.bind(this);
        this.setCellAlive = this.setCellAlive.bind(this);
        this.playBoard = this.playBoard.bind(this);
        this.stopBoard = this.stopBoard.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
    }
    setCellAlive(cell) {
        // This method sets the new alive attribute to a cell and changes its state.
        this.state.board.cells[cell.getKey()].setAlive(!this.state.board.cells[cell.getKey()].isAlive());
        this.setState({board: this.state.board});
    }
    playBoard() {
        // Starts the process of get new generations of the board cells.
        this.timerID = setInterval(this.tick, 1);
        this.setState({running: true});
    }
    stopBoard() {
        // Stops the process of generations.
        clearInterval(this.timerID);
        this.setState({running: false});
    }
    nextStep() {
        // Sets the next generation step of the board cells.
        this.tick();
    }
    clearBoard() {
        // Sets all the alive cells to dead cells.
        this.state.board.clear();
        this.setState(
            {
                board: this.state.board,
                generation: 0
            }
        );
    }
    tick() {
        // Calls the generation process steps of the board.
        this.state.board.nextGeneration();
        this.setState(
            {
                board: this.state.board,
                generation: this.state.generation + 1
            }
        );
    }
    rowCells() {
        // Renders all the cells in its correspondant row.
        let rows = [...Array(this.state.board.rows).keys()];
        let cols = [...Array(this.state.board.cols).keys()];

        return rows.map(row => {
            return (
                <div key={row} className="row">
                {
                    cols.map(col => {
                        let cell = this.state.board.getCell(row, col);
                        return  (
                            <CellComponent id={cell.getKey}
                                key={cell.getKey()}
                                cell={cell}
                                onCellClick={this.setCellAlive}/>
                        )
                    })
                }
                </div>
            );
        });
    }
    render() {
        let buttonClasses = classNames("button", this.state.running ? "stop" : "play");
        return (
            <div id="top_left_div">
                <div id="board" className={this.props.className}>
                    {this.rowCells()}
                </div>
                <div id="buttons_div">
                    <h3>Generation: {this.state.generation}</h3>
                    <button onClick={this.state.running ? this.stopBoard : this.playBoard} className={buttonClasses}>
                        {this.state.running ? "Stop" : "Play"}
                    </button>
                    <button onClick={!this.state.running && this.nextStep} className="button step">Step</button>
                    <button onClick={!this.state.running && this.clearBoard} className="button clear">Clear</button>
                </div>
            </div>
        );
    }
}

export default BoardComponent;
