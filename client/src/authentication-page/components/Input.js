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

    let element;

    if (props.element === 'input') {
        element = (
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
        );
    } else if (props.element === 'option') {
        element = (
            <select
                id={props.id}
                onChange={changeHandler}
                // value={inputState.value}
                className='block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
            >
                {props.option.map((o) => (
                    <option value={o} key={o}>
                        {o}
                    </option>
                ))}
            </select>
        );
    } else if (props.element === 'radio') {
        element = (
            <fieldset className='mt-4'>
                <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                    {props.option.map((o) => (
                        <div key={o.option} className='flex items-center'>
                            <input
                                id={o.option}
                                onChange={changeHandler}
                                name='notification-method'
                                type={props.type}
                                // defaultChecked={props.option[0].value}
                                value={o.value}
                                className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                            />
                            <label htmlFor={o} className='ml-3 block text-sm font-medium text-gray-700'>
                                {o.option}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        );
    } else {
        element = (
            <textarea
                id={props.id}
                rows={props.rows || 4}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
            />
        );
    }

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
