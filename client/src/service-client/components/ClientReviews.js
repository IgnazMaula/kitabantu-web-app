/* This example requires Tailwind CSS v2.0+ */
import { StarIcon } from '@heroicons/react/solid';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import EmptyState from '../../shared/components/EmptyState';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ClientReviews() {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getReview = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/client/${auth.loggedUser.id}/review`);
                const responseData = await response.json();
                setOrders(responseData.orders.reverse());
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
        getReview();
    }, []);

    const getService = (serviceId) => {
        let service = '';
        services.forEach((s) => {
            if (serviceId === s.id) {
                service = s;
            }
        });
        return service;
    };
    const getUser = (userId) => {
        let user = '';
        users.forEach((u) => {
            if (userId === u.id) {
                user = u;
            }
        });
        return user;
    };

    return (
        <div className='bg-white'>
            <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
                <div className='px-4 sm:px-0'>
                    <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>My Reviews</h1>
                    <p className='mt-2 text-sm text-gray-500'>Check all the service that you have reviewed.</p>
                </div>
                {isLoading ? (
                    <div className='text-center p-24'>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className='mt-16 pb-10 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10'>
                        {orders.length === 0 ? (
                            <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
                                <EmptyState title='Your review is empty, click to browse service' link='/'>
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
                        ) : (
                            <div>
                                {orders.map((order) => (
                                    <div key={order.id} className='pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8'>
                                        <div className='lg:col-start-5 lg:col-span-8 xl:col-start-5 xl:col-span-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start'>
                                            <div className='flex items-center xl:col-span-1'>
                                                <div className='flex items-center'>
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                order.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden='true'
                                                        />
                                                    ))}
                                                </div>
                                                <p className='ml-3 text-sm text-gray-700'>
                                                    {order.rating}
                                                    <span className='sr-only'> out of 5 stars</span>
                                                </p>
                                            </div>

                                            <div className='mt-4 lg:mt-6 xl:mt-0 xl:col-span-2'>
                                                <h3 className='text-sm font-medium text-gray-900'>Your Review:</h3>

                                                <div
                                                    className='mt-3 space-y-6 text-sm text-gray-500'
                                                    dangerouslySetInnerHTML={{ __html: order.review }}
                                                />
                                            </div>
                                        </div>

                                        <div className='mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-4'>
                                            <p className='font-medium text-gray-900'>{getService(order.service).name}</p>
                                            <p className='ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0'>
                                                {getUser(order.provider).name}
                                            </p>
                                            <NavLink
                                                to={`/service/${order.service}`}
                                                className='mt-6 flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                                            >
                                                <span>View Service</span>
                                                <span className='sr-only'>{order.id}</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
