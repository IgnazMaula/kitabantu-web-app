import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

import Input from '../../shared/components/form/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { categories } from '../../shared/util/categories';
import ImageUploadService from '../../shared/components/form/ImageUploadService';
import Navbar from '../../shared/components/Navbar';
import { services } from '../../services';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export default function CreateOrderAC() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const sid = useParams().sid;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [service, setService] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const [currentValue, setCurrentValue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const contactType = [
        { option: 'Current', value: 'current' },
        { option: 'Custom', value: 'custom' },
    ];
    const paymentType = [
        { option: 'Full', value: 'full' },
        { option: 'Down Payment', value: 'dp' },
    ];
    const brands = [
        { option: 'Sharp', value: 'Sharp' },
        { option: 'LG', value: 'LG' },
        { option: 'Samsung', value: 'Samsung' },
        { option: 'Daikin', value: 'Daikin' },
        { option: 'Panasonic', value: 'Panasonic' },
        { option: 'Other', value: 'Other' },
    ];
    const PKs = [
        { option: '0,5 PK', value: '0,5 PK' },
        { option: '0,75 PK', value: '0,75 PK' },
        { option: '1 PK', value: '1 PK' },
        { option: '1,5 PK', value: '1,5 PK' },
        { option: '2 PK', value: '2 PK' },
    ];
    const times = [
        { option: 'Very recently', value: 'Very recently' },
        { option: '1-4 weeks', value: '1-4 weeks' },
        { option: 'More than a month', value: 'More than a month' },
    ];
    const services = [
        'AC installation',
        'AC cleaning',
        'Freon refill',
        'AC constantly running',
        'AC not turning on',
        'No cool air flowing',
        'Hot air blowing out',
        'Water leaking',
        'Weird noise coming out',
        'Remote control not working',
        'Unit turning on and off',
        'Strange smell coming from unit',
    ];
    const locations = ['Jakarta', 'Bali', 'Surabaya'];

    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/${sid}`);
                const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users`);
                const responseData = await response.json();
                const responseDataUser = await responseUser.json();
                setService(responseData.service);
                setProperties(responseData.service.properties);
                setUsers(responseDataUser.users);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, []);

    const getUserName = (userId) => {
        let name = '';
        users.forEach((user) => {
            if (userId === user.id) {
                name = user.name;
            }
        });
        return name;
    };

    const orderSubmitHandler = async (event) => {
        event.preventDefault();
        let imageUpload;
        if (formState.inputs.image === undefined) {
            imageUpload = 'default';
        } else {
            imageUpload = formState.inputs.image.value;
        }
        let totalPrice;
        if (formState.inputs.paymentType.value === 'full') {
            totalPrice = currentValue * service.price;
        } else {
            totalPrice = currentValue * service.price * (40 / 100);
        }
        const formData = new FormData();
        formData.append('service', service.id);
        formData.append('client', auth.loggedUser.id);
        formData.append('provider', service.serviceProvider);
        formData.append('totalPrice', totalPrice);
        formData.append('paymentType', formState.inputs.paymentType.value);
        formData.append('unit', formState.inputs.unit.value);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('details', formState.inputs.details.value);
        formData.append('selectedService', JSON.stringify(selectedServices));
        formData.append('clientLocation', formState.inputs.clientLocation.value);
        formData.append('clientAddress', formState.inputs.clientAddress.value);
        formData.append('clientNumber', formState.inputs.clientNumber.value);
        formData.append('image', imageUpload);
        formData.append('label1', 'AC Brand');
        formData.append('label2', 'AC PK');
        formData.append('label3', 'AC Series name');
        formData.append('label4', 'Faulty duration');
        formData.append('field1', formState.inputs.brand.value);
        formData.append('field2', formState.inputs.PK.value);
        formData.append('field3', formState.inputs.series.value);
        formData.append('field4', formState.inputs.time.value);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/create-order`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            console.log(responseData.order.id);
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            navigate(`/order/${responseData.order.id}`);
        } catch (error) {
            console.log(error);
            setError(error.message || 'Something is wrong, please try again.');
        }
    };

    const checkBoxHandler = (e) => {
        const {
            target: { name, value },
        } = e;
        setSelectedServices((selectedServices) => {
            if (selectedServices.includes(name)) {
                selectedServices.splice(selectedServices.indexOf(name), 1);
                return [...selectedServices];
            } else {
                console.log(selectedServices);
                return [...selectedServices, name];
            }
        });
    };

    const dateHandler = (date, dateString) => {
        setDate(dateString);
    };

    const timeHandler = (time, timeString) => {
        setTime(timeString);
    };

    return (
        <>
            <Navbar />
            {isLoading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='max-w-5xl mx-auto sm:px-2 lg:px-8 p-10'>
                    <div className='px-4 sm:px-6 md:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Order AC Service</h1>
                    </div>
                    <form className='space-y-8 divide-y divide-gray-200' onSubmit={orderSubmitHandler}>
                        <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                            <div>
                                <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Service Type
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500 sm:mt-px sm:pt-2'>{service.subCategory}</p>
                                        </div>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Service Name
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500 sm:mt-px sm:pt-2'>{service.name}</p>
                                        </div>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Provider Name
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500 sm:mt-px sm:pt-2'>{getUserName(service.serviceProvider)}</p>
                                        </div>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Starting Price
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500 sm:mt-px sm:pt-2'>
                                                {service.price}
                                                {service.unit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            AC Brand
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <div className='mt-1 sm:mt-0 sm:col-span-2 sm:mb-2'>
                                                <Input
                                                    element='radio'
                                                    id='brand'
                                                    name='brand'
                                                    type='radio'
                                                    placeholder={'Sharp'}
                                                    initialValue={'Sharp'}
                                                    initialValid={true}
                                                    defaultChecked={true}
                                                    validators={[VALIDATOR_REQUIRE()]}
                                                    errorText='Please enter a valid data.'
                                                    onInput={inputHandler}
                                                    option={brands}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            AC PK
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <div className='mt-1 sm:mt-0 sm:col-span-2 sm:mb-2'>
                                                <Input
                                                    element='radio'
                                                    id='PK'
                                                    name='PK'
                                                    type='radio'
                                                    placeholder={'0,5 PK'}
                                                    initialValue={'0,5 PK'}
                                                    initialValid={true}
                                                    defaultChecked={true}
                                                    validators={[VALIDATOR_REQUIRE()]}
                                                    errorText='Please enter a valid data.'
                                                    onInput={inputHandler}
                                                    option={PKs}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            How long have you been experiencing faulty
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <div className='mt-1 sm:mt-0 sm:col-span-2 sm:mb-2'>
                                                <Input
                                                    element='radio'
                                                    id='time'
                                                    name='time'
                                                    type='radio'
                                                    placeholder={'Very recently'}
                                                    initialValue={'Very recently'}
                                                    initialValid={true}
                                                    defaultChecked={true}
                                                    validators={[VALIDATOR_REQUIRE()]}
                                                    errorText='Please enter a valid data.'
                                                    onInput={inputHandler}
                                                    option={times}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            AC Series Name
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <Input
                                                element='input'
                                                id='series'
                                                type='text'
                                                placeholder='series name'
                                                validators={[]}
                                                errorText='Please enter valid unit.'
                                                onInput={inputHandler}
                                            />
                                        </div>
                                        {currentValue !== '' && (
                                            <>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Cost Estimation
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <p className='text-sm text-green-500 sm:mt-px sm:pt-2'>Rp. {currentValue * service.price}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='sm:grid sm:grid-cols-4 sm:gap-4 sm:items-end sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label
                                            htmlFor='about'
                                            className='col-span-4 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:py-4 text-center'
                                        >
                                            Type of service/faulty
                                        </label>
                                        {services.map((o) => (
                                            <div className='relative flex items-start'>
                                                <div className='flex items-center h-5'>
                                                    <input
                                                        id={o}
                                                        name={o}
                                                        type='checkbox'
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                                                        onChange={checkBoxHandler}
                                                        value={o}
                                                    />
                                                </div>
                                                <div className='ml-3 text-sm'>
                                                    <label htmlFor='comments' className='font-sm text-gray-700'>
                                                        {o}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Order details
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500'>
                                                Provide more details about your order (ex: notes, special request)
                                            </p>
                                            <Input
                                                element='textarea'
                                                id='details'
                                                placeholder='Order details'
                                                validators={[VALIDATOR_MINLENGTH(12)]}
                                                errorText='Details is too short.'
                                                onInput={inputHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Enter AC unit
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <Input
                                                element='input'
                                                id='unit'
                                                type='number'
                                                placeholder='Unit'
                                                validators={[VALIDATOR_REQUIRE()]}
                                                errorText='Please enter valid unit.'
                                                onInput={inputHandler}
                                                setCurrentValue={setCurrentValue}
                                            />
                                        </div>
                                        {currentValue !== '' && (
                                            <>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Cost Estimation
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <p className='text-sm text-green-500 sm:mt-px sm:pt-2'>Rp. {currentValue * service.price}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Date
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <DatePicker onChange={dateHandler} />
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Time
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <TimePicker onChange={timeHandler} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Client Address & Contact
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2 sm:mb-8'>
                                            <div className='w-80'>
                                                <Input
                                                    element='radio'
                                                    id='contactType'
                                                    name='contactType'
                                                    type='radio'
                                                    placeholder={'current'}
                                                    initialValue={'current'}
                                                    initialValid={true}
                                                    defaultChecked={true}
                                                    validators={[VALIDATOR_REQUIRE()]}
                                                    errorText='Please enter a valid vaccination status.'
                                                    onInput={inputHandler}
                                                    option={contactType}
                                                />
                                            </div>
                                            <br />
                                        </div>
                                        {formState.inputs.contactType !== undefined && formState.inputs.contactType.value === 'current' && (
                                            <>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Location
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='input'
                                                        id='clientLocation'
                                                        type='text'
                                                        placeholder={auth.loggedUser.location}
                                                        initialValue={auth.loggedUser.location}
                                                        validators={[]}
                                                        errorText='Please enter valid location.'
                                                        onInput={inputHandler}
                                                        isDisable={true}
                                                    />
                                                </div>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Address
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='input'
                                                        id='clientAddress'
                                                        type='text'
                                                        placeholder={auth.loggedUser.address}
                                                        initialValue={auth.loggedUser.address}
                                                        validators={[]}
                                                        initialValid={true}
                                                        errorText='Please enter valid address.'
                                                        onInput={inputHandler}
                                                        isDisable={true}
                                                    />
                                                </div>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Number
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='input'
                                                        id='clientNumber'
                                                        type='tel'
                                                        placeholder={auth.loggedUser.phoneNumber}
                                                        initialValue={auth.loggedUser.phoneNumber}
                                                        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(20)]}
                                                        initialValid={true}
                                                        errorText='Please enter valid phone number.'
                                                        onInput={inputHandler}
                                                        isDisable={true}
                                                    />
                                                </div>
                                            </>
                                        )}
                                        {formState.inputs.contactType !== undefined && formState.inputs.contactType.value === 'custom' && (
                                            <>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Location
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='option'
                                                        id='clientLocation'
                                                        placeholder={auth.loggedUser.location}
                                                        validators={[VALIDATOR_REQUIRE()]}
                                                        initialValid={auth.loggedUser.location}
                                                        isValid={true}
                                                        errorText='Please enter a valid location.'
                                                        onInput={inputHandler}
                                                        option={locations}
                                                    />
                                                </div>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Address
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='input'
                                                        id='clientAddress'
                                                        type='text'
                                                        placeholder={auth.loggedUser.address}
                                                        initialValue={auth.loggedUser.address}
                                                        initialValid={true}
                                                        validators={[VALIDATOR_MINLENGTH(10)]}
                                                        errorText='Please enter a valid address'
                                                        onInput={inputHandler}
                                                    />
                                                </div>
                                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                                    Your Number
                                                </label>
                                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                                    <Input
                                                        element='input'
                                                        id='clientNumber'
                                                        type='tel'
                                                        placeholder={auth.loggedUser.phoneNumber}
                                                        initialValue={auth.loggedUser.phoneNumber}
                                                        initialValid={true}
                                                        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(20)]}
                                                        errorText='Please enter a valid phone number'
                                                        onInput={inputHandler}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='cover-photo' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Attach image
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500'>Add image attachment to help us understand your needs</p>
                                            <ImageUploadService id='image' color='blue' onInput={inputHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                            <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                Payment Type
                            </label>
                            <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                <div className='mt-1 sm:mt-0 sm:col-span-2 sm:mb-8'>
                                    <div className='w-80'>
                                        <Input
                                            element='radio'
                                            id='paymentType'
                                            name='paymentType'
                                            type='radio'
                                            placeholder={'full'}
                                            initialValue={'full'}
                                            initialValid={true}
                                            defaultChecked={true}
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid vaccination status.'
                                            onInput={inputHandler}
                                            option={paymentType}
                                        />
                                    </div>
                                    <p className='text-sm font-sm text-gray-500 mt-4'>
                                        * Down payment will be 40% of total price, the remaining payment can be done onsite once Provider done the
                                        service
                                    </p>
                                </div>
                            </div>
                            <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px'>
                                Total Price
                            </label>
                            {formState.inputs.paymentType !== undefined && formState.inputs.paymentType.value === 'full' && (
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='text-xl font-bold text-green-500 sm:mt-px sm:pt-2'>Rp. {currentValue * service.price}</p>
                                </div>
                            )}
                            {formState.inputs.paymentType !== undefined && formState.inputs.paymentType.value === 'dp' && (
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='text-xl font-bold text-green-500 sm:mt-px sm:pt-2'>
                                        Rp. {currentValue * service.price * (40 / 100)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className='pt-5'>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    onClick={() => navigate(-1)}
                                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    Order Service
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
