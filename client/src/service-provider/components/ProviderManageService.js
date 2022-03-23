/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, CheckIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../shared/context/auth-context';
import EmptyState from '../../shared/components/EmptyState';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProviderManageService() {
    const auth = useContext(AuthContext);
    const loggedUserId = auth.loggedUser.id;
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState();
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/user/${loggedUserId}`);
                const responseData = await response.json();
                setServices(responseData.services);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getUsers();
    }, [services]);
    const manageServiceHandler = async (serviceId, newStatus) => {
        newStatus === 'Active' ? setMessage('Approved') : setMessage('Declined');
        setOpen(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/manage-status/${serviceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-white'>
            <div>
                <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                    <div className='max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Manage my Service</h1>
                        <p className='mt-2 text-sm text-gray-500'>Manage services that you offer.</p>
                    </div>
                </div>

                <div className='mt-16'>
                    {isLoading ? (
                        <div className='text-center p-24'>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div>
                            {services.length === 0 ? (
                                <NoOrders />
                            ) : (
                                <Orders
                                    services={services}
                                    open={open}
                                    setOpen={setOpen}
                                    manageServiceHandler={manageServiceHandler}
                                    message={message}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
const NoOrders = () => {
    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
                <EmptyState title='Currently you have no services, click to add one' link='/add-service'>
                    <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                        />
                    </svg>
                </EmptyState>
            </div>
        </div>
    );
};
const Orders = (props) => {
    const { services, manageServiceHandler, open, setOpen, message } = props;
    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='space-y-16 sm:space-y-10 divide-y divide-gray-200'>
                {services.map((service) => (
                    <div key={service.id}>
                        <div className='flow-root px-4 sm:mt-10 sm:px-0'>
                            <div className='-my-6 divide-y divide-gray-200 sm:-my-10'>
                                <div key={service.id} className='flex py-6 sm:py-10'>
                                    <div className='min-w-0 flex-1 lg:flex lg:flex-col'>
                                        <div className='lg:flex-1'>
                                            <div className='sm:flex'>
                                                <div>
                                                    {/* <h4 className='font-medium text-gray-900'>{service.name}</h4> */}
                                                    <div className='flex-1 text-sm'>
                                                        <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                                                            <h3 className='text-base'>{service.name}</h3>
                                                        </div>
                                                        <h3 className='text-gray-500 mb-8'>
                                                            {service.category}, {service.subCategory}
                                                        </h3>

                                                        <p className='hidden sm:block sm:mt-2'>{service.description}</p>
                                                        <p className='hidden sm:block sm:mt-2'>
                                                            <b>Tags:</b> {service.properties.join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=' font-medium my-10'>
                                                <p className='text-sm'>Service Status:</p>
                                                {service.status === 'Active' && <p className='text-green-400'>Active</p>}
                                                {service.status === 'NotActive' && <p className='text-yellow-500'>Not Active</p>}
                                                {service.status === 'Pending' && <p className='text-gray-400'>Waiting for approval from Admin</p>}
                                                {service.status === 'Declined' && <p className='text-red-400'>Declined by Admin</p>}
                                            </div>
                                            <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-start lg:space-x-4'>
                                                {service.status !== 'Declined' ? (
                                                    <button>
                                                        <NavLink
                                                            to={`/service/${service.id}`}
                                                            className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
                                                        >
                                                            <span>View Service</span>
                                                            <span className='sr-only'>{service.number}</span>
                                                        </NavLink>
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:opacity-50'
                                                    >
                                                        <span>View Service</span>
                                                        <span className='sr-only'>{service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'Active' && (
                                                    <button
                                                        onClick={() => manageServiceHandler(service.id, 'NotActive')}
                                                        className='flex cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
                                                    >
                                                        <span>Diactivate Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'NotActive' && (
                                                    <button
                                                        onClick={() => manageServiceHandler(service.id, 'Active')}
                                                        className='flex cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
                                                    >
                                                        <span>Activate Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'Pending' && (
                                                    <button
                                                        disabled
                                                        className='flex cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                                                    >
                                                        <span>Diactivate Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'Declined' && (
                                                    <button
                                                        disabled
                                                        className='flex cursor-pointer items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                                                    >
                                                        <span>Diactivate Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'Active' && (
                                                    <button className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                                        <NavLink to={`/edit-service/${service.id}`}>
                                                            <span>Edit Service</span>
                                                            <span className='sr-only'>for order {service.number}</span>
                                                        </NavLink>
                                                    </button>
                                                )}
                                                {service.status === 'NotActive' && (
                                                    <button className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                                        <NavLink to={`/edit-service/${service.id}`}>
                                                            <span>Edit Service</span>
                                                            <span className='sr-only'>for order {service.number}</span>
                                                        </NavLink>
                                                    </button>
                                                )}
                                                {service.status === 'Pending' && (
                                                    <button
                                                        disabled
                                                        className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                                                    >
                                                        <span>Edit Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                                {service.status === 'Declined' && (
                                                    <button
                                                        disabled
                                                        className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                                                    >
                                                        <span>Edit Service</span>
                                                        <span className='sr-only'>for order {service.number}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ml-4 flex-shrink-0 sm:m-0 sm:mr-6 sm:order-first'>
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}${service.image}`}
                                            alt={service.name}
                                            className='col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-52 lg:h-52'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
