import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSelectedTask } from '../store/actions/creators';

class Task extends Component {
  handleEditClick = () => {
    this.props.setSelectedTask(this.props.task);
  };

  render() {
    const { task, user, location } = this.props;
    const isEditAllowed = user && !location.pathname.match(/^\/edit\//);
    return (
      <div className='card d-inline-block'>
        <div className='card-img'>
          {task.image_path
            ? <img className='card-img-top' src={task.image_path} alt='Task'/>
            : <div className='card-img-placeholder'>
              <div className='stripes'>
                <div className='no-image'><em>No Image</em></div>
              </div>
            </div>
          }
        </div>
        <div className='card-body'>
          <h4 className='card-title'>{task.text || <em>No text specified</em>}</h4>
          <div className='card-text'>
            {task.username
              ? <h5>
                  <span>From </span>
                  {task.email
                    ? <a href={`mailto:${task.email}`}>{task.username}</a>
                    : task.username
                  }
                </h5>
              : <h5><em>No username specified</em></h5>
            }
            <h5>
              <span>Done: </span>
              <input readOnly={true} type='checkbox' checked={task.status === 10}/>
            </h5>
          </div>
          {isEditAllowed &&
            <Link to={`/edit/${task.id}`} onClick={this.handleEditClick} className='btn btn-primary'>Edit</Link>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTask: (task) => dispatch(setSelectedTask(task))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));
