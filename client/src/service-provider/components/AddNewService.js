import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../../shared/components/form/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { categories } from '../../shared/util/categories';
import ImageUploadService from '../../shared/components/form/ImageUploadService';

export default function AddNewService() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState([]);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const [openP, setOpenP] = useState(false);

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
            const response = await fetch('http://localhost:5000/api/services/create-service', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
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
                properties.splice(properties.indexOf(name), 1);
                return [...properties];
            } else {
                console.log('no');
                return [...properties, name];
            }
        });
    };

    useEffect(() => {
        console.log(properties);
    }, [properties]);

    categories.map((c) => {
        categoriesList.push(c.name);
        if (c.name === selectedCategory) {
            c.sub.forEach((s) => {
                subCategoriesList.push(s.name);
                if (s.name === selectedSubCategory) {
                    label = s.label;
                    unit = s.unit;
                    element = s.option.map((o) => (
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
                                <label htmlFor='comments' className='font-medium text-gray-700'>
                                    {o}
                                </label>
                            </div>
                        </div>
                    ));
                }
            });
        }
    });
    const uploadProfileHandler = async (event) => {
        event.preventDefault();
        setOpenP(true);
        const formData = new FormData();
        formData.append('image', formState.inputs.image.value);
        try {
            await fetch(`http://localhost:5000/api/users/update/profile-picture/${auth.loggedUser.id}`, {
                method: 'PATCH',
                body: formData,
            });
        } catch (error) {
            console.log(error);
        }
        event.target.disabled = true;
    };

    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='px-4 sm:px-6 md:px-0'>
                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Add New Service</h1>
                <p className='mt-2 text-sm text-gray-500'>View and update information related to your account.</p>
            </div>
            <form className='space-y-8 divide-y divide-gray-200' onSubmit={authSubmitHandler}>
                <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div>
                        <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Service Name
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='text-sm text-gray-500'>
                                        This will be the title that displays to the client. try to make it as interesting as possible
                                    </p>
                                    <Input
                                        element='input'
                                        id='name'
                                        type='text'
                                        placeholder='Service name'
                                        validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(48)]}
                                        errorText='Please enter name between 8-48 characters.'
                                        onInput={inputHandler}
                                    />
                                </div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Categories
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <Input
                                        element='option'
                                        id='category'
                                        placeholder='Select Categories'
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText='Please enter a valid category'
                                        onInput={inputHandler}
                                        option={categoriesList}
                                        onChange={handleSelectedCategory}
                                    />
                                </div>
                            </div>
                            {selectedCategory && (
                                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
                                    <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                        Sub Category
                                    </label>
                                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                        <Input
                                            element='option'
                                            id='subCategory'
                                            placeholder='Select Sub Categories'
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid sub category'
                                            onInput={inputHandler}
                                            option={subCategoriesList}
                                            onChange={handleSelectedSubCategory}
                                        />
                                    </div>
                                </div>
                            )}
                            {true && (
                                <div className='pt-6 sm:pt-5'>
                                    <div role='group' aria-labelledby='label-email'>
                                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                                            <div>
                                                <div className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700' id='label-email'>
                                                    {label}
                                                </div>
                                            </div>
                                            <div className='mt-4 sm:mt-0 sm:col-span-2'>
                                                <div className='max-w-lg space-y-4'>{element}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Starting Price
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-1'>
                                    <div className='mt-1 relative'>
                                        <div className='absolute inset-y-0 left-0 top-2 pl-3 flex pointer-events-none'>
                                            <span className='text-gray-500 sm:text-sm'>Rp</span>
                                        </div>
                                        <Input
                                            element='input'
                                            id='price'
                                            type='number'
                                            placeholder='0'
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid price.'
                                            onInput={inputHandler}
                                        />
                                        <div className='absolute inset-y-0 right-0 pr-3 top-2 flex pointer-events-none'>
                                            <span className='text-gray-500 sm:text-sm' id='price-currency'>
                                                {unit}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Description
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                    <p className='mt-2 text-sm text-gray-500'>Describe about your service in few lines.</p>
                                    <Input
                                        element='textarea'
                                        id='description'
                                        placeholder='Description about service that you offer'
                                        validators={[VALIDATOR_MINLENGTH(12)]}
                                        errorText='Description is too short.'
                                        onInput={inputHandler}
                                    />
                                </div>
                            </div>
                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label htmlFor='cover-photo' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                    Cover photo
                                </label>
                                <ImageUploadService id='image' color='blue' onInput={inputHandler} />
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
    );
}
