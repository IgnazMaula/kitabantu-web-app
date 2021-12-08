import { useState, useContext } from 'react';
import { LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../../authentication-page/components/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

export default function Registration() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      firstName: {
        value: '',
        isValid: false,
      },
      lastName: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <Link to='/'>
              <img className='mx-auto h-12 w-auto' src='../images/icon.png' alt='Workflow' />
            </Link>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Register New Account</h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <Link to='/login' className='font-medium text-red-600 hover:text-red-500'>
                Login to Your Account
              </Link>
            </p>
          </div>
          <form className='space-y-6' onSubmit={authSubmitHandler}>
            <div className='mt-6 grid grid-cols-4 gap-6'>
              <div className='col-span-4 sm:col-span-2'>
                <Input
                  element='input'
                  id='firstName'
                  type='text'
                  label='First Name'
                  placeholder='first name'
                  validators={[VALIDATOR_MINLENGTH(1)]}
                  errorText='Please enter a valid name.'
                  onInput={inputHandler}
                />
              </div>

              <div className='col-span-4 sm:col-span-2'>
                <Input
                  element='input'
                  id='lastName'
                  type='text'
                  label='Last Name'
                  placeholder='last name'
                  validators={[VALIDATOR_MINLENGTH(1)]}
                  errorText='Please enter a valid name.'
                  onInput={inputHandler}
                />
              </div>
            </div>
            <Input
              element='input'
              id='email'
              type='email'
              label='Email'
              placeholder='email'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email address'
              onInput={inputHandler}
            />
            <Input
              element='input'
              id='password'
              type='password'
              label='Password'
              placeholder='password'
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid password, at least 5 characters.'
              onInput={inputHandler}
            />
            <div>
              <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
                Location
              </label>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
              >
                <option>Jakarta</option>
                <option>Surabaya</option>
                <option>Bali</option>
              </select>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='font-medium text-red-600 hover:text-red-500'>
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                disabled={!formState.isValid}
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600  disabled:opacity-60'
              >
                Sign in
              </button>
            </div>
          </form>
          <div className='text-sm text-center'>
            <Link to='/' className='font-medium text-red-600 hover:text-red-500'>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
