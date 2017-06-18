/*
 * @Author: alex
 * @Date:   2017-06-17 16:24:13
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-18 15:15:40
 */

class Board {
    /**
     * ["Game of life" board class]
     * @return {} [dictionary with all the cells added to the board]
     */
    constructor() {
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

class Cell {
    constructor(x, y, alive) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }
    isAlive() {
        return this.alive;
    }
}

export {
    Board,
    Cell
}