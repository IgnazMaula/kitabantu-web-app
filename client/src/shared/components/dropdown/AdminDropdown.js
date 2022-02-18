/* This example requires Tailwind CSS v2.0+ */
import { useContext } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CollectionIcon, ClipboardCheckIcon, UsersIcon, MenuIcon, UserCircleIcon, ViewGridAddIcon, LogoutIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminDropdown() {
    const auth = useContext(AuthContext);
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <Menu.Button className='rounded-full flex items-center text-gray-400'>
                    <UserCircleIcon className='w-6 h-6 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10'>
                    <div className='py-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/profile'
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm'
                                    )}
                                >
                                    <UserCircleIcon className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    My Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/manage-request'
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm'
                                    )}
                                >
                                    <ClipboardCheckIcon className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    Manage Service Request
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className='py-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/manage-users'
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm'
                                    )}
                                >
                                    <UsersIcon className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    Manage Users
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to='/manage-services'
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm'
                                    )}
                                >
                                    <CollectionIcon className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    Manage Services
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className='py-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={auth.logout}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <LogoutIcon className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    Logout
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
