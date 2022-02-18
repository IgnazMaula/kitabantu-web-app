import { useState, useEffect } from 'react';
import { CursorClickIcon, MailOpenIcon, UserIcon, UsersIcon } from '@heroicons/react/outline';

/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Total Users', stat: '71,897', icon: UsersIcon },
    { name: 'Total Provider', stat: '58.16%', icon: UsersIcon },
    { name: 'Total Client', stat: '24.57%', icon: UsersIcon },
];

export default function AdminStat() {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/services');
                const responseUser = await fetch(`http://localhost:5000/api/users/provider-and-client`);
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
    }, []);
    return (
        <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Manage Service</h3>
            <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Total Users</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{users.length}</dd>
                </div>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Total Services</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{services.length}</dd>
                </div>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Total Order</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{0}</dd>
                </div>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Service Provider</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{users.length}</dd>
                </div>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Service Client</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{services.length}</dd>
                </div>
                <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
                    <dt>
                        <UserIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                        <p className='text-sm font-medium text-gray-500 truncate'>Incoming Request</p>
                    </dt>

                    <dd className='mt-1 text-3xl font-semibold text-gray-900'>{0}</dd>
                </div>
            </dl>
        </div>
    );
}
