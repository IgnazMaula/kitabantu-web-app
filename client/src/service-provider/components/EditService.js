import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import Input from '../../shared/components/form/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { categories } from '../../shared/util/categories';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

export default function EditService() {
    const sid = useParams().sid;
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [properties, setProperties] = useState([]);
    const [formState, inputHandler, setFormData] = useForm({}, false);
    const [isLoading, setIsLoading] = useState(false);
    const [service, setService] = useState([]);
    useEffect(() => {
        const getService = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/services/${sid}`);
                const responseData = await response.json();
                setService(responseData.service);
                setProperties(properties.concat(responseData.service.properties));
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
        try {
            const response = await fetch(`http://localhost:5000/api/services/edit-service/${sid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    price: formState.inputs.price.value,
                    properties: properties,
                    description: formState.inputs.description.value,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
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
    const checkBoxHandler = (e) => {
        const {
            target: { name, value },
        } = e;
        properties.forEach((e) => {
            if (e === name) {
                document.querySelectorAll('input[type="checkbox"]').forEach((el) => (el.checked = false));
            }
        });
        setProperties((properties) => {
            if (properties.includes(name)) {
                properties.splice(properties.indexOf(name), 1);
                return [...properties];
            } else {
                return [...properties, name];
            }
        });
    };

    useEffect(() => {}, [properties]);

    const isChecked = (propertiesName) => {
        let check = false;
        properties.forEach((e) => {
            if (e === propertiesName) {
                check = true;
            }
        });
        return check;
    };

    categories.map((c) => {
        if (c.name === service.category) {
            c.sub.forEach((s) => {
                if (s.name === service.subCategory) {
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
                                    checked={isChecked(o)}
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

    return (
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
            <div className='px-4 sm:px-6 md:px-0'>
                <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>Edit Service</h1>
                <p className='mt-2 text-sm text-gray-500'>View and update information related to your account.</p>
            </div>
            {isLoading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />
                </div>
            ) : (
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
                                            initialValue={service.name}
                                            initialValid={true}
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
                                            id='editCategory'
                                            placeholder={service.category}
                                            initialValid={true}
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid category'
                                            onInput={inputHandler}
                                            option={categoriesList}
                                        />
                                    </div>
                                </div>
                                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
                                    <label htmlFor='about' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                                        Sub Category
                                    </label>
                                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                        <Input
                                            element='option'
                                            id='editSubCategory'
                                            placeholder={service.subCategory}
                                            initialValid={true}
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText='Please enter a valid sub category'
                                            onInput={inputHandler}
                                            option={subCategoriesList}
                                        />
                                    </div>
                                </div>
                                <div className='pt-6 sm:pt-5'>
                                    <div role='group' aria-labelledby='label-email'>
                                        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                                            <div>
                                                <div className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700' id='label-email'>
                                                    {service.label}
                                                </div>
                                            </div>
                                            <div className='mt-4 sm:mt-0 sm:col-span-2'>
                                                <div className='max-w-lg space-y-4'>{element}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                initialValue={service.price}
                                                initialValid={true}
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
                                            initialValue={service.description}
                                            initialValid={true}
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
                                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                                        <div className='max-w flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                                            <div className='space-y-1 text-center'>
                                                <svg
                                                    className='mx-auto h-12 w-12 text-gray-400'
                                                    stroke='currentColor'
                                                    fill='none'
                                                    viewBox='0 0 48 48'
                                                    aria-hidden='true'
                                                >
                                                    <path
                                                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                                        strokeWidth={2}
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                                <div className='flex text-sm text-gray-600'>
                                                    <label
                                                        htmlFor='file-upload'
                                                        className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                                                    </label>
                                                    <p className='pl-1'>or drag and drop</p>
                                                </div>
                                                <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-5'>
                        <div className='flex justify-end'>
                            <NavLink to='/manage-service'>
                                <button
                                    type='button'
                                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    Cancel
                                </button>
                            </NavLink>
                            <button
                                type='submit'
                                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            >
                                Save and Request for Approval
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
