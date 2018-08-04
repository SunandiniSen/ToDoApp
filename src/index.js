import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import routes from './routes';

ReactDOM.render(
    <BrowserRouter > 
        {routes}
    </BrowserRouter>, document.getElementById('root'));