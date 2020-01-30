import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Table from './table';
import Info from './info.js';

ReactDOM.render(
    <Router>
        <Route exact path="/" render={() => <Table />}></Route>
        <Route exact path="/info" render={() => <Info />}></Route>
    </Router>,
    document.getElementById('root')
);