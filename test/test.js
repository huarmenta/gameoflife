/*
 * @Author: alex
 * @Date:   2017-06-17 16:44:39
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-18 16:47:04
 */

import chai from "chai"
import {
    Board,
    Cell
} from "../app/gameoflife.js"

const assert = chai.assert;

describe('Game of life', function() {
    let board;
    let cell;
    before(function() {
        // runs before all tests in this block
        board = new Board();
        cell = new Cell(1, 1, true)
        board.addCell(cell);
    });

    describe('Cell', function() {
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
            it("Should return 1 if there is exactly 1 neighbor alive", function() {
                let neighborCell = new Cell(0, 1, true);
                board.addCell(neighborCell);
                assert.equal(board.getLivingNeighbors(cell), 1);
            });
            it("Should return 8 if all neighbors are alive", function() {
                board.addCell(new Cell(0, 0, true));
                board.addCell(new Cell(0, 1, true));
                board.addCell(new Cell(0, 2, true));
                board.addCell(new Cell(1, 0, true));
                board.addCell(new Cell(1, 2, true));
                board.addCell(new Cell(2, 0, true));
                board.addCell(new Cell(2, 1, true));
                board.addCell(new Cell(2, 2, true));

                assert.equal(board.getLivingNeighbors(cell), 8);
            });
        });
    });

    describe('Game of life transition rules by counting living neighbors', function() {
        it("Should pass if any live cell with fewer than two live neighbors dies, as if caused by underpopulation", function() {
            board.addCell(new Cell(0, 0, true));
            board.addCell(new Cell(0, 1, false));
            board.addCell(new Cell(0, 2, false));
            board.addCell(new Cell(1, 0, false));
            board.addCell(new Cell(1, 2, false));
            board.addCell(new Cell(2, 0, false));
            board.addCell(new Cell(2, 1, false));
            board.addCell(new Cell(2, 2, false));

            assert.isBelow(board.getLivingNeighbors(cell), 2, "Cell dies");
        });
        it("Should pass if any live cell with two or three live neighbors lives on to the next generation.", function() {
            board.addCell(new Cell(0, 0, true));
            board.addCell(new Cell(0, 1, true));
            board.addCell(new Cell(0, 2, true));
            board.addCell(new Cell(1, 0, false));
            board.addCell(new Cell(1, 2, false));
            board.addCell(new Cell(2, 0, false));
            board.addCell(new Cell(2, 1, false));
            board.addCell(new Cell(2, 2, false));

            assert.equal(board.getLivingNeighbors(cell), 3);
        });
        it("Should pass if any live cell with more than three live neighbors dies, as if by overpopulation.", function() {
            board.addCell(new Cell(0, 0, true));
            board.addCell(new Cell(0, 1, true));
            board.addCell(new Cell(0, 2, true));
            board.addCell(new Cell(1, 0, true));
            board.addCell(new Cell(1, 2, true));
            board.addCell(new Cell(2, 0, false));
            board.addCell(new Cell(2, 1, false));
            board.addCell(new Cell(2, 2, false));

            assert.isAtLeast(board.getLivingNeighbors(cell), 4);
        });
        it("Should pass if any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.", function() {
            let deadCell = new Cell(1, 1, false);
            let deadBoard = new Board();
            deadBoard.addCell(new Cell(0, 0, true));
            deadBoard.addCell(new Cell(0, 1, true));
            deadBoard.addCell(new Cell(0, 2, true));
            deadBoard.addCell(new Cell(1, 0, false));
            deadBoard.addCell(new Cell(1, 2, false));
            deadBoard.addCell(new Cell(2, 0, false));
            deadBoard.addCell(new Cell(2, 1, false));
            deadBoard.addCell(new Cell(2, 2, false));

            assert.equal(deadBoard.getLivingNeighbors(deadCell), 3);
        });
    });

    describe('Game of life transition rules by calculating cells next states', function() {
        let board, cell;
        beforeEach(function() {
            board = new Board();
            cell = new Cell(1, 1, true);
            board.addCell(cell);
        });
        it("Any live cell with fewer than two live neighbors dies, as if caused by underpopulation", function() {
            board.addCell(new Cell(0, 0, true));
            assert.isFalse(cell.nextState(board), "No!!, i'm about to hang the sneakers!");
        });
        it("Any live cell with two or three live neighbors lives on to the next generation.", function() {
            board.addCell(new Cell(0, 0, true));
            board.addCell(new Cell(0, 1, true));

            assert.isTrue(cell.nextState(board), "Yes!!, i'll be back!");
        });
        it("Any live cell with more than three live neighbors dies, as if by overpopulation.", function() {
            board.addCell(new Cell(0, 0, true));
            board.addCell(new Cell(0, 1, true));
            board.addCell(new Cell(0, 2, true));
            board.addCell(new Cell(1, 0, true));
            board.addCell(new Cell(1, 2, true));

            assert.isFalse(cell.nextState(board), "No!!, the clown will carry me!");
        });
        it("Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.", function() {
            let deadCell = new Cell(1, 1, false);
            let deadBoard = new Board();
            deadBoard.addCell(new Cell(0, 0, true));
            deadBoard.addCell(new Cell(0, 1, true));
            deadBoard.addCell(new Cell(0, 2, true));
            deadBoard.addCell(new Cell(1, 0, false));
            deadBoard.addCell(new Cell(1, 2, false));
            deadBoard.addCell(new Cell(2, 0, false));
            deadBoard.addCell(new Cell(2, 1, false));
            deadBoard.addCell(new Cell(2, 2, false));

            assert.isTrue(deadCell.nextState(deadBoard), "It's alive! It's aliiiiive!!");
        });
    });
});