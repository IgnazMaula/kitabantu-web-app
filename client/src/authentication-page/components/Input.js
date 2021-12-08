import React, { useReducer, useEffect } from 'react';

import { validate } from '../../shared/util/validators';
// import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        // className={`input ${!inputState.isValid && inputState.isTouched && 'inputError'}`}
        className={!inputState.isValid && inputState.isTouched ? 'inputError' : 'input'}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={inputState.value} />
    );

  return (
    <div>
      <label htmlFor={props.id} className='block text-sm font-medium text-gray-700'>
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className='mt-2 text-sm text-red-600' id='email-error'>
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
