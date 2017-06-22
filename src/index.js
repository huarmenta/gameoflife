import React from 'react';
import ReactDOM from 'react-dom';
import BoardComponent from './components/Board'
import registerServiceWorker from './registerServiceWorker';
import './index.css';


// Render board component
let board = (<BoardComponent className="board"/>);
ReactDOM.render(board, document.getElementById('root'));
registerServiceWorker();
