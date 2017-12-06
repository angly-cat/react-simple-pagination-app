import React from 'react';

const TextInput = ({ fieldName, fieldValue, updateTextField, disabled, children }) => {
  const fieldNameWithCapital = `${fieldName[0].toUpperCase()}${fieldName.slice(1)}`;
  return (
    <div className='form-group'>
      <label htmlFor={`${fieldName}-input`}>{fieldNameWithCapital}</label>
      <div className='input-group'>
        <input
          type={(fieldName === 'email' || fieldName === 'password') ? fieldName : 'text'}
          className='form-control'
          id={`${fieldName}-input`}
          data-field={fieldName}
          placeholder={`Enter ${fieldName}`}
          value={fieldValue}
          onChange={updateTextField}
          disabled={disabled}
          required
        />
        {children}
      </div>
    </div>
  );
};

export default TextInput;
