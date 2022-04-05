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

const products = [
    {
        id: 1,
        name: 'Nomad Tumbler',
        description: 'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
        href: '#',
        price: '35.00',
        status: 'Preparing to ship',
        step: 1,
        date: 'March 24, 2021',
        datetime: '2021-03-24',
        address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
        email: 'f•••@example.com',
        phone: '1•••••••••40',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
    {
        id: 2,
        name: 'Minimalist Wristwatch',
        description: 'This contemporary wristwatch has a clean, minimalist look and high quality components.',
        href: '#',
        price: '149.00',
        status: 'Shipped',
        step: 0,
        date: 'March 23, 2021',
        datetime: '2021-03-23',
        address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
        email: 'f•••@example.com',
        phone: '1•••••••••40',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg',
        imageAlt: 'Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.',
    },
    // More products...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function OrderDetails(props) {
    const orderId = useParams().oid;
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
                            <div className='max-w-2xl mx-auto pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                                {/* Products */}
                                <div className='mt-6'>
                                    <h2 className='sr-only'>Products purchased</h2>

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
                                            <div className='bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8'>
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
                                            <div className='border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8'>
                                                <h4 className='sr-only'>Status</h4>
                                                <p className='text-sm font-medium text-gray-900'>
                                                    {order.status} on <time dateTime={order.datetime}>{order.date}</time>
                                                </p>
                                                <div className='mt-6' aria-hidden='true'>
                                                    <div className='bg-gray-200 rounded-full overflow-hidden'>
                                                        <div
                                                            className='h-2 bg-indigo-600 rounded-full'
                                                            style={{ width: `calc((${order.step} * 2 + 1) / 8 * 100%)` }}
                                                        />
                                                    </div>
                                                    {/* <div className='hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6'>
                                                    <div className='text-indigo-600'>Order placed</div>
                                                    <div className={classNames(order.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                                                        Processing
                                                    </div>
                                                    <div className={classNames(order.step > 1 ? 'text-indigo-600' : '', 'text-center')}>Shipped</div>
                                                    <div className={classNames(order.step > 2 ? 'text-indigo-600' : '', 'text-right')}>Delivered</div>
                                                </div> */}
                                                </div>
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
