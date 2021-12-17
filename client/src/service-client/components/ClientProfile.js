import { useContext } from 'react';

import ClientBookmarks from './ClientBookmarks';
import ClientReviews from './ClientReviews';
import ServiceHistory from './ServiceHistory';
import { AuthContext } from '../../shared/context/auth-context';

const ClientProfile = (props) => {
    const auth = useContext(AuthContext);
    if (props.activeMenu === 'My Profile') {
        return (
            <div>
                <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                    <div className='max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Profile</h1>
                        <p className='mt-2 text-sm text-gray-500'>
                            Check the status of recent orders, manage returns, and discover similar products.
                        </p>
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
                                                    <img className='rounded-full h-full w-full' src={props.user.imageUrl} alt='' />
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

                                <div className='mt-6 grid grid-cols-4 gap-6'>
                                    <div className='col-span-4 sm:col-span-2'>
                                        <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            name='first-name'
                                            id='first-name'
                                            autoComplete='cc-given-name'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder={auth.loggedUser.name}
                                            disabled
                                        />
                                    </div>

                                    <div className='col-span-4 sm:col-span-2'>
                                        <label htmlFor='email-address' className='block text-sm font-medium text-gray-700'>
                                            Email address
                                        </label>
                                        <input
                                            type='text'
                                            name='email-address'
                                            id='email-address'
                                            autoComplete='email'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder='ignazmaula@gmail.com'
                                            disabled
                                        />
                                    </div>

                                    <div className='col-span-4 sm:col-span-2'>
                                        <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                                            Occupation
                                        </label>
                                        <input
                                            type='text'
                                            name='occupation'
                                            id='occupation'
                                            autoComplete='cc-family-name'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder={auth.loggedUser.occupation}
                                            disabled
                                        />
                                    </div>

                                    <div className='col-span-4 sm:col-span-1'>
                                        <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
                                            Gender
                                        </label>
                                        <input
                                            type='text'
                                            name='gender'
                                            id='gender'
                                            autoComplete='cc-exp'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder={auth.loggedUser.gender}
                                            disabled
                                        />
                                    </div>

                                    <div className='col-span-4 sm:col-span-1'>
                                        <label htmlFor='security-code' className='flex items-center text-sm font-medium text-gray-700'>
                                            <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                                                Account Type
                                            </label>
                                        </label>
                                        <input
                                            type='text'
                                            name='security-code'
                                            id='security-code'
                                            autoComplete='cc-csc'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder='Service Client'
                                            disabled
                                        />
                                    </div>

                                    <div className='col-span-4 sm:col-span-2'>
                                        <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                                            Location
                                        </label>
                                        <input
                                            type='text'
                                            name='location'
                                            id='location'
                                            autoComplete='cc-family-name'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                                            placeholder={auth.loggedUser.location}
                                            disabled
                                        />
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
                            <div className='px-4 py-3 text-right sm:px-6'>
                                <button
                                    type='submit'
                                    className='bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
                                >
                                    Edit Details
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else if (props.activeMenu === 'Order History') {
        return <ServiceHistory />;
    } else if (props.activeMenu === 'My Reviews') {
        return <ClientReviews />;
    } else if (props.activeMenu === 'My Bookmarks') {
        return <ClientBookmarks />;
    } else {
        return <h1>Hello</h1>;
    }
};

export default ClientProfile;
