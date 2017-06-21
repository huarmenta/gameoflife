/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-20 21:55:26
 */
import React from 'react';
import Board from '../app/gameoflife.js'
import Cell from '../app/gameoflife.js'

'use strict';

class BoardComponent extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="row">
                    <div className="cell">
                    </div>
                    <div className="cell">
                    </div>
                    <div className="cell">
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                    </div>
                    <div className="cell">
                    </div>
                    <div className="cell">
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardComponent