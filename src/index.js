import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// bootstrap and font awesome
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

// css
import './index.css';

ReactDOM.render( <App /> , document.getElementById('root'));
registerServiceWorker();
