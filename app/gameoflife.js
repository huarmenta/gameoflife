/*
 * @Author: alex
 * @Date:   2017-06-17 16:24:13
 * @Last Modified by:   alex
 * @Last Modified time: 2017-06-18 13:33:55
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
        return 0;
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