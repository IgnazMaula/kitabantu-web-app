/* This example requires Tailwind CSS v2.0+ */
import { Children, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';

export default function TransactionModal(props) {
    const { open, setOpen, title, message, children, buttonText, color, order, provider } = props;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6'>
                            <div>
                                <div className='mt-3 text-center sm:mt-5'>
                                    <Dialog.Title as='h3' className='text-xl leading-6 font-medium text-gray-900'>
                                        {title}
                                    </Dialog.Title>
                                    <div className='mt-10'>
                                        <div className='grid grid-cols-2'>
                                            <div className='col-6 p-12'>
                                                <dl className='mt-8 divide-y divide-gray-200 text-sm'>
                                                    <div className='pb-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Payment Status</dt>
                                                        <dd className='font-medium text-green-600'>Order Paid</dd>
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Payment Type</dt>
                                                        {order.paymentType === 'full' ? (
                                                            <dd className='font-medium text-green-600'>Full Payment</dd>
                                                        ) : (
                                                            <dd className='font-medium text-yellow-600'>Down Payment</dd>
                                                        )}
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Bank Destination</dt>
                                                        <dd className='font-medium text-black'>{provider.bank}</dd>
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Account Number</dt>
                                                        <dd className='font-medium text-black'>{provider.accountNumber}</dd>
                                                    </div>
                                                    <div className='py-4 flex items-center justify-between'>
                                                        <dt className='font-medium text-gray-600'>Paid total</dt>
                                                        <dd className='font-medium text-green-600'>Rp. {order.totalPrice}</dd>
                                                    </div>
                                                    <div className='pt-4 flex items-center justify-between'>
                                                        <dt className='text-gray-600'>Remaining Payment (On Site Payment)</dt>
                                                        {order.paymentType === 'full' ? (
                                                            <dd className='font-medium text-gray-900'>Rp. 0</dd>
                                                        ) : (
                                                            <dd className='font-medium text-red-700'>
                                                                Rp. {order.totalPrice * 2.5 - order.totalPrice}
                                                            </dd>
                                                        )}
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className='col-6'>
                                                <a href={`${process.env.REACT_APP_BACKEND_URL}${order.receipt}`} target='_blank' rel='noreferrer'>
                                                    <div className='aspect-w-4 aspect-h-3 w-96 h-96 rounded-lg bg-gray-100 overflow-hidden'>
                                                        <img
                                                            src={`${process.env.REACT_APP_BACKEND_URL}${order.receipt}`}
                                                            alt={order.receipt}
                                                            className='object-right object-cover h-96 w-96'
                                                        />
                                                    </div>
                                                </a>
                                                <p className='text-gray-400'>Click to preview in fullscreen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 sm:mt-6 text-center'>
                                <button
                                    type='button'
                                    className={`inline-flex justify-center w-32  rounded-md border border-transparent shadow-sm px-4 py-2 bg-${color}-600 text-base font-medium text-white hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 sm:text-sm`}
                                    onClick={() => setOpen(false)}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
