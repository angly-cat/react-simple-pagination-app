import React from 'react';
import { Link } from 'react-router-dom';

const Task = (props) => (
  <div className='card d-inline-block'>
    <div className='card-img'>
      {props.task.image_path
        ? <img className='card-img-top' src={props.task.image_path} alt='Task' />
        : <div className='card-img-placeholder'><div className='stripes'><div className='no-image'><em>No Image</em></div></div></div>
      }
    </div>
    <div className='card-body'>
      <h4 className='card-title'>{props.task.text || <em>No text specified</em>}</h4>
      <div className='card-text'>
        {props.task.username
          ? <h5>
              <span>From </span>
              {props.task.email
                ? <a href={`mailto:${props.task.email}`}>{props.task.username}</a>
                : props.task.username
              }
            </h5>
          : <h5><em>No username specified</em></h5>
        }
        <h5>
          <span>Done: </span>
          <input readOnly={true} type='checkbox' checked={props.task.status === 10} />
        </h5>
      </div>
      {props.isEditAllowed &&
        <Link to={`/edit/${props.task.id}`} className='btn btn-primary'>Edit</Link>
      }
    </div>
  </div>
);

export default Task;
