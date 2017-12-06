import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';

const isList = (match, location) => location.pathname.match(/^\/list\//);

const Header = (props) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>
        Beejee test task
      </Link>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <NavLink to='/list/1' className='nav-item' isActive={isList}>
            <span className='nav-link'>List</span>
          </NavLink>
          <NavLink exact to='/create' className='nav-item'>
            <span className='nav-link'>Create</span>
          </NavLink>
        </ul>
        <ul className='navbar-nav my-2 my-lg-0'>
          {props.user
            ? <LogoutButton />
            : <NavLink exact to='/login' className='nav-item'>
                <span className='nav-link'>Login</span>
              </NavLink>
          }
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default withRouter(connect(mapStateToProps)(Header));
