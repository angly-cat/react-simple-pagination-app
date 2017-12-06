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
    pagesTotal: null
  };


  fetchTasksByPage = (page) => {
    this.setState({
      loading: true
    });
    getTasks({ page })
      .then(({ message: { tasks, total_task_count }}) => {
        this.setState({
          loading: false,
          tasks,
          pagesTotal: Math.ceil(total_task_count/MAX_TASKS_PER_PAGE)
        })
    });
  };

  componentDidMount() {
    this.fetchTasksByPage(+this.props.match.params.page);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTasksByPage(+nextProps.match.params.page);
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>TaskList</h1>
        <div className='row justify-content-around tasks-list'>
          {this.state.loading
            ? <img src={bigWhiteLoader} alt='Loading Indicator' />
            : this.state.tasks.map((task) => <Task key={task.id} task={task}/>)
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
