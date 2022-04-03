import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import Input from '../../shared/components/form/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { categories } from '../../shared/util/categories';
import ImageUploadService from '../../shared/components/form/ImageUploadService';
import Navbar from '../../shared/components/Navbar';
import { services } from '../../services';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export default function Order() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const sid = useParams().sid;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [service, setService] = useState([]);
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState([]);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const [currentValue, setCurrentValue] = useState('');

    const contactType = [
        { option: 'Current', value: 'current' },
        { option: 'Custom', value: 'custom' },
    ];
    const locations = ['Jakarta', 'Bali', 'Surabaya'];

    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/${sid}`);
                const responseData = await response.json();
                setService(responseData.service);
                setProperties(responseData.service.properties);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        getService();
    }, []);

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        let imageUpload;
        if (formState.inputs.image === undefined) {
            imageUpload = 'default';
        } else {
            imageUpload = formState.inputs.image.value;
        }
        const formData = new FormData();
        formData.append('image', imageUpload);
        formData.append('name', formState.inputs.name.value);
        formData.append('category', selectedCategory);
        formData.append('subCategory', selectedSubCategory);
        formData.append('price', formState.inputs.price.value);
        formData.append('unit', unit);
        formData.append('label', label);
        formData.append('properties', JSON.stringify(properties));
        formData.append('description', formState.inputs.description.value);
        formData.append('serviceProvider', JSON.stringify(auth.loggedUser));
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/services/create-service`, {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            if (!response.ok) {
                console.log(formState.inputs.category.value);
                throw new Error(responseData.message);
            }
            navigate('/manage-service');
        } catch (error) {
            console.log(error);
            setError(error.message || 'Something is wrong, please try again.');
        }
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSubSelectedCategory] = useState(null);

    const subCategoriesList = [];
    const categoriesList = [];
    let label;
    let unit;
    let element;

    const handleSelectedCategory = (e) => {
        setSelectedCategory(e.target.value);
        console.log(selectedCategory);
        setProperties([]);
        document.querySelectorAll('input[type="checkbox"]').forEach((el) => (el.checked = false));
        categories.forEach((c) => {
            if (c.name === e.target.value) {
                console.log('new sub is' + c.sub[0].name);
                setSubSelectedCategory(c.sub[0].name);
            }
        });

        // setSubSelectedCategory('House Cleaning');
    };
    const handleSelectedSubCategory = (e) => {
        console.log(selectedSubCategory);
        setSubSelectedCategory(e.target.value);
        setProperties([]);
        document.querySelectorAll('input[type="checkbox"]').forEach((el) => (el.checked = false));
    };

    const checkBoxHandler = (e) => {
        const {
            target: { name, value },
        } = e;
        setProperties((properties) => {
            if (properties.includes(name)) {
                // properties.splice(properties.indexOf(name), 1);
                return [...properties];
            } else {
                console.log('no');
                return [...properties, name];
            }
        });
    };

    const uploadProfileHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/update/profile-picture/${auth.loggedUser.id}`, {
                method: 'PATCH',
                body: formData,
            });
        } catch (error) {
            console.log(error);
        }
        event.target.disabled = true;
    };

    return (
        <>
            <Navbar />
            {isLoading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='max-w-5xl mx-auto sm:px-2 lg:px-8 pt-10'>
                    <div className='px-4 sm:px-6 md:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Order Service</h1>
                    </div>
                    <form className='space-y-8 divide-y divide-gray-200' onSubmit={authSubmitHandler}>
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
                                            Starting Price
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <p className='text-sm text-gray-500 sm:mt-px sm:pt-2'>
                                                {service.price}
                                                {service.unit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-4 sm:gap-4 sm:items-end sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label
                                            htmlFor='about'
                                            className='col-span-4 block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:py-4 text-center'
                                        >
                                            Pick Services
                                        </label>
                                        {service.properties.map((o) => (
                                            <div className='relative flex items-start'>
                                                <div className='flex items-center h-5'>
                                                    <input
                                                        id={o}
                                                        name={o}
                                                        type='checkbox'
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                                                        onChange={checkBoxHandler}
                                                        value='1'
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
                                                id='description'
                                                placeholder='Order details'
                                                validators={[VALIDATOR_MINLENGTH(12)]}
                                                errorText='Details is too short.'
                                                onInput={inputHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                        <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                            Enter Unit ( {service.unit} )
                                        </label>
                                        <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                            <Input
                                                element='input'
                                                id='name'
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
                                            <Input
                                                element='input'
                                                id='name'
                                                type='text'
                                                placeholder='Unit'
                                                validators={[VALIDATOR_REQUIRE()]}
                                                errorText='Please enter valid date.'
                                                onInput={inputHandler}
                                            />
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
                                                    type='radio'
                                                    mode='edit'
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
                                                        id='location'
                                                        type='text'
                                                        placeholder={auth.loggedUser.location}
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
                                                        id='address'
                                                        type='text'
                                                        placeholder={auth.loggedUser.address}
                                                        validators={[]}
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
                                                        id='name'
                                                        type='text'
                                                        placeholder={auth.loggedUser.phoneNumber}
                                                        validators={[VALIDATOR_REQUIRE()]}
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
                                                        id='location'
                                                        placeholder='Select Location'
                                                        validators={[VALIDATOR_REQUIRE()]}
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
                                                        id='address'
                                                        type='text'
                                                        placeholder='Address'
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
                                                        id='phoneNumber'
                                                        type='text'
                                                        placeholder='Phone number'
                                                        validators={[]}
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

                        <div className='pt-5'>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <NavLink to='/manage-service'>Cancel</NavLink>
                                </button>
                                <button
                                    type='submit'
                                    className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    Save and Request for Approval
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
