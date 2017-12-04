import React from 'react';

const ImageInput = ({ fileIndex, updateImage, disabled, children }) => {
  return (
    <div className='form-group'>
      <label htmlFor='image-input'>Image</label>
      <div className='input-group'>
        <input
          key={fileIndex}
          type='file'
          className='form-control'
          accept='image/*'
          id='image-input'
          data-field='text'
          onChange={updateImage}
          disabled={disabled}
        />
        {children}
      </div>
    </div>
  );
};

export default ImageInput;
