import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './App.scss';

import HomePage from '../../pages/HomePage';
import { presentationEnums } from './enums';

const { routeNames } = presentationEnums;

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={routeNames.home}>
          <HomePage />
        </Route>
        <Route exact path={`${routeNames.home}:comicNumber`}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};
