import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Settings } from './components/Settings';
import { Game } from './components//Game';

const ApplicationTag = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3f51b5;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Application = () => {
  return (
    <ApplicationTag>
      <Switch>
        <Route exact path="/" component={Settings} />
        <Route path="/game" component={Game} />
        <Redirect to="/" />
      </Switch>
    </ApplicationTag>
  );
};
