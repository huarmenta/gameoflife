/*
 * @Author: alex
 * @Date:   2017-06-17 16:24:13
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-18 16:47:13
 */

class Board {
    /**
     * ["Game of life" board class]
     * @return {} [dictionary with all the cells added to the board]
     */
    constructor () {
        // Sets the board structure with a dictionary.
        this.cells = {};
    }
    addCell(cell) {
        // Adds a new cell to the board.
        this.cells[this.cellFormat(cell.x, cell.y)] = cell;
    }
    getCell(x, y) {
        // Returns a cell at the given coordinates x and y.
        return this.cells[this.cellFormat(x, y)];
    }
    getLivingNeighbors(cell) {
        // Returns all the living cells around a given cell.
        let x = cell.x;
        let y = cell.y;
        let livingCells = 0;
        let currentCell;

        // Find a way to refactor this without for loops (maybe recursion)
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i === 0 && i == j) {
                    continue;
                }
                currentCell = this.getCell(x + i, y + j);
                currentCell && currentCell.isAlive() ? livingCells++ : 0;
            }
        }
        // /////////////////////////////////////////////////////////////////

        return livingCells;
    }

    cellFormat(x, y) {
        // Defines the cell format e.g. x1y1
        return "x" + x + "y" + y;
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

class Cell {
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
}

export {
    Board,
    Cell
}