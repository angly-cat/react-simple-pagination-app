import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import TaskList from './TaskList';
import UpsertTask from './UpsertTask';
import NotFound from './NotFound';

export default () => (
  <main className='container'>
    <Switch>
      <Redirect exact from='/' to='/list/1' />
      <Route exact path='/list/:page' component={TaskList} />
      <Route exact path='/create' component={UpsertTask} />
      <Route exact path='/edit/:id' component={UpsertTask} />
      <Route component={NotFound} />
    </Switch>
  </main>
);
