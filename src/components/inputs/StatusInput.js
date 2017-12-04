import React from 'react';

const StatusInput = ({ status, updateStatus, children }) => {
  return (
    <div className='form-check min-h-40'>
      <div className="row no-gutters justify-content-between">
        <div className='col-auto'>
          <label className='form-check-label col-auto'>
            <input
              type='checkbox'
              className='form-check-input'
              checked={status === 10}
              onChange={updateStatus}
            />
            Done
          </label>
        </div>
        {children}
      </div>
    </div>
  );
};

export default StatusInput;
