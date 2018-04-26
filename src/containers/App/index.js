import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../../components/Header';
import SnakeGame from '../SnakeGame';
import { getLiteral } from '../../utils/utilities';

export default () => (
  <div>
    <Header title={getLiteral('header.title')} />
    <div className="main-body">
      <Switch>
        <Route exact path="/" component={SnakeGame} />
      </Switch>
    </div>
  </div>
);
