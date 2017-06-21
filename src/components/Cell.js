/*
 * @Author: Alex Armenta
 * @Date:   2017-06-20 20:48:35
 * @Last Modified by:   Alex Armenta
 * @Last Modified time: 2017-06-20 21:55:26
 */
import React from 'react';

class CellComponent extends React.Component {
    render() {
        return <div id={this.props.id} className={this.props.className}></div>;
    }
}

export default CellComponent
