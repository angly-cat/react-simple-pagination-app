import React from 'react';

const ImageInput = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='image-input'>Image</label>
      <div className='input-group'>
        <input
          key={props.fileIndex}
          type='file'
          className='form-control'
          accept='image/*'
          id='image-input'
          data-field='text'
          onChange={props.updateImage}
        />
        {props.children}
      </div>
    </div>
  );
};

export default ImageInput;
