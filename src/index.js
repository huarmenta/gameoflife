import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import BoardComponent from './components/Board'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BoardComponent />, document.getElementById('root'));
registerServiceWorker();
