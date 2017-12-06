import React, { Component } from 'react';
import Header from './Header';
import ContentWithFlashMessages from './Content';
import { Switch, Redirect, Route } from 'react-router-dom';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import EditTask from './EditTask';
import NotFound from './NotFound';
import LoginForm from './LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ContentWithFlashMessages>
          <Switch>
            <Redirect exact from='/' to='/list/1' />
            <Route exact path='/list/:page' component={TaskList} />
            <Route exact path='/create' component={CreateTask} />
            <Route exact path='/edit/:taskId' component={EditTask} />
            <Route exact path='/login' component={LoginForm} />
            <Route component={NotFound} />
          </Switch>
        </ContentWithFlashMessages>
      </div>
    );
  }
}

export default App;
