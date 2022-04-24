/* This example requires Tailwind CSS v2.0+ */
import { Children, Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import Input from '../../shared/components/form/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

export default function ReviewModal(props) {
    const { open, setOpen, title, message, children, buttonText, color, order, provider, service, refetchData } = props;
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const stars = [
        { option: 'Bad ⭐', value: 1 },
        { option: 'Not Bad ⭐⭐', value: 2 },
        { option: 'Good ⭐⭐⭐', value: 3 },
        { option: 'Very Good ⭐⭐⭐⭐', value: 4 },
        { option: 'Satisfied ⭐⭐⭐⭐⭐', value: 5 },
    ];

    const submitReviewHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs.rating.value + ' ' + formState.inputs.review.value);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/${order.id}/review`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: formState.inputs.rating.value,
                    review: formState.inputs.review.value,
                }),
            });

            const responseData = await response.json();
            setOpen(false);
            refetchData();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                            <form onSubmit={submitReviewHandler}>
                                <div className='mt-3 text-center sm:mt-5'>
                                    <Dialog.Title as='h3' className='text-xl leading-6 font-medium text-gray-900'>
                                        {title}
                                    </Dialog.Title>
                                    <div className='mt-10'>
                                        <div className='flow-root px-4 sm:mt-10 sm:px-0'>
                                            <div className='-my-6 divide-y divide-gray-200 sm:-my-10'>
                                                <div key={service.id} className='flex py-6 sm:py-10'>
                                                    <div className='min-w-0 flex-1 lg:flex lg:flex-col'>
                                                        <div className='lg:flex-1'>
                                                            <div className='sm:flex'>
                                                                <div>
                                                                    {/* <h4 className='font-medium text-gray-900'>{service.name}</h4> */}
                                                                    <div className='flex-1 text-sm text-left'>
                                                                        <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                                                                            <h3 className='text-base'>{service.name}</h3>
                                                                        </div>
                                                                        <h3 className='text-gray-500 mb-4 sm:justify-between'>
                                                                            {service.category}, {service.subCategory}
                                                                        </h3>
                                                                        <p className='hidden sm:block sm:mt-2'>{service.description}</p>
                                                                        <p className='hidden sm:block sm:mt-2'>
                                                                            <b>Service Provider: </b> {provider}
                                                                        </p>
                                                                    </div>
                                                                </div>
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
                                    <div className='mt-12 container px-4'>
                                        <div className='mt-1 sm:mt-0 '>
                                            <div className='mt-1 sm:mt-0  sm:mb-8'>
                                                <div className='w-full'>
                                                    <p className='text-sm font-sm text-gray-900 mt-4 font-bold'>
                                                        Give the stars based on your impression:
                                                    </p>
                                                    <Input
                                                        element='radio'
                                                        id='rating'
                                                        name='rating'
                                                        type='radio'
                                                        placeholder={3}
                                                        initialValue={3}
                                                        initialValid={true}
                                                        defaultChecked={true}
                                                        validators={[VALIDATOR_REQUIRE()]}
                                                        errorText='Please enter a valid vaccination status.'
                                                        onInput={inputHandler}
                                                        option={stars}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Input
                                            element='textarea'
                                            id='review'
                                            placeholder='Write a review based on your experience of receiving this service'
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Review is too short.'
                                            onInput={inputHandler}
                                        />
                                    </div>
                                </div>

                                <div className='mt-5 sm:mt-6 text-center'>
                                    <button
                                        type='submit'
                                        className={`mr-4 inline-flex justify-center w-32  rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 sm:text-sm`}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type='button'
                                        className={`inline-flex justify-center w-32  rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm`}
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
