/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { NavLink } from 'react-router-dom';
import { checkSteps } from '../../shared/util/checkSteps';
import OrderStepShort from '../../service-order/components/OrderStepShort';
import EmptyState from '../../shared/components/EmptyState';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ClientOrder() {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/client/${auth.loggedUser.id}`);
                const responseData = await response.json();
                setOrders(responseData.orders);
                const responseS = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services`);
                const responseDataS = await responseS.json();
                setServices(responseDataS.services);
                const responseU = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users`);
                const responseDataU = await responseU.json();
                setUsers(responseDataU.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getUsers();
    }, []);

    return (
        <div className='bg-white'>
            <div>
                <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                    <div className='max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Manage My Order</h1>
                        <p className='mt-2 text-sm text-gray-500'>manage all the service that you have ordered.</p>
                    </div>
                </div>

                <div className='mt-16'>
                    {isLoading ? (
                        <div className='text-center p-24'>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            <h1>{orders.id}</h1>
                            {orders.length === 0 ? <NoOrders /> : <Orders orders={orders} services={services} users={users} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
const NoOrders = () => {
    return (
        <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
            <EmptyState title='Your service order is empty, click to browse service' link='/'>
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
    );
};
const Orders = (props) => {
    const getService = (serviceId) => {
        let service = '';
        props.services.forEach((s) => {
            if (serviceId === s.id) {
                service = s;
            }
        });
        return service;
    };
    const getUser = (userId) => {
        let user = '';
        props.users.forEach((u) => {
            if (userId === u.id) {
                user = u;
            }
        });
        return user;
    };
    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
                {props.orders.map((order) => (
                    <div key={order.id} className='bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border'>
                        <div className='flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6'>
                            <dl className='flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-2 sm:grid-cols-2 lg:col-span-2'>
                                <div className='hidden sm:block'>
                                    <dt className='font-medium text-gray-900'>Service Provider</dt>
                                    <dd className='mt-1 text-gray-500'>{getUser(order.provider).name}</dd>
                                </div>
                                <div>
                                    <dt className='font-medium text-gray-900'>Service Client</dt>
                                    <dd className='mt-1 text-gray-500'>{getUser(order.client).name}</dd>
                                </div>
                            </dl>

                            <Menu as='div' className='relative flex justify-end lg:hidden'>
                                <div className='flex items-center'>
                                    <Menu.Button className='-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500'>
                                        <span className='sr-only'>Options for order {order.id}</span>
                                        <DotsVerticalIcon className='w-6 h-6' aria-hidden='true' />
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
                                    <Menu.Items className='origin-bottom-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                        <div className='py-1'>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={order.id}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        View
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={order.id}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Invoice
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                                <NavLink
                                    to={`/order/${order.id}`}
                                    className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                                >
                                    <span>View & Manage Order</span>
                                    <span className='sr-only'>{order.id}</span>
                                </NavLink>
                            </div>
                        </div>

                        {/* Orders */}
                        <ul role='list' className='divide-y divide-gray-200'>
                            <li key={order.id} className='p-4 sm:p-6'>
                                <div className='flex items-center sm:items-start'>
                                    <div className='flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40'>
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}${getService(order.service).image}`}
                                            alt={order.id}
                                            className='w-full h-full object-center object-cover'
                                        />
                                    </div>
                                    <div className='flex-1 ml-6 text-sm'>
                                        <h3 className='text-base font-medium text-gray-900'>
                                            <a href={order.href}>{getService(order.service).name}</a>
                                        </h3>
                                        <p className='mt-2 text-sm font-medium text-gray-500'>
                                            {getService(order.service).category} {'•'} {getService(order.service).subCategory}
                                        </p>
                                        <p className='mt-3 text-sm text-gray-500'>
                                            <span className='font-medium'>Service Requested: </span> {order.selectedService.join(', ')}
                                        </p>
                                        <p className='mt-3 text-sm text-gray-500'>
                                            <span className='font-medium'>Order Price: </span>
                                            Rp. {order.totalPrice}
                                        </p>
                                        <p className='mt-3 text-sm text-gray-500'>
                                            <span className='font-medium'>Payment Type: </span>
                                            {order.paymentType === 'full' ? (
                                                <span className='text-green-600 font-medium'>Full Payment</span>
                                            ) : (
                                                <span className='text-yellow-600 font-medium'>Down Payment</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <OrderStepShort steps={checkSteps(order.status)} />
                    </div>
                ))}
            </div>
        </div>
    );
};
