/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export default function Register() {
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
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 pt-12'>Register as Provider</h2>
                        <p className='mt-2 text-center text-sm text-gray-600'>
                            Or{' '}
                            <Link to='/login' className='font-medium text-red-600 hover:text-red-500'>
                                Login to Your Account
                            </Link>
                        </p>
                    </div>
                    <form className='space-y-6' action='#' method='POST'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email address
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div className='mt-6 grid grid-cols-4 gap-6'>
                            <div className='col-span-4 sm:col-span-2'>
                                <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                                    First name
                                </label>
                                <input
                                    type='text'
                                    name='first-name'
                                    id='first-name'
                                    autoComplete='cc-given-name'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                    placeholder='Ignaz'
                                    disabled
                                />
                            </div>

                            <div className='col-span-4 sm:col-span-2'>
                                <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                                    Last name
                                </label>
                                <input
                                    type='text'
                                    name='last-name'
                                    id='last-name'
                                    autoComplete='cc-family-name'
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                    placeholder='Maula'
                                    disabled
                                />
                            </div>
                        </div>
                        <div>
                            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div> */}
                            {/* <input datepicker type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                        </div>

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
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                                />
                                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                                    Remember me
                                </label>
                            </div>

                            <div className='text-sm'>
                                <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
