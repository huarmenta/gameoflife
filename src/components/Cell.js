/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-21 23:51:32
 */
import React from 'react';
import classNames from 'classnames'

class CellComponent extends React.Component {
    constructor(props){
        super(props);
        this.cell = props.cell;
        this.state = {isAlive: this.cell.alive };
        this.invertAlive = this.invertAlive.bind(this);
    }
    invertAlive() {
        this.cell.alive = !this.cell.alive;
        this.setState({isAlive: this.cell.alive});
    }
    render() {
        let classnames = classNames("cell", this.state.isAlive ? "alive" : "");
        return (
                <div id={this.props.id}
                    className={classnames}
                    onClick={this.invertAlive}/>
            );
    }
}

export default CellComponent
