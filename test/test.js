/*
 * @Author: alex
 * @Date:   2017-06-17 16:44:39
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-20 21:05:25
 */

import chai from "chai"
import {
    Board,
    Cell
} from "../src/app/gameoflife.js"

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

        describe('Next board generation', function() {
            it("Should get the new state for all dying cells", function() {
                board.addCell(new Cell(0, 0, true));
                board.nextGeneration();

                assert.isFalse(board.getCell(0, 0).isAlive(), "Dead!");
                assert.isFalse(board.getCell(1, 1).isAlive(), "Dead!");
            });
            it("Should get the new state for all living cells", function() {
                board.addCell(new Cell(0, 0, true));
                board.addCell(new Cell(1, 2, true));
                board.nextGeneration();

                assert.isFalse(board.getCell(0, 0).isAlive(), "Dead!");
                assert.isTrue(board.getCell(1, 1).isAlive(), "Alive!");
            });
            it("Should get the new state for 9 cells", function() {
                board.addCell(new Cell(0, 0, false));
                board.addCell(new Cell(0, 1, true));
                board.addCell(new Cell(0, 2, true));
                board.addCell(new Cell(1, 0, true));
                board.addCell(new Cell(1, 2, false));
                board.addCell(new Cell(2, 0, false));
                board.addCell(new Cell(2, 1, true));
                board.addCell(new Cell(2, 2, true));
                board.nextGeneration();

                assert.isTrue(board.getCell(0, 0).isAlive(), "Like new!");
                assert.isTrue(board.getCell(0, 1).isAlive(), "Alive!");
                assert.isTrue(board.getCell(0, 2).isAlive(), "Alive!");
                assert.isTrue(board.getCell(1, 0).isAlive(), "Alive!");
                assert.isFalse(board.getCell(1, 1).isAlive(), "Dead!");
                assert.isFalse(board.getCell(1, 2).isAlive(), "Dead!");
                assert.isTrue(board.getCell(2, 0).isAlive(), "Like new!");
                assert.isTrue(board.getCell(2, 1).isAlive(), "Alive!");
                assert.isTrue(board.getCell(2, 2).isAlive(), "Alive!");
            });
        });
    });
    describe('Create new board', function() {
        it("Should create a 10x10 board with random alive cells", function() {
            let board = new Board();
            board.createBoard(10, 10);
            assert.isNotFalse(board.getCell(10, 10), "Great! Cell created and found!");
        })
    });
});