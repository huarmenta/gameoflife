/*
 * @Author: alex
 * @Date:   2017-06-17 16:24:13
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-18 23:42:01
 */

class Board {
    /**
     * ["Game of life" board class]
     */
    constructor() {
        // Sets the board structure with a dictionary.
        this.cells = {};
    }
    addCell(cell) {
        // Adds a new cell to the board.
        this.cells[this.formattedCell(cell.x, cell.y)] = cell;
    }
    getCell(x, y) {
        // Returns a cell at the given coordinates x and y.
        return this.cells[this.formattedCell(x, y)];
    }
    formattedCell(x, y) {
        // Defines the cell format e.g. x0x0, x0y1, x1y1
        return "x" + x + "y" + y;
    }
    getLivingNeighbors(cell) {
        // Returns all the living cells around a given cell.
        let livingCells = 0;
        // Find a way to refactor this without for loops (recursion?)
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                let currentCell = !(i === 0 && j === 0) && this.getCell(cell.x + i, cell.y + j);
                (currentCell && currentCell.isAlive()) && livingCells++;
            }
        }
        return livingCells;
    }
    nextGeneration() {
        /**
         * Updates each cell of the board with its new state
         * to get the next board generation
         */
        // Find another way to update the board without cloning a cell and adding it to a temp board
        let newBoard = {};
        for (let c in this.cells) {
            let cell = this.cells[c];
            let newCell = cell.clone();
            newCell.alive = cell.nextState(this);
            newBoard[c] = newCell;
        }
        this.cells = newBoard;
    }
}

/**
 * Game of life transition rules
 * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any live cell with more than three live neighbours dies, as if by overpopulation.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
const rules = {
    0: false,
    1: false,
    2: true,
    3: true,
};
//

class Cell {
    /**
     * [Cell class]
     * @param  {[type]} x     [horizontal position on the board]
     * @param  {[type]} y     [vertical position on the board]
     * @param  {[type]} alive [Current cell status (Alive=true, Dead=false)]
     */
    constructor(x, y, alive) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }
    isAlive() {
        return this.alive;
    }
    nextState(board) {
        /**
         * Returns true or false depending on the game of life rules.
         * Uses the rules dictionary declared above,
         * to hash the next state for the cell.
         */
        return rules[board.getLivingNeighbors(this)] || false;
    }
    clone() {
        return new Cell(this.x, this.y, this.alive);
    }
}

export {
    Board,
    Cell
}