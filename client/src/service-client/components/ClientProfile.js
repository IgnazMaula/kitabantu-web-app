import { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

const ClientProfile = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                <div className='max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0'>
                    <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Profile</h1>
                    <p className='mt-2 text-sm text-gray-500'>View and edit the details of your account profile.</p>
                </div>
            </div>
            <div className>
                <form action='#' method='POST'>
                    <div className='sm:rounded-md sm:overflow-hidden'>
                        <div className='bg-white py-6 px-4 sm:p-6'>
                            <div className='flex flex-col items-center mb-16'>
                                <div className='mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0'>
                                    <p className='text-sm font-medium text-gray-700 text-center mb-4' aria-hidden='true'>
                                        Profile Picture
                                    </p>
                                    <div className='mt-1 lg:hidden'>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12' aria-hidden='true'>
                                                <img className='rounded-full h-full w-full' src={auth.loggedUser.image} alt='' />
                                            </div>
                                            <div className='ml-5 rounded-md shadow-sm'>
                                                <div className='group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500'>
                                                    <label
                                                        htmlFor='mobile-user-photo'
                                                        className='relative text-sm leading-4 font-medium text-gray-700 pointer-events-none'
                                                    >
                                                        <span>Change</span>
                                                        <span className='sr-only'> user photo</span>
                                                    </label>
                                                    <input
                                                        id='mobile-user-photo'
                                                        name='user-photo'
                                                        type='file'
                                                        className='absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='hidden relative rounded-full overflow-hidden lg:block'>
                                        <img className='relative rounded-full w-40 h-40' src={auth.loggedUser.image} alt='' />
                                        <label
                                            htmlFor='desktop-user-photo'
                                            className='absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100'
                                        >
                                            <span>Change</span>
                                            <span className='sr-only'> user photo</span>
                                            <input
                                                type='file'
                                                id='desktop-user-photo'
                                                name='user-photo'
                                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md'
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6 grid grid-cols-6 gap-6'>
                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='name' className='block text-md font-medium text-gray-700'>
                                        Name
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.name}</p>
                                </div>

                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='email' className='block text-md font-medium text-gray-700'>
                                        Email Address
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.email}</p>
                                </div>

                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='occupation' className='block text-md font-medium text-gray-700'>
                                        Occupation
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.occupation}</p>
                                </div>

                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='gender' className='block text-md font-medium text-gray-700'>
                                        Gender
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.gender}</p>
                                </div>

                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='location' className='block text-md font-medium text-gray-700'>
                                        Location
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.location}</p>
                                </div>

                                <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='gender' className='block text-md font-medium text-gray-700'>
                                        User Type
                                    </label>
                                    <p className='text-md mt-1  '>{auth.loggedUser.role}</p>
                                </div>

                                {/* <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
                                        Location
                                    </label>
                                    <select
                                        disabled
                                        id='country'
                                        name='country'
                                        autoComplete='country-name'
                                        className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                    >
                                        <option>Jakarta</option>
                                        <option>Surabaya</option>
                                        <option>Bali</option>
                                    </select>
                                </div> */}

                                {/* <div className='col-span-4 sm:col-span-2'>
                                    <label htmlFor='postal-code' className='block text-sm font-medium text-gray-700'>
                                        ZIP / Postal code
                                    </label>
                                    <input
                                        type='text'
                                        name='postal-code'
                                        id='postal-code'
                                        autoComplete='postal-code'
                                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                    />
                                </div> */}
                            </div>
                        </div>
                        <div className='px-4 py-3 sm:px-6 text-right'>
                            <button
                                type='submit'
                                className='bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientProfile;
