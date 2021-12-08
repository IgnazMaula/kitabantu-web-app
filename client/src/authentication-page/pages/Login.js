import { useState, useContext } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../../authentication-page/components/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

export default function Login() {
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
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Login to Your Account</h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <Link to='/register' className='font-medium text-red-600 hover:text-red-500'>
                Create New Account
              </Link>
            </p>
          </div>
          <form className='mt-8 space-y-6' onSubmit={authSubmitHandler}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div>
              <Input
                element='input'
                id='email'
                type='email'
                placeholder='email'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter a valid email address'
                onInput={inputHandler}
              />
              <div className='py-2'></div>
              <Input
                element='input'
                id='password'
                type='password'
                placeholder='password'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter a valid password, at least 5 characters.'
                onInput={inputHandler}
              />
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
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60'
              >
                {!formState.isValid && (
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <LockClosedIcon className='h-5 w-5 text-red-500 group-hover:text-red-400' aria-hidden='true' />
                  </span>
                )}
                Log In
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
