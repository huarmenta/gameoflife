/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-23 00:22:35
 */
import React from 'react';
import classNames from 'classnames'

class CellComponent extends React.Component {
    /**
     * [Creates the Cell component]
     * @param  {[cell]} cell  [Bind the cell object to the component]
     */
    constructor(props){
        super(props);
        this.cell = props.cell;
        this.invertAlive = this.invertAlive.bind(this);
    }
    invertAlive() {
        // Sets the invert state of the cell alive attribute.
        this.props.onCellClick(this.cell);
    }
    render() {
        let classnames = classNames("cell", this.props.cell.isAlive() ? "alive" : "");
        return (
            <div id={this.props.id}
                className={classnames}
                onClick={this.invertAlive}/>
        );
    }
}

export default CellComponent
