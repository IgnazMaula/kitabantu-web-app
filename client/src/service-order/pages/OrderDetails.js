import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    BellIcon,
    CashIcon,
    ClockIcon,
    MenuIcon,
    ReceiptRefundIcon,
    UsersIcon,
    XIcon,
    PaperClipIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import OrderStep from '../components/OrderStep';
import { checkSteps } from '../../shared/util/checkSteps';

export default function OrderDetails(props) {
    const orderId = useParams().oid;
    let steps;
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [service, setService] = useState([]);
    const [client, setClient] = useState([]);
    const [provider, setProvider] = useState([]);
    useEffect(() => {
        const getOrder = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/${orderId}`);
                const responseData = await response.json();
                setOrder(responseData.order);
                const responseS = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/${responseData.order.service}`);
                const responseDataS = await responseS.json();
                setService(responseDataS.service);
                const responseC = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${responseData.order.client}`);
                const responseDataC = await responseC.json();
                setClient(responseDataC.user);
                const responseP = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/${responseData.order.provider}`);
                const responseDataP = await responseP.json();
                setProvider(responseDataP.user);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getOrder();
    }, []);

    steps = checkSteps(order.status);

    return (
        <>
            <Navbar />
            <div className='min-h-full'>
                <main>
                    {isLoading ? (
                        <div className='text-center p-24'>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className='bg-gray-50'>
                            <div className='max-w-2xl mx-auto pt-16 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
                                <div className='bg-white px-4 py-5 border border-gray-200 sm:px-6 sm:rounded-lg'>
                                    <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
                                        <div className='ml-4 mt-2'>
                                            <h3 className='text-lg leading-6 font-medium text-gray-900'>{order.status}</h3>
                                        </div>
                                        <div className='ml-4 mt-2 flex-shrink-0'>
                                            <button
                                                type='button'
                                                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                            >
                                                Cancel Order
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-6'>
                                    <div className='space-y-8'>
                                        <div key={order.id} className='bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg'>
                                            <div className='py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8'>
                                                <div className='sm:flex lg:col-span-7'>
                                                    <div className='flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40'>
                                                        <img
                                                            src={`${process.env.REACT_APP_BACKEND_URL}${service.image}`}
                                                            alt={service.image}
                                                            className='w-full h-full object-center object-cover sm:w-full sm:h-full'
                                                        />
                                                    </div>

                                                    <div className='mt-6 sm:mt-0 sm:ml-6'>
                                                        <p className='text-sm text-gray-400'>({order.id})</p>
                                                        <h3 className='text-base font-medium text-gray-900'>
                                                            <a href={order.href}>{service.name}</a>
                                                        </h3>
                                                        <p className='mt-2 text-sm font-medium text-gray-500'>
                                                            {service.category} {'•'} {service.subCategory}
                                                        </p>
                                                        <p className='mt-3 text-sm text-gray-500'>
                                                            <span className='font-medium'>Service Requested: </span>{' '}
                                                            {order.selectedService.join(', ')}
                                                        </p>
                                                        <p className='mt-3 text-sm text-gray-500'>
                                                            <span className='font-medium'>Service Details: </span>
                                                            {order.details}
                                                        </p>
                                                        <p className='mt-3 text-sm text-gray-500'>
                                                            <span className='font-medium'>
                                                                {service.unit
                                                                    .slice(1)
                                                                    .toLowerCase()
                                                                    .replace(/\b[a-z]/g, function (letter) {
                                                                        return letter.toUpperCase();
                                                                    })}
                                                                :{' '}
                                                            </span>
                                                            {order.unit}
                                                        </p>
                                                        <p className='mt-3 text-sm text-gray-500'>
                                                            <span className='font-medium'>Date: </span>
                                                            {order.date}
                                                        </p>
                                                        <p className='mt-3 text-sm text-gray-500'>
                                                            <span className='font-medium'>Time: </span>
                                                            {order.time}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='mt-6 lg:mt-0 lg:col-span-5'>
                                                    <dl className='grid grid-cols-2 gap-x-6 text-sm'>
                                                        <div>
                                                            <dt className='font-medium text-gray-900'>Service Provider</dt>
                                                            <dd className='mt-3 text-gray-500 space-y-3'>
                                                                <p>{provider.name}</p>
                                                                <p>{provider.email}</p>
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className='font-medium text-gray-900'>Service Client</dt>
                                                            <dd className='mt-3 text-gray-500 space-y-3'>
                                                                <p>{client.name}</p>
                                                                <p>{client.email}</p>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                    <div className='pt-12'>
                                                        <p className='font-medium text-gray-900 pb-2'>Order Status</p>
                                                        <p className='text-gray-400 text-lg font-medium'>{order.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <OrderStep steps={steps} />
                                            <div className='bg-white py-6 px-4 sm:px-6 lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8'>
                                                <dl className='grid grid-cols-3 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7'>
                                                    <div>
                                                        <dt className='font-medium text-gray-900'>Attachment</dt>
                                                        <dd className='mt-3 text-gray-500'>
                                                            <span className='flex-grow'>
                                                                {order.attachment !== '' ? (
                                                                    <img
                                                                        className='max-h-64 max-w-128'
                                                                        src={`${process.env.REACT_APP_BACKEND_URL}${order.attachment}`}
                                                                        alt=''
                                                                    />
                                                                ) : (
                                                                    <p>No Attachment</p>
                                                                )}
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <div className='pl-12'>
                                                        <dt className='font-medium text-gray-900'>Location & Contact</dt>
                                                        <dd className='mt-3 text-gray-500'>
                                                            <span className='block'>
                                                                {order.clientAddress}, {order.clientLocation}
                                                            </span>
                                                            <span className='block'>{order.clientNumber}</span>
                                                        </dd>
                                                        <br />
                                                        <dt className='font-medium text-gray-900'>Payment Type</dt>
                                                        <div className='mt-3'>
                                                            <dd className='-ml-4 -mt-4 flex flex-wrap'>
                                                                <div className='ml-4 mt-4'>
                                                                    {order.paymentType === 'full' ? (
                                                                        <p className='text-green-600 text-lg font-medium'>Full Payment</p>
                                                                    ) : (
                                                                        <p className='text-yellow-600 text-lg font-medium'>Down Payment</p>
                                                                    )}
                                                                </div>
                                                            </dd>
                                                        </div>
                                                    </div>
                                                </dl>

                                                <dl className='mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5'>
                                                    <div className='pb-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Subtotal</dt>
                                                        {order.paymentType === 'full' ? (
                                                            <dd className='font-medium text-gray-900'>{order.totalPrice}</dd>
                                                        ) : (
                                                            <dd className='font-medium text-gray-900'>{order.totalPrice * 2.5}</dd>
                                                        )}
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        {order.paymentType === 'full' ? (
                                                            <dt className='text-gray-600'>Full Payment</dt>
                                                        ) : (
                                                            <dt className='text-gray-600'>Down Payment</dt>
                                                        )}
                                                        <dd className='font-medium text-gray-900'>{order.totalPrice}</dd>
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Remaining Payment (On Site Payment)</dt>
                                                        {order.paymentType === 'full' ? (
                                                            <dd className='font-medium text-gray-900'>0</dd>
                                                        ) : (
                                                            <dd className='font-medium text-red-700'>{order.totalPrice * 2.5 - order.totalPrice}</dd>
                                                        )}
                                                    </div>
                                                    <div className='pt-4 flex items-center justify-between'>
                                                        <dt className='font-medium text-gray-900'>Order total</dt>
                                                        <dd className='font-bold text-green-600'>{order.totalPrice}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
}
