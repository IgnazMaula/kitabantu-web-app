import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import {
    BellIcon,
    BriefcaseIcon,
    ChatIcon,
    CogIcon,
    DocumentSearchIcon,
    HomeIcon,
    MenuAlt2Icon,
    QuestionMarkCircleIcon,
    UserIcon,
    XIcon,
    CheckIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../shared/context/auth-context';
import AdminStat from './AdminStat';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminManageUsers() {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                // setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/users/provider-and-client');
                const responseData = await response.json();
                setUsers(responseData.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getUsers();
    }, [users]);

    const manageUserHandler = async (userId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/update/client-status/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isActive: newStatus,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            console.log(error);
        }
        console.log('terganti');
    };

    return (
        <>
            <div>
                {/* Content area */}
                <div>
                    <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                        <main className='flex-1'>
                            <div className='relative mx-auto md:px-8 xl:px-0'>
                                <div>
                                    <div className='px-4 sm:px-6 md:px-0'>
                                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Manage Users</h1>
                                        <p className='mt-2 text-sm text-gray-500'>Manage all user that registed in KitaBantu.</p>
                                    </div>
                                    {isLoading ? (
                                        <div className='text-center p-24'>
                                            <LoadingSpinner />
                                        </div>
                                    ) : (
                                        <div className='px-4 sm:px-6 md:px-0'>
                                            <div className='py-6'>
                                                <div className='flex flex-col'>
                                                    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                                                        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                                                            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                                                                <table className='min-w-full divide-y divide-gray-200'>
                                                                    <thead className='bg-gray-50'>
                                                                        <tr>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            >
                                                                                Name
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            >
                                                                                Role
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            >
                                                                                Status
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            >
                                                                                Location
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            >
                                                                                IC Number
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            ></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='bg-white divide-y divide-gray-200'>
                                                                        {users.map((user) => (
                                                                            <tr key={user.email}>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    <div className='flex items-center'>
                                                                                        <div className='flex-shrink-0 h-10 w-10'>
                                                                                            <img
                                                                                                className='object-right object-cover h-full w-full rounded-full '
                                                                                                src={`http://localhost:5000/${user.image}`}
                                                                                                alt=''
                                                                                            />
                                                                                        </div>
                                                                                        <div className='ml-4'>
                                                                                            <div className='text-sm font-medium text-gray-900'>
                                                                                                {user.name}
                                                                                            </div>
                                                                                            <div className='text-sm text-gray-500'>{user.email}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    <div className='text-sm text-gray-900 font-semibold'>
                                                                                        {user.role}
                                                                                    </div>
                                                                                    <div className='text-sm text-gray-500'>{user.department}</div>
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    {user.isActive ? (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                                                            Active
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                                                                                            Not Active
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                                                    {user.location}
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                                                    {user.identityNumber}
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                                                                    <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                                                                                        {user.role === 'Provider' ? (
                                                                                            <NavLink to={`/provider-profile/${user.id}`}>
                                                                                                <button className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                                                                                    <span>User Details</span>
                                                                                                    <UserIcon
                                                                                                        className='w-6 h-6 text-blue-500 ml-2'
                                                                                                        aria-hidden='true'
                                                                                                    />
                                                                                                </button>
                                                                                            </NavLink>
                                                                                        ) : (
                                                                                            <NavLink to={`/client-profile/${user.id}`}>
                                                                                                <button className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                                                                                    <span>User Details</span>
                                                                                                    <UserIcon
                                                                                                        className='w-6 h-6 text-blue-500 ml-2'
                                                                                                        aria-hidden='true'
                                                                                                    />
                                                                                                </button>
                                                                                            </NavLink>
                                                                                        )}
                                                                                        {user.isActive ? (
                                                                                            <button
                                                                                                onClick={() => manageUserHandler(user.id, false)}
                                                                                                className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
                                                                                            >
                                                                                                <span>Deactivate User</span>
                                                                                                <XIcon
                                                                                                    className='w-6 h-6 text-red-500 ml-2'
                                                                                                    aria-hidden='true'
                                                                                                />
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button
                                                                                                onClick={() => manageUserHandler(user.id, true)}
                                                                                                className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
                                                                                            >
                                                                                                <span>Activate User</span>
                                                                                                <CheckIcon
                                                                                                    className='w-6 h-6 text-green-500 ml-2'
                                                                                                    aria-hidden='true'
                                                                                                />
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
