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
        this.board = new Board(10, 10);
        this.board.createBoard();
        this.state = {cells: this.board.cells}
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.board.nextGeneration();
        this.setState({cells: this.board.cells});
    }
    cells() {
        return Object.keys(this.state.cells).map((key) => {
            return <CellComponent id={key} key={key} cell={this.state.cells[key]}/>;
        });
    }
    render() {
        return <div id="board" className={this.props.className}>{this.cells()}</div>;
    }
}

export default BoardComponent;
