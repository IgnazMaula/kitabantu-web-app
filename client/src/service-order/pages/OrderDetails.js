import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import { AuthContext } from '../../shared/context/auth-context';
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
    CheckIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import OrderStep from '../components/OrderStep';
import { checkSteps } from '../../shared/util/checkSteps';
import OrderAction from '../components/OrderAction';
import TransactionModal from '../components/TransactionModal';

export default function OrderDetails(props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const orderId = useParams().oid;
    let steps, color;
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
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

    const refetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/${orderId}`);
            const responseData = await response.json();
            setOrder(responseData.order);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    steps = checkSteps(order.status);

    order.status === 'Order Canceled' || order.status === 'Order Declined' ? (color = 'red') : (color = 'green');

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
                            <TransactionModal
                                open={open}
                                setOpen={setOpen}
                                title='Payment Receipt'
                                message='User detail has been edited'
                                buttonText='Close'
                                color='blue'
                                order={order}
                                provider={provider}
                            ></TransactionModal>
                            <div className='max-w-2xl mx-auto pt-16 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
                                <OrderAction status={order.status} loggedUser={auth.loggedUser} order={order} refetchData={refetchData} />
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
                                                        <p className='font-medium text-gray-900 pb-2'>Payment Status</p>
                                                        {order.isPaid ? (
                                                            <>
                                                                <p className='text-green-500 text-lg font-medium'>Order Paid</p>
                                                                <button
                                                                    type='button'
                                                                    onClick={() => setOpen(true)}
                                                                    className='mt-2 flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                                                                >
                                                                    View Payment Receipt
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <p className='text-yellow-600 text-lg font-medium'>Not Paid</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <OrderStep steps={steps} color={color} />
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
                                                            <dd className='font-medium text-gray-900'>Rp. 0</dd>
                                                        ) : (
                                                            <dd className='font-medium text-red-700'>
                                                                Rp. {order.totalPrice * 2.5 - order.totalPrice}
                                                            </dd>
                                                        )}
                                                    </div>
                                                    <div className='pt-4 flex items-center justify-between'>
                                                        <dt className='font-medium text-gray-600'>Order total</dt>
                                                        <dd className='font-bold text-lg text-green-500'>Rp. {order.totalPrice}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className='text-right py-4 pr-4'>
                                                <button
                                                    onClick={() => navigate(-1)}
                                                    type='button'
                                                    className=' text-center mr-2 relative inline-flex items-center  bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                                                >
                                                    Back to Order
                                                </button>
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
