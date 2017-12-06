import React from 'react';
import FlashMessages from './FlashMessages';

const Content = ({ children }) => {
  return (
    <main className='container'>
      <FlashMessages />
      {children}
    </main>
  );
};

export default Content;
