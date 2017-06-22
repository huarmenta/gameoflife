/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-21 22:49:07
 */
import React from 'react';
import {Board} from "../app/gameoflife.js"
import CellComponent from "./Cell"

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.board = new Board(10, 10);
        this.board.createBoard();
    }
    cells() {
        return Object.keys(this.board.cells).map((key) => {
            return <CellComponent id={key} key={key} cell={this.board.cells[key]}/>;
        });
    }
    render() {
        return <div className={this.props.className}>{this.cells()}</div>;
    }
}

export default BoardComponent;
