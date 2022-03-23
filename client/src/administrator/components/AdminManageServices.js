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
    TagIcon,
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

export default function AdminManageServices() {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/services');
                const responseUser = await fetch(`http://localhost:5000/api/users/`);
                const responseData = await response.json();
                const responseDataUser = await responseUser.json();
                setServices(responseData.services);
                setUsers(responseDataUser.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, [setUsers]);

    const getUserName = (userId) => {
        let name = '';
        users.forEach((user) => {
            if (userId === user.id) {
                name = user.name;
            }
        });
        return name;
    };
    const getProviderType = (userId) => {
        let userType = '';
        users.forEach((user) => {
            if (userId === user.id) {
                userType = user.userType;
            }
        });
        return userType;
    };

    const removeService = async (userId, newStatus) => {
        // try {
        //     const response = await fetch(`http://localhost:5000/api/users/update/client-status/${userId}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             isActive: newStatus,
        //         }),
        //     });
        //     const responseData = await response.json();
        //     if (!response.ok) {
        //         throw new Error(responseData.message);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        console.log('Removed');
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
                                        <p className='mt-2 text-sm text-gray-500'>Manage all service that registered in KitaBantu.</p>
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
                                                                                Provider
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
                                                                                Starting Price
                                                                            </th>
                                                                            <th
                                                                                scope='col'
                                                                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                            ></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='bg-white divide-y divide-gray-200'>
                                                                        {services.map((service) => (
                                                                            <tr key={service.email}>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    <div className='flex items-center'>
                                                                                        <div className='flex-shrink-0 h-10 w-10'>
                                                                                            <img
                                                                                                className='object-right object-cover h-full w-full'
                                                                                                src={`http://localhost:5000/${service.image}`}
                                                                                                alt=''
                                                                                            />
                                                                                        </div>
                                                                                        <div className='ml-4'>
                                                                                            <div className='text-sm font-medium text-gray-900'>
                                                                                                {service.name}
                                                                                            </div>
                                                                                            <div className='text-sm text-gray-500'>
                                                                                                {service.category} - {service.subCategory}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    <div className='text-sm text-gray-900 font-semibold'>
                                                                                        {getUserName(service.serviceProvider)}
                                                                                    </div>
                                                                                    <div className='text-sm text-gray-500'>
                                                                                        {getProviderType(service.serviceProvider)}
                                                                                    </div>
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                                                    {service.status === 'Active' && (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                                                            Active
                                                                                        </span>
                                                                                    )}
                                                                                    {service.status === 'NotActive' && (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                                                                                            Not Active
                                                                                        </span>
                                                                                    )}
                                                                                    {service.status === 'Pending' && (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                                                                                            Pending
                                                                                        </span>
                                                                                    )}
                                                                                    {service.status === 'Declined' && (
                                                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                                                                                            Declined
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                                                    {service.price}
                                                                                    {service.unit}
                                                                                </td>
                                                                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                                                                    <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                                                                                        <NavLink to={`/service/${service.id}`}>
                                                                                            <button className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                                                                                <span>Service Details</span>
                                                                                                <TagIcon
                                                                                                    className='w-6 h-6 text-blue-500 ml-2'
                                                                                                    aria-hidden='true'
                                                                                                />
                                                                                            </button>
                                                                                        </NavLink>
                                                                                        <button
                                                                                            onClick={() => removeService(service.id, false)}
                                                                                            className='flex w-36 cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
                                                                                        >
                                                                                            <span>Remove Service</span>
                                                                                            <XIcon
                                                                                                className='w-6 h-6 text-red-500 ml-2'
                                                                                                aria-hidden='true'
                                                                                            />
                                                                                        </button>
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
