import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Pagination = ({ currentPage, pagesTotal }) => {
  const pages = [];
  for (let i = 1; i <= pagesTotal; i++) {
    pages.push(i);
  }
  const pageButtons = currentPage === 1
    ? pages.slice(0, 3)
    : currentPage === pagesTotal
      ? pages.slice(-3)
      : pages.slice(currentPage - 2, currentPage + 1);
  return (
    <nav>
      <ul className='pagination justify-content-center'>
        <li className={`${!(currentPage - 1) ? 'disabled ' : ''}page-item`}>
          <Link className='page-link' to={`/list/${currentPage - 1}`}>
            Previous
          </Link>
        </li>
        {pageButtons.map((page) => <NavLink key={page} className='page-item' to={`/list/${page}`}><span className='page-link'>{page}</span></NavLink>)}
        <li className={`${!(currentPage < pagesTotal) ? 'disabled ' : ''}page-item`}>
          <Link className='page-link' to={`/list/${currentPage + 1}`}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
