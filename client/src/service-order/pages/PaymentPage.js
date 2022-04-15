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
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import { useForm } from '../../shared/hooks/form-hook';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import OrderStep from '../components/OrderStep';
import { checkSteps } from '../../shared/util/checkSteps';
import OrderAction from '../components/OrderAction';
import ImageUploadService from '../../shared/components/form/ImageUploadService';
import InformModal from '../../shared/components/modal/InformModal';

export default function PaymentPage(props) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const orderId = useParams().oid;
    let steps, color;
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [service, setService] = useState([]);
    const [client, setClient] = useState([]);
    const [provider, setProvider] = useState([]);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const [open, setOpen] = useState(false);
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

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        let imageUpload;
        if (formState.inputs.image === undefined) {
            setOpen(true);
        } else {
            imageUpload = formState.inputs.image.value;
            const formData = new FormData();
            formData.append('image', imageUpload);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/${order.id}/payment`, {
                    method: 'PATCH',
                    body: formData,
                });

                const responseData = await response.json();
                if (!response.ok) {
                    console.log(formState.inputs.category.value);
                    throw new Error(responseData.message);
                }
                navigate(-1);
            } catch (error) {
                console.log(error);
                // setError(error.message || 'Something is wrong, please try again.');
            }
        }
    };

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
                            <InformModal open={open} setOpen={setOpen} title={'Please upload payment receipt!'} buttonText='Okay' color={'red'}>
                                <XIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                            </InformModal>
                            <div className='max-w-2xl mx-auto pt-16 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
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
                                                                <dd className='font-medium text-red-700'>
                                                                    {order.totalPrice * 2.5 - order.totalPrice}
                                                                </dd>
                                                            )}
                                                        </div>
                                                        <div className='pt-4 flex items-center justify-between'>
                                                            <dt className='font-medium text-gray-900'>Order to be Paid</dt>
                                                            <dd className='font-bold text-green-600 text-3xl'>Rp. {order.totalPrice}</dd>
                                                        </div>
                                                    </dl>
                                                    <div className='pt-12'>
                                                        <p className='font-medium text-gray-900 pb-2'>Payment Status</p>
                                                        <p className='text-gray-400 text-lg font-medium'>Not Paid</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8'>
                                                <dl className='grid grid-cols-1 gap-6 text-sm sm:grid-cols-1 md:gap-x-8 lg:col-span-7'>
                                                    <div className='pl-12'>
                                                        <dt className='font-medium text-gray-900 text-lg'>Transfer Address</dt>
                                                        <dd className='mt-3 text-gray-500 text-xl font-bold'>
                                                            <span className='block'>
                                                                {provider.bank} {provider.accountNumber}
                                                            </span>
                                                        </dd>
                                                        <dt className='font-medium text-gray-400 text-lg'>{provider.name}</dt>
                                                        <div className='mt-3'>
                                                            <dd className='mt-3 text-gray-500 text-xl font-bold'>
                                                                <span className='font-bold text-green-600 text-3xl'>Rp. {order.totalPrice}</span>
                                                            </dd>
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

                                                <dl className='mt-8 divide-gray-200 text-sm lg:mt-0 lg:col-span-5'>
                                                    <dt className='font-medium text-gray-900 mb-2'>Upload Payment Receipt</dt>
                                                    <form onSubmit={authSubmitHandler}>
                                                        <ImageUploadService id='image' color='green' onInput={inputHandler} />
                                                        <div className='text-center mt-4'>
                                                            <button
                                                                onClick={() => navigate(-1)}
                                                                type='button'
                                                                className='mr-2 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                                            >
                                                                Back to Order
                                                            </button>

                                                            <button
                                                                type='submit'
                                                                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                                            >
                                                                Submit Receipt
                                                            </button>
                                                        </div>
                                                    </form>
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
