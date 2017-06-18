/*
 * @Author: alex
 * @Date:   2017-06-17 16:44:39
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-18 13:50:43
 */

import chai from "chai"
import {
    Board,
    Cell
} from "../app/gameoflife.js"

const assert = chai.assert;

describe('board_cell', function() {
    // Initial setup
    let board;
    let cell;

    beforeEach(function() {
        board = new Board();
        cell = new Cell(1, 1, true);
        board.addCell(cell);
    });

    // Descripted tests
    describe('addCell', function() {
        it("Should add a cell to the board", function() {
            assert.equal(board.cells.x1y1, cell);
        });
    });
    describe('getCell', function() {
        it("Should get a cell from the given coordinates", function() {
            assert.equal(board.getCell(1, 1), cell);
        });
    });
    describe('getLivingNeighbors', function() {
        it('Should return 0 if there are no neighbors alive', function() {
            assert.equal(board.getLivingNeighbors(cell), 0);
        });
    });
    describe('getLivingNeighbors', function() {
        it('Should return 1 if there is exactly 1 neighbor alive', function() {
            let n = new Cell(0, 1, true);
            board.addCell(n);
            assert.equal(board.getLivingNeighbors(cell), 1);
        });
    });
});