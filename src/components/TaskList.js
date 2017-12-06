import React, { Component } from 'react';
import Task from './Task';
import Pagination from './Pagination';
import { withRouter } from 'react-router-dom';
import { getTasks } from '../api';
import bigWhiteLoader from '../images/big-white-loader.gif';

const MAX_TASKS_PER_PAGE = 3;

class TaskList extends Component {
  state = {
    loading: true,
    tasks: [],
    pagesTotal: null,
    sortingField: 'id',
    sortingOrder: 'desc'
  };

  fetchTasks = (page, sortingField, sortingOrder) => {
    this.setState({
      loading: true
    });
    getTasks({ page, sort_field: sortingField, sort_direction: sortingOrder })
      .then(({ message: { tasks, total_task_count }}) => {
        this.setState({
          loading: false,
          tasks,
          pagesTotal: Math.ceil(total_task_count/MAX_TASKS_PER_PAGE)
        })
    });
  };

  setSorting = ({ target }) => {
    if (this.state.sortingField !== target.dataset.field) {
      this.setState({
        sortingField: target.dataset.field,
        sortingOrder: 'asc'
      });
    } else {
      this.setState((prevState) => {
        return {
          sortingOrder: prevState.sortingOrder === 'asc' ? 'desc' : 'asc'
        };
      });
    }
  };

  componentDidMount() {
    this.fetchTasks(+this.props.match.params.page, this.state.sortingField, this.state.sortingOrder);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTasks(+nextProps.match.params.page, this.state.sortingField, this.state.sortingOrder);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.sortingField !== this.state.sortingField || nextState.sortingOrder !== this.state.sortingOrder) {
      this.fetchTasks(+nextProps.match.params.page, nextState.sortingField, nextState.sortingOrder);
    }
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>TaskList</h1>
        <div>
          Sort by:
          {['id', 'username', 'email', 'status'].map((fieldName) =>
            <button
              key={fieldName}
              className={`btn sorting-button btn-${this.state.sortingField === fieldName ? 'secondary' : 'light'} btn-sm`}
              data-field={fieldName}
              onClick={this.setSorting}
            >
              {fieldName}{this.state.sortingField === fieldName ? (this.state.sortingOrder === 'asc' ? '↑' : '↓') : null}
            </button>
          )}
        </div>
        <div className='row justify-content-around tasks-list'>
          {this.state.loading
            ? <img src={bigWhiteLoader} alt='Loading Indicator' />
            : this.state.tasks.map((task) => <Task key={task.id} task={task} />)
          }
        </div>
        {this.state.pagesTotal &&
          <Pagination currentPage={+this.props.match.params.page} pagesTotal={this.state.pagesTotal} />
        }
      </div>
    );
  }
}

export default withRouter(TaskList);
